// app/api/course-subjects/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { CourseSection } from '../types';

// Cache time in seconds (e.g., 24 hours)
const CACHE_MAX_AGE = 86400;

export async function POST(request: Request) {
  try {
    const response = await axios.post(
      'https://howdy.tamu.edu/api/course-sections',
      {
        startRow: 0,
        endRow: 0, 
        termCode: "202511",
        publicSearch: "Y"
      },
      { timeout: 20000 } // 20 second timeout
    );
    
    // Extract unique subjects
    const allCourses = response.data;
    const uniqueSubjects = [...new Set(
      allCourses.map((course: CourseSection) => course.SWV_CLASS_SEARCH_SUBJECT)
    )].filter(Boolean).sort();
    
    // Return with caching headers
    return NextResponse.json(
      { success: true, subject: uniqueSubjects },
      { 
        status: 200,
        headers: {
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } 
  catch (error) {
    console.error('Subject API error:', error);
    return NextResponse.json(
      { success: false, subject: [], error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}