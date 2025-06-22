import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, AlertTriangleIcon, Loader2Icon, PlusIcon, CheckIcon, XIcon } from "lucide-react";
import { FinalExamResult } from "@/app/api/types";
import { useUserExams } from "@/app/api/hooks/useUserExams";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface FinalExamCardProps {
  finalExam?: FinalExamResult;
  loading?: boolean;
  crn?: string;
}

export const FinalExamCard = ({ 
  finalExam,
  loading = false,
  crn = "",
}: FinalExamCardProps) => {

  const { data: session } = useSession();
  const { addExamToSchedule } = useUserExams();
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleAddCourse = async (exam: FinalExamResult, className: string) => {
    setAdding(true);

    if (!session?.user?.googleId) {
      setAdding(false);
      setFailed(false);
      setTimeout(() => setFailed(false), 1200);
      await signIn("google", { callbackUrl: "/" });
      return;
    }

    const result = await addExamToSchedule(exam.examId, className);
    if (result) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
    else{
      setFailed(true);
      setTimeout(() => setFailed(false), 1200);
    }
    setAdding(false);
  };


  if (loading) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <p className="text-sm font-medium text-gray-500">CRN: {crn}</p>
        </div>
        <CardContent className="p-8 flex justify-center items-center flex-1">
          <div className="flex flex-col items-center gap-2">
            <Loader2Icon className="h-6 w-6 text-[#562626] animate-spin" />
            <p className="text-sm text-gray-500">Loading exam details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!finalExam) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white">
        <div className="bg-yellow-50 px-4 py-2 border-b">
          <p className="text-sm font-medium text-yellow-700">CRN: {crn}</p>
        </div>
        <CardContent className="p-6 flex-1">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-yellow-100 p-2 flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-700 mb-1">No Data Available</h4>
              <p className="text-sm text-yellow-600">Could not find exam information for this course.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { 
    success, 
    error, 
    schedule, 
    date, 
    examTime, 
    courseDetails 
  } = finalExam;

  const subject = courseDetails?.subject;
  const courseNumber = courseDetails?.courseNumber;
  const title = courseDetails?.title;
  const className = `${subject} ${courseNumber} - ${title}`;


  if (error) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white">
        <div className="bg-red-50 px-4 py-2 border-b">
          <p className="text-sm font-medium text-red-700">CRN: {crn}</p>
        </div>
        <CardContent className="p-6 flex-1">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-red-100 p-2 flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-1">Error</h4>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!schedule || !success) {
    return (
      <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white">
        <div className="bg-yellow-50 px-4 py-2 border-b">
          <p className="text-sm font-medium text-yellow-700">CRN: {crn}</p>
        </div>
        <CardContent className="p-6 flex-1">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-yellow-100 p-2 flex-shrink-0">
              <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-700 mb-1">No Data Available</h4>
              <p className="text-sm text-yellow-600">Could not find exam information for this course.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white flex flex-col">
      <div className="bg-[#562626] px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="truncate pr-2 max-w-[70%]">
            {!subject || !courseNumber || !title ? (
              <p className="font-medium text-white truncate">CRN - {crn}</p>
            ) : (
              <p className="font-medium text-white truncate" title={`${subject} ${courseNumber} - ${title}`}>
                {subject} {courseNumber} - {title}
              </p>
            )}
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none flex-shrink-0">
            {schedule.days}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-0 flex flex-col">
        <div className="p-4 flex flex-col h-full">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800 mb-1">Final Exam</h3>
          </div>
          
          <div className="rounded-md bg-[#562626]/10 p-4 border border-[#562626]/20 flex-1">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#562626] rounded-full p-1.5 flex-shrink-0">
                  <CalendarIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-sm">{date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-[#562626] rounded-full p-1.5 flex-shrink-0">
                  <ClockIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium text-sm">{examTime}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* add course to schedule button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => handleAddCourse(finalExam, className)}
              className={`w-12 py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${added ? 'bg-green-600' : failed ? 'bg-red-600' : 'bg-[#562626] text-white hover:bg-[#562626]/90'} ${adding ? 'opacity-60 cursor-not-allowed' : ''}`}
              disabled={adding}
            >
              {adding ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : added ? (
                <CheckIcon className="h-4 w-4 text-white" />
              ) : 
              failed ? (
                <XIcon className="h-4 w-4 text-white" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};