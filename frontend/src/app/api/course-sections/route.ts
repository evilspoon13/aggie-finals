import { NextResponse } from 'next/server';
import { courseCache } from '@/lib/courseCache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { department, courseNumber } = body;
    
    // Use cached filtered data
    const filteredResults = await courseCache.getFilteredCourses(department, courseNumber);
    
    return NextResponse.json(filteredResults);
  } 
  catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Texas A&M API' },
      { status: 500 }
    );
  }
}