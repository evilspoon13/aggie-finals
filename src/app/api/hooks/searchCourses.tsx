import { CourseEntry } from "../types";
import { searchCourseSections } from "../api";
import { CourseSectionRequest } from "../types";

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

        const courseEntries: CourseEntry[] = courseSections.map(section => ({
            crn: section.SWV_CLASS_SEARCH_CRN,
            loading: false,
            error: null,
            courseDetails: {
                subject: section.SWV_CLASS_SEARCH_SUBJECT,
                courseNumber: section.SWV_CLASS_SEARCH_COURSE,
                section: section.SWV_CLASS_SEARCH_SECTION,
                title: section.SWV_CLASS_SEARCH_TITLE
              }
            }));
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