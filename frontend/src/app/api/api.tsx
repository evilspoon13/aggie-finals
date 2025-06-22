import axios from 'axios';
import { CourseInstructor, CourseMeeting, CourseRequest, CourseResponse, CourseSectionRequest } from './types';

const INFO_API_URL = "/api/course-info";
const SECTIONS_API_URL = "/api/course-sections";
const SUBJECTS_API_URL = "/backend/subjects"

export const fetchCourseInfo = async (request: CourseRequest): Promise<CourseResponse> => {
    try{
        const response = await axios.post<CourseResponse>(INFO_API_URL, request, {
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

export const searchCourseSections = async (request: CourseSectionRequest): Promise<CourseResponse[]> => {
    try {
        const response = await axios.post<CourseResponse[]>(SECTIONS_API_URL, request, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)){
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to search course sections: ${error.message}`);
        }
        throw error;
    }
};

export interface Subject {
    id: number;
    shortName: string;
    longName: string;
}

export const searchSubjects = async (): Promise<Subject[]> => {
    try {
        const response = await axios.get<Subject[]>(SUBJECTS_API_URL, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)){
            console.error('API Error:', error.response?.data || error.message);
            throw new Error(`Failed to fetch subjects: ${error.message}`);
        }
        throw error;
    }
}
