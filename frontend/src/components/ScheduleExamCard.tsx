import { ExamWithClassName } from "@/app/api/hooks/useUserExams";
import { formatExamDate } from "@/lib/util/parseLocalDate";
import { BookOpen, Calendar, Clock, X } from "lucide-react";
import { useState } from "react";

const formatExamDateShort = (dateStr: string) => {
  const date = new Date(dateStr);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
  };
};

export const CalendarExamCard = ({ exam, onRemove }: { exam: ExamWithClassName; onRemove: (examId: number) => Promise<void>; }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const dateInfo = formatExamDateShort(exam.date);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(exam.examId);
    } catch (error) {
      console.error('Failed to remove exam:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="relative">
      
      <div className="flex gap-6 group">

        {/* Exam Card */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-[#562626]/30">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#562626] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {exam.className.split(' - ')[0]}
                  </h3>
                  <p className="text-gray-600 text-sm mt-0.5">
                    {exam.className.split(' - ')[1]}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Exam Details */}
            <div className="bg-[#562626]/5 rounded-lg p-4 border border-[#562626]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-[#562626]" />
                    <span className="text-sm font-medium">{formatExamDate(exam.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-[#562626]" />
                    <span className="text-sm font-medium">{exam.examTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-[#562626] text-white rounded-full font-medium">
                    {exam.dayPattern}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};