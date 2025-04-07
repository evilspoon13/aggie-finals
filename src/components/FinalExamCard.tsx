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
      <Card className="border-0 h-full">
        <CardContent className="pt-4">
          <div className="flex items-center justify-center h-20">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="border-0 bg-red-50 h-full">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-sm">CRN: {crn}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!lectureSchedule || !finalExam) {
    return (
      <Card className="border-0 bg-yellow-50 h-full">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-yellow-700 text-sm">No Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 text-sm">No info for CRN: {crn}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none ring-0 ring-offset-0 h-full">
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm">CRN: {crn}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Badge variant="outline" className="text-xs px-1 py-0">{lectureSchedule.days}</Badge>
          <span className="flex items-center gap-1 text-muted-foreground">
            <ClockIcon className="h-2 w-2" /> 
            {lectureSchedule.beginTime}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {finalExam.success ? (
          <div>
            <div className="rounded-md bg-[#500000] p-2 text-white text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{finalExam.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>{finalExam.examTime}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md bg-orange-50 p-2 text-xs">
            <p className="text-orange-700">No exam found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};