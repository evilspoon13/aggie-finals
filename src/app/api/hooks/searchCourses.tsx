import { CourseEntry } from "../types";
import { searchCourseSections } from "../api";
import { CourseSectionRequest, LectureSchedule, CourseMeeting, CourseInstructor } from "../types";


export interface CourseSearchResult{
    success: boolean;
    courses: CourseEntry[];
    error?: string;
}

export const searchCourses = async (
    department: string,
    courseNumber: number
): Promise<CourseSearchResult> => {

    if(!department.trim() || courseNumber <= 0){
        return {
            success: false,
            courses: [],
            error: "Provide both department and course number"
        }
    }

    try{
        const request: CourseSectionRequest = {
            department: department.toUpperCase(),
            courseNumber: courseNumber.toString()
        };

        const courseSections = await searchCourseSections(request);
        if(courseSections.length === 0){
            return {
                success: false,
                courses: [],
                error: `No ${department} ${courseNumber} sections found`
            };
        }

        const courseEntries: CourseEntry[] = courseSections.map(section => {
            // parse meeting data from JSON string
            const meetings = JSON.parse(section.SWV_CLASS_SEARCH_JSON_CLOB) as CourseMeeting[];
            
            // parse instructor data from JSON string
            let instructorName = "Unknown";
            try {
                const instructors = JSON.parse(section.SWV_CLASS_SEARCH_INSTRCTR_JSON) as CourseInstructor[];
                if (instructors && instructors.length > 0) {
                    // Get the first instructor's name
                    instructorName = instructors[0].NAME;
                    
                    // Remove the "(P)" designation if present
                    instructorName = instructorName.replace(" (P)", "");
                }
            } catch (error) {
                console.error("Error parsing instructor data:", error);
            }
            
            const lectureMeeting = meetings.find(meeting => 
                meeting.SSRMEET_MTYP_CODE === "Lecture" && 
                (meeting.SSRMEET_BEGIN_TIME !== null && meeting.SSRMEET_END_TIME !== null)
            );
            
            // create lecture schedule if we found a meeting
            let lectureSchedule: LectureSchedule | undefined;
            
            if (lectureMeeting) {
                let days = '';
                if (lectureMeeting.SSRMEET_MON_DAY) days += 'M';
                if (lectureMeeting.SSRMEET_TUE_DAY) days += 'T';
                if (lectureMeeting.SSRMEET_WED_DAY) days += 'W';
                if (lectureMeeting.SSRMEET_THU_DAY) days += 'R';
                if (lectureMeeting.SSRMEET_FRI_DAY) days += 'F';
                if (lectureMeeting.SSRMEET_SAT_DAY) days += 'S';
                if (lectureMeeting.SSRMEET_SUN_DAY) days += 'U';
                
                lectureSchedule = {
                    days,
                    beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
                    endTime: lectureMeeting.SSRMEET_END_TIME
                };
            }
            
            return {
                crn: section.SWV_CLASS_SEARCH_CRN,
                loading: false,
                error: null,
                courseDetails: {
                    subject: section.SWV_CLASS_SEARCH_SUBJECT,
                    courseNumber: section.SWV_CLASS_SEARCH_COURSE,
                    section: section.SWV_CLASS_SEARCH_SECTION,
                    title: section.SWV_CLASS_SEARCH_TITLE,
                    instructor: instructorName
                },
                lectureSchedule
            };
        });
        
        return {
            success: true,
            courses: courseEntries
        };
    } catch (error) {
        console.error("Error searching for courses:", error);
        return {
            success: false,
            courses: [],
            error: "Failed to search for courses. Please try again."
        };
    }
};