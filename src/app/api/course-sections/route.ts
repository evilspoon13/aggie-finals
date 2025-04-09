import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { department, courseNumber } = body;
    
    // forward the request to the Texas A&M API
    const response = await axios.post(
      'https://howdy.tamu.edu/api/course-sections',
      {
        startRow: 0,
        endRow: 0,
        termCode: "202511", // spring 2025
        publicSearch: "Y"
      }
    );
    
    // filter the results based on department and course number
    let filteredResults = response.data;
    
    if (department) {
      filteredResults = filteredResults.filter(
        course => course.SWV_CLASS_SEARCH_SUBJECT === department.toUpperCase()
      );
    }
    
    if (courseNumber) {
      filteredResults = filteredResults.filter(
        course => course.SWV_CLASS_SEARCH_COURSE === courseNumber
      );
    }
    
    // Return the filtered API response
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