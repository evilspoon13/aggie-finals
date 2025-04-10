// app/api/course-subjects/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { CourseSection } from '../types';

export async function POST(request: Request) {
  try {
    
    const response = await axios.post(
      'https://howdy.tamu.edu/api/course-sections',
      {
        startRow: 0,
        endRow: 0, 
        termCode: "202511", // spring 2025
        publicSearch: "Y"
      }
    );
    
    // Extract all unique subjects
    const allCourses = response.data;
    const uniqueSubjects = [...new Set(
      allCourses.map((course: CourseSection) => course.SWV_CLASS_SEARCH_SUBJECT)
    )].filter(Boolean).sort();
    
    // Return just the subjects array
    return NextResponse.json({
      success: true,
      subject: uniqueSubjects
    });
  } 
  catch (error) {
    console.error('Subject API error:', error);
    return NextResponse.json(
      { success: false, subject: [], error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}