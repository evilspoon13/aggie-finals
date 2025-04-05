"use client";
import { fetchCourseInfo, parseCourseResponse } from "./api/api";
import { useEffect, useState } from "react";
import { CourseInstructor, CourseMeeting, CourseResponse, FinalExam, LectureSchedule } from "./api/types";
import { getLectureSchedule } from "./util/getLectureSchedule";
import { findFinalExam } from "./util/findFinalExam";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { FinalExamCard } from "@/components/FinalExamCard";


interface CourseEntry {
  crn: string;
  loading: boolean;
  error: string | null;
  lectureSchedule?: LectureSchedule;
  finalExam?: FinalExam;
}


export default function Home() {

  // state for current CRN input
  const [term, setTerm] = useState<string>('202511'); // default to spring 2025
  const [crn, setCrn] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // state for list of added courses
  const [courses, setCourses] = useState<CourseEntry[]>([]);

  // state to control when to show the schedule
  const [showSchedule, setShowSchedule] = useState<boolean>(false);


  // add a course to the list and clear CRN field
  const addCourse = () => {
    if(!crn.trim() || courses.some(course => course.crn === crn)) {
      return;
    }

    const newCourse: CourseEntry = {
      crn,
      loading: false,
      error: null
    }

    setCourses([...courses, newCourse]);
    setCrn("");

  }


  const removeCourse = (crn: string) => {
    setCourses(courses.filter(course => course.crn !== crn));
  }


  const fetchCourseData = async () => {
    setLoading(true);
    setShowSchedule(true);

    const updatedCourses = [...courses];
    for(let i = 0; i < updatedCourses.length; i++){
      const course = updatedCourses[i];
      course.loading = true;

      try{
        const data = await fetchCourseInfo({term: term, crn: course.crn})
        const parsedData = parseCourseResponse(data);
        const lectureSchedule = getLectureSchedule(parsedData.meetings);

        if(lectureSchedule){
          const finalExam = findFinalExam(lectureSchedule);
          course.lectureSchedule = lectureSchedule;
          course.finalExam = finalExam;
          course.error = null;
        }
        else{
          course.error = "No lecture component found for this course.";
        }
      }
      catch(error){
        course.error = "Failed to load course data. Did you enter the right CRN?";
      }
      finally{
        course.loading = false;
        setCourses([...updatedCourses])
      }
    }

    setLoading(false);

  };



  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Course Information</h2>
      

      {!showSchedule ? (
        <>
          <div className="space-y-4 mb-8">
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
            
            <Button 
              className="bg-[#500000] hover:bg-[#400000] text-white" 
              onClick={addCourse}
              disabled={!crn.trim()}
            >
              Add Course
            </Button>
          </div>
          
          {courses.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Added Courses:</h3>
              <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>CRN: {course.crn}</span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeCourse(course.crn)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full mt-4 bg-[#500000] hover:bg-[#400000] text-white"
                onClick={fetchCourseData}
                disabled={courses.length === 0}
              >
                Generate Exam Schedule
              </Button>
            </div>
          )}
        </>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Final Exam Schedule</h3>
          
          {loading ? (
            <div>Loading your exam schedule...</div>
          ) : (
            <div className="space-y-6">
              {courses.map((course, index) => (
                <div key={index} className="border p-4 rounded shadow-sm">
                  <FinalExamCard
                    loading={course.loading}
                    error={course.error}
                    lectureSchedule={course.lectureSchedule}
                    finalExam={course.finalExam}
                    crn={course.crn}
                  />
                </div>
              ))}
              
              <Button 
                className="mt-6"
                onClick={() => {
                  setShowSchedule(false);
                  setCourses([]);
                }}
              >
                Start Over
              </Button>
            </div>
          )}
        </div>
      )}












    </div>
  );
}