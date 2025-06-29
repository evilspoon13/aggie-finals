"use client";

import { GoBackButton } from "@/components/GoBackButton";
import { CalendarExamCard } from "@/components/ScheduleExamCard";
import { useUserExams, ExamWithClassName } from "../api/hooks/useUserExams";
import { useEffect, useState } from "react";
import { Calendar, GraduationCap, Smile } from "lucide-react";

const ExamSchedule = () => {
  const { getUserExams, removeExamFromSchedule, loading, error, sessionStatus } = useUserExams();
  const [userExams, setUserExams] = useState<ExamWithClassName[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const userExams = await getUserExams();
      if (userExams) {
        setUserExams(userExams);
      }
    }
    fetchExams();
  }, [sessionStatus]);

  const handleRemoveExam = async (examId: number) => {
    const examToRemove = userExams.find(exam => exam.examId === examId);
    if (!examToRemove) {
      console.error('Exam not found');
      return;
    }

    const success = await removeExamFromSchedule(examId, examToRemove.className);
    if (success) {
      setUserExams(prev => prev.filter(exam => exam.examId !== examId));
    }
  };

  const sortedExams = [...userExams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#562626]/90 via-[#8a4141] to-[#f8f0e9] relative">
      {/* Go Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <GoBackButton />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="text-center">
                      <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Final Exams</h1>
          </div>
         <div className="flex items-center gap-2 mb-6 justify-center">
                <h2 className="text-xl font-bold text-white">Good luck with your exams!</h2>
                <Smile size={22} className="text-white" />
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {error && (
              <div className="p-4 bg-red-50 border-b border-red-100">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
            
            <div className="p-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#562626]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 border-2 border-[#562626] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your exams...</h3>
                  <p className="text-gray-600">Please wait while we fetch your exam schedule.</p>
                </div>
              ) : sortedExams.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#562626]/10 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-[#562626]/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams scheduled</h3>
                  <p className="text-gray-600">Add your courses to see your exam schedule here.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Stats Header */}
                  <div className="flex items-center justify-between mb-8 p-4 bg-[#562626]/5 rounded-lg border border-[#562626]/10">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Exam Schedule Overview</h2>
                      <p className="text-gray-600 text-sm">
                        {sortedExams.length} exam{sortedExams.length !== 1 ? 's' : ''} scheduled
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#562626]">{sortedExams.length}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Total Exams</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-8">
                    {sortedExams.map((exam) => (
                      <CalendarExamCard 
                        key={exam.examId} 
                        exam={exam} 
                        onRemove={handleRemoveExam}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;