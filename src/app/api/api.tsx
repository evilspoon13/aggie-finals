import axios from 'axios';
import { CourseInstructor, CourseMeeting, CourseRequest, CourseResponse } from './types';

const API_URL = "/api/section-meeting-times-with-profs";

export const fetchCourseInfo = async (request: CourseRequest): Promise<CourseResponse> => {
    try{
        const response = await axios.post<CourseResponse>(API_URL, request, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch(error){
        if(axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch course information: ${error.message}`);
        }
        throw error;
    }
};

export const parseCourseResponse = (response: CourseResponse) => {
    const instructors = JSON.parse(response.SWV_CLASS_SEARCH_INSTRCTR_JSON) as CourseInstructor[];
    const meetings = JSON.parse(response.SWV_CLASS_SEARCH_JSON_CLOB) as CourseMeeting[];

    return {
        instructors,
        meetings
    };
};


