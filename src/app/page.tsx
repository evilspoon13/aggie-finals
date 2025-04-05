"use client";
import { fetchCourseInfo, parseCourseResponse } from "./api/api";
import { useEffect, useState } from "react";
import { CourseInstructor, CourseMeeting, CourseResponse } from "./api/types";
import { getLectureSchedule } from "./util/getLectureSchedule";
import { findFinalExam } from "./util/findFinalExam";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";



export default function Home() {

  // from user
  const [term, setTerm] = useState<string>('202511'); // default to spring 2025
  const [crn, setCrn] = useState<string>("50595");

  //api
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<CourseResponse | null>(null);
  const [parsedData, setParsedData] = useState<{
    instructors: CourseInstructor[];
    meetings: CourseMeeting[];
  } | null>(null);


  const fetchCourseData = async () => {
    setLoading(true);
    try{
      // get course response
      const data = await fetchCourseInfo({ term, crn });
      setCourseData(data);

      //parse gross course response json
      const parsedCourseData = parseCourseResponse(data);
      setParsedData(parsedCourseData);
    } 
    catch(err){
      setError('Failed to load course data');
    } 
    finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Course Information</h2>
      
      <div className="space-y-4 mb-8">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="term">Term</Label>
          <Input
            type="text"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter term code (e.g., 202511)"
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="crn">Course Registration Number (CRN)</Label>
          <Input
            type="text" 
            id="crn"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
            placeholder="Enter CRN"
          />
        </div>
        
        <Button className="bg-[#500000] hover:bg-[#400000] text-white" onClick={fetchCourseData}>
          Find Course
        </Button>
      </div>

      {parsedData && (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-2">Meeting Times:</h3>
            {parsedData.meetings.length > 0 && (
              <div>
                {(() => {
                  const lectureSchedule = getLectureSchedule(parsedData.meetings);
                  if(lectureSchedule){
                    const examInfo = findFinalExam(lectureSchedule);

                    if(loading){
                      return <div>Loading final exam data...</div>
                    }
                    if(error){
                      return <div>Error finding final exam. Did you type the right CRN?</div>
                    }

                    return (
                      <div className="space-y-2">
                        <p><span className="font-medium">Days:</span> {lectureSchedule.days}</p>
                        <p><span className="font-medium">Time:</span> {lectureSchedule.beginTime} - {lectureSchedule.endTime}</p>
                        
                        {examInfo.success ? (

                          <div className="mt-4 p-3 bg-[#500000] text-white rounded-md">
                            <h4 className="font-bold text-shadow-white">Final Exam:</h4>
                            <p><span className="font-medium">Date:</span> {examInfo.date}</p>
                            <p><span className="font-medium">Time:</span> {examInfo.examTime}</p>
                          </div>
                        ) : (
                          <p className="text-red-500">Final exam not found: {examInfo.error}</p>
                        )}
                      </div>
                    );
                  } 
                  else {
                    return <p>No lecture meeting found</p>;
                  }
                })()}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}