import { FinalExam, LectureSchedule } from "@/app/api/types";

interface FinalExamCardProps {
  loading: boolean;
  error?: string | null;
  finalExam?: FinalExam;
  lectureSchedule?: LectureSchedule;
  crn: string;
}

export const FinalExamCard = ({ 
  loading, 
  error, 
  finalExam, 
  lectureSchedule,
  crn
}: FinalExamCardProps) => {
  if (loading) {
    return <div>Loading final exam data...</div>;
  }
  
  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
        <p className="font-medium">Error: {error}</p>
      </div>
    );
  }
  
  if (!lectureSchedule || !finalExam) {
    return (
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p>No lecture information found for CRN: {crn}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg">Course Schedule</h4>
        <p><span className="font-medium">Days:</span> {lectureSchedule.days}</p>
        <p><span className="font-medium">Time:</span> {lectureSchedule.beginTime} - {lectureSchedule.endTime}</p>
        
        {finalExam.success ? (
          <div className="mt-4 p-3 bg-[#500000] text-white rounded-md">
            <h4 className="font-bold">Final Exam:</h4>
            <p><span className="font-medium">Date:</span> {finalExam.date}</p>
            <p><span className="font-medium">Time:</span> {finalExam.examTime}</p>
          </div>
        ) : (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-md text-orange-700">
            <p>Final exam not found: {finalExam.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};