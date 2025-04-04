import axios from 'axios';

const BASE_API_URL = "https://tamu.collegescheduler.com/api"

export interface Meeting {
    days: string;
    daysRaw: string;
    startTime: number;
    endTime: number;
    location: string;
    meetingType: string;
    meetingTypeDescription: string;
    building: string;
    buildingDescription: string;
    room: string;
}
  
export interface CourseSection {
    id: string;
    sectionNumber: string;
    title: string;
    instructor: Array<{
      id: string;
      name: string;
    }>;
    meetings: Meeting[];
}
  
export interface CourseResponse {
    sections: CourseSection[];
}

// Modified to use our internal API route
export const fetchCourseMeetingTimes = async (
    subject: string,
    courseNumber: string,
    term: string = 'Fall 2025 - College Station'
): Promise<CourseSection[]> => {
    try {
        const response = await axios.get<CourseResponse>(`${BASE_API_URL}/terms/${encodeURIComponent(term)}/subjects/${subject}/courses/${courseNumber}/regblocks`);
        return response.data.sections;
    } catch (error) {
        console.error('Error fetching course data:', error);
        throw error;
    }
}