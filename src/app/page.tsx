"use client";
import { fetchCourseInfo, parseCourseResponse } from "./api/api";
import { useEffect, useState } from "react";
import { CourseInstructor, CourseMeeting, CourseResponse } from "./api/types";
import { getLectureSchedule } from "./util/getLectureSchedule";
import { findFinalExam } from "./util/findFinalExam";


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

  

  useEffect(() => {

    setLoading(true);
    const getCourseData = async () => {
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

    getCourseData();
  }, []);


  if(loading){
    return <div>Loading course data..</div>
  }

  if(error){
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Course Information</h2>
      
      {parsedData && (
        <>
          <div>
            <h3>Instructor:</h3>
            {parsedData.instructors.length > 0 && (
              <p>{parsedData.instructors[0].NAME}</p>
            )}
          </div>
          
          <div>
          <div>
           <h3>Meeting Times:</h3>
              {parsedData.meetings.length > 0 && (
                <div>
                  {(() => {
                    const lectureSchedule = getLectureSchedule(parsedData.meetings);
                    if (lectureSchedule) {
                      const examInfo = findFinalExam(lectureSchedule);
                      return (
                        <div>
                          <p>Class: {lectureSchedule.days} {lectureSchedule.beginTime} - {lectureSchedule.endTime}</p>
                          
                          {examInfo.success ? (
                            <div>
                              <h4>Final Exam:</h4>
                              <p>Date: {examInfo.date}</p>
                              <p>Time: {examInfo.examTime}</p>
                            </div>
                          ) : (
                            <p>Final exam not found: {examInfo.error}</p>
                          )}
                        </div>
                      );
                    } else {
                      return <p>No lecture meeting found</p>;
                    }
                  })()}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
