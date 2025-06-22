"use client";
import { fetchCourseInfo, parseCourseResponse } from "./api/api";
import { useState } from "react";
import { CourseEntry, FinalExamResult } from "./api/types";
import { getLectureSchedule } from "@/lib/util/getLectureSchedule";
import { useFindExam, createExamRequest } from "@/app/api/hooks/useFindExam";

import { Button } from "@/components/ui/button";
import { FinalExamCard } from "@/components/FinalExamCard";
import { StaticFinalData } from "@/components/StaticFinalData";
import { CourseEntryForm } from "@/components/CourseEntryForm";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon, Smile } from "lucide-react";
import Settings from "@/components/Settings";

export default function Home() {
  // state for current CRN input
  const [term, setTerm] = useState<string>('202531');
  const [loading, setLoading] = useState<boolean>(false);

  // state for list of added courses
  const [courses, setCourses] = useState<CourseEntry[]>([]);

  // state to control when to show the schedule
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const { findExam } = useFindExam();

  const fetchCourseData = async () => {
    setLoading(true);
    setShowSchedule(true);

    const updatedCourses = [...courses];
    
    for(let i = 0; i < updatedCourses.length; i++){
      const course = updatedCourses[i];
      course.loading = true;
      
      // Update UI to show this course is loading
      setCourses([...updatedCourses]);

      try{
        const data = await fetchCourseInfo({term: term, crn: course.crn})
        const parsedData = parseCourseResponse(data);
        const lectureSchedule = getLectureSchedule(parsedData.meetings);

        if(lectureSchedule){
          // Handle special cases on frontend first
          if (lectureSchedule.days === "Online" || 
              lectureSchedule.courseType === "Laboratory" ||
              lectureSchedule.courseType === "Seminar" ||
              lectureSchedule.courseType === "Research" ||
              lectureSchedule.courseType === "Independent Study") {
            
            const finalExam: FinalExamResult = {
              success: true,
              error: null,
              date: "Check with Instructor",
              examTime: getSpecialCaseMessage(lectureSchedule),
              schedule: lectureSchedule,
              courseDetails: course.courseDetails,
              examId: 0
            };
            
            course.lectureSchedule = lectureSchedule;
            course.finalExam = finalExam;
            course.error = null;
          } else {
            // Make API call for regular courses
            try {
              const examRequest = createExamRequest(
                term, // "202531"
                lectureSchedule.days,
                lectureSchedule.beginTime,
                lectureSchedule.endTime
              );


              const apiExam = await findExam(examRequest);
              
              
              if (apiExam) {
                // Convert API response to FinalExamResult format
                const finalExam: FinalExamResult = {
                  success: true,
                  error: null,
                  date: formatExamDate(apiExam.date),
                  examTime: apiExam.examTime,
                  schedule: lectureSchedule,
                  courseDetails: course.courseDetails,
                  examId: apiExam.examId
                };
                
                course.lectureSchedule = lectureSchedule;
                course.finalExam = finalExam;
                course.error = null;
              } else {
                // No exam found via API
                const finalExam: FinalExamResult = {
                  success: false,
                  error: "No matching final exam time found for this course schedule",
                  schedule: lectureSchedule,
                  courseDetails: course.courseDetails,
                  examId: 0
                };
                
                course.lectureSchedule = lectureSchedule;
                course.finalExam = finalExam;
                course.error = null;
              }
            } catch (apiError) {
              console.error("API call failed:", apiError); // Debug log
              course.error = "Failed to fetch exam schedule from server";
            }
          }
        } else {
          course.error = "No lecture component found for this course.";
        }
      }
      catch(error){
        console.error("Course fetch error:", error); // Debug log
        course.error = "Failed to load course data. Did you enter the right CRN?";
      }
      finally{
        course.loading = false;
        // Update state after each course is processed
        setCourses([...updatedCourses]);
      }
    }

    setLoading(false);
  };

  // Helper function for special case messages
  const getSpecialCaseMessage = (lectureSchedule: any): string => {
    if (lectureSchedule.days === "Online") {
      return "Check with Instructor";
    }
    if (lectureSchedule.courseType === "Laboratory") {
      return "Laboratory courses typically don't have final exams";
    }
    if (lectureSchedule.courseType === "Seminar" || 
        lectureSchedule.courseType === "Research" || 
        lectureSchedule.courseType === "Independent Study") {
      return "May not have traditional final exam";
    }
    return "Check with Instructor";
  };

  // Helper function to format API date to display format
  const formatExamDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-gradient-to-b from-[#562626]/90 via-[#8a4141] to-[#f8f0e9] pt-12 pb-20 relative">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex justify-end mb-4">
            <Settings />
          </div>
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
                                finalExam={course.finalExam}
                                loading={course.loading}
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

      {/* Find your final exam by hand section */}
      <div className="w-full bg-white py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <StaticFinalData/>
        </div>
      </div>
    </div>
  );
}