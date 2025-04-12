import { NextResponse } from 'next/server';
import axios from 'axios';
import { CourseSection } from '@/app/api/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { department } = body;
    
    if (!department) {
      return NextResponse.json({ 
        success: false, 
        courseNumbers: [], 
        error: 'Department is required' 
      });
    }
    
    const response = await axios.post(
      'https://howdy.tamu.edu/api/course-sections',
      {
        startRow: 0,
        endRow: 0, 
        termCode: "202511", // spring 2025
        publicSearch: "Y"
      }
    );
    
    // filter to get courses for the specified department
    const filteredCourses = response.data.filter(
      (course: CourseSection) => course.SWV_CLASS_SEARCH_SUBJECT === department.toUpperCase()
    );

    const undergradCourses = filteredCourses.filter(
        (course: CourseSection) => parseInt(course.SWV_CLASS_SEARCH_COURSE) < 500
    );
    
    // extract unique course numbers
    const uniqueCourseNumbers = [...new Set(
        undergradCourses.map((course: CourseSection) => course.SWV_CLASS_SEARCH_COURSE)
      )].filter(Boolean).sort((a, b) => {
        const numA = parseInt(a as string);
        const numB = parseInt(b as string);
        return numA - numB;
      });
    
    return NextResponse.json({
      success: true,
      courseNumbers: uniqueCourseNumbers
    });
  } 
  catch (error) {
    console.error('Course Numbers API error:', error);
    return NextResponse.json(
      { success: false, courseNumbers: [], error: 'Failed to fetch course numbers' },
      { status: 500 }
    );
  }
}