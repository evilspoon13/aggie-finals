import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MinusIcon } from "lucide-react";
import { FinalExam } from "@/app/api/types";
import { useState } from "react";

interface CalendarExamCardProps {
  exam: FinalExam;
  onRemove: (examId: number) => Promise<void>;
}

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


export const CalendarExamCard = ({ exam, onRemove }: CalendarExamCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveCourse = async () => {
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
    <Card className="border shadow-sm rounded-xl overflow-hidden transition-all duration-300 h-full bg-white flex flex-col">
      <div className="bg-[#562626] px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="truncate pr-2 max-w-[70%]">
            <p className="font-medium text-white truncate">
              Final Exam
            </p>
          </div>
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none flex-shrink-0">
            {exam.dayPattern}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-0 flex flex-col">
        <div className="p-4 flex flex-col h-full">
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800 mb-1">Exam Details</h3>
          </div>
          
          <div className="rounded-md bg-[#562626]/10 p-4 border border-[#562626]/20 flex-1">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#562626] rounded-full p-1.5 flex-shrink-0">
                  <CalendarIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-sm">{formatExamDate(exam.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-[#562626] rounded-full p-1.5 flex-shrink-0">
                  <ClockIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-medium text-sm">{exam.examTime}</p>
                </div>
              </div>
            </div>
          </div>
          
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handleRemoveCourse}
                    disabled={isRemoving}
                    className="w-12 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                    <MinusIcon className="h-4 w-4" />
                </button>
            </div>
            </div>
        </CardContent>
    </Card>
    );
};