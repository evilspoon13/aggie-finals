import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { term, crn } = body;
    
    // Forward the request to the Texas A&M API
    const response = await axios.post(
      'https://howdy.tamu.edu/api/section-meeting-times-with-profs',
      { term, crn },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Return the API response
    return NextResponse.json(response.data);
  } 
  catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Texas A&M API' },
      { status: 500 }
    );
  }
}