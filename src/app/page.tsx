"use client";
import { fetchCourseInfo, parseCourseResponse } from "./api/api";
import { useState } from "react";
import { CourseEntry } from "./api/types";
import { getLectureSchedule } from "./util/getLectureSchedule";
import { findFinalExam } from "./util/findFinalExam";

import { Button } from "@/components/ui/button";
import { FinalExamCard } from "@/components/FinalExamCard";
import { StaticFinalData } from "@/components/StaticFinalData";
import { CourseEntryForm } from "@/components/CourseEntryForm";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

export default function Home() {
  // state for current CRN input
  const [term, setTerm] = useState<string>('202511'); // default to spring 2025
  const [loading, setLoading] = useState<boolean>(false);

  // state for list of added courses
  const [courses, setCourses] = useState<CourseEntry[]>([]);

  // state to control when to show the schedule
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

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
    <div className="flex flex-col items-center mx-auto py-8 px-4 max-w-7xl">
      
      {/* either show the CRN entry box or the user's final exam schedule*/}
      {!showSchedule ? (
        <CourseEntryForm 
          courses={courses}
          setCourses={setCourses}
          onGenerateSchedule={fetchCourseData}
        />
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <Card className="border shadow-sm rounded-xl bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Mark your calendar for the following:</h3>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2Icon className="h-8 w-8 text-[#562626] animate-spin mb-3" />
                  <p className="text-gray-500">Loading your exam schedule...</p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course, index) => (
                      <div key={index}>
                        <FinalExamCard
                          loading={course.loading}
                          error={course.error}
                          lectureSchedule={course.lectureSchedule}
                          finalExam={course.finalExam}
                          crn={course.crn}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button 
                      className="bg-[#562626] hover:bg-[#5A0010] text-white px-6 py-2 h-11 text-base font-medium shadow-sm transition-colors"
                      onClick={() => {
                        setShowSchedule(false);
                        setCourses([]);
                      }}
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/*Always show user the static final exam data if they want to find their exam themselves*/}

      <div className="mt-36 b-12 w-full  mx-auto">
        <hr className="border-gray-200" />
      </div>
      <StaticFinalData/>
    </div>
  );
}