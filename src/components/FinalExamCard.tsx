import { FinalExam, LectureSchedule } from "@/app/api/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";

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
    return (
      <Card className="w-full border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-24">
            <p className="text-muted-foreground">Loading final exam data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full border-0 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle>Course CRN: {crn}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!lectureSchedule || !finalExam) {
    return (
      <Card className="w-full border-0 bg-yellow-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-yellow-700">No Data Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">No lecture information found for CRN: {crn}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none ring-0 ring-offset-0">
      <CardHeader className="pb-2">
        <CardTitle>Course CRN: {crn}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="outline">{lectureSchedule.days}</Badge>
          <span className="flex items-center gap-1 text-muted-foreground">
            <ClockIcon className="h-3 w-3" /> 
            {lectureSchedule.beginTime} - {lectureSchedule.endTime}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {finalExam.success ? (
          <div className="space-y-4">
            <div className="rounded-md bg-[#500000] p-4 text-white">
              <h4 className="font-bold text-lg mb-2">Final Exam</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{finalExam.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>{finalExam.examTime}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-orange-50 p-4 border-0">
            <p className="text-orange-700">Final exam not found: {finalExam.error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};