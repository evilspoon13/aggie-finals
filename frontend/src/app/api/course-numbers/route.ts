import { NextResponse } from 'next/server';
import { courseCache } from '@/lib/courseCache';

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
    
    // Use cached data
    const departmentCourses = await courseCache.getCoursesByDepartment(department);
    
    // Filter for undergraduate courses
    const undergradCourses = departmentCourses.filter(
      course => parseInt(course.SWV_CLASS_SEARCH_COURSE) < 500
    );
    
    // Extract unique course numbers
    const uniqueCourseNumbers = [...new Set(
      undergradCourses.map(course => course.SWV_CLASS_SEARCH_COURSE)
    )].filter(Boolean).sort((a, b) => {
      const numA = parseInt(a as string);
      const numB = parseInt(b as string);
      return numA - numB;
    });
    
    return NextResponse.json({
      success: true,
      courseNumbers: uniqueCourseNumbers,
      cached: true // Let frontend know this was cached
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