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
import { Loader2Icon, Smile } from "lucide-react";

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
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-gradient-to-b from-[#562626]/90 via-[#8a4141] to-[#f8f0e9] pt-12 pb-20 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMyAwLTYgMi42ODYtNiA2czMgNiA2IDZ6bTAgMzZjMyAwIDYtMyA2LTZzLTMtNi02LTZjLTMgMC02IDMtNiA2czMgNiA2IDZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
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
                  
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2Icon className="h-8 w-8 text-[#562626] animate-spin mb-3" />
                      <p className="text-gray-500">Loading your exam schedule...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-6 justify-center">
                        <h2 className="text-xl font-bold">Good luck with your exams!</h2>
                        <Smile size={22} className="text-[#562626]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courses.map((course, index) => (
                          <div key={index}>
                            <FinalExamCard
                              subject={course.courseDetails?.subject}
                              courseNumber={course.courseDetails?.courseNumber}
                              title={course.courseDetails?.title}
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
        </div>
      </div>

      {/* Bottom section with white background */}
      <div className="w-full bg-white py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <StaticFinalData/>
        </div>
      </div>
    </div>
  );
}