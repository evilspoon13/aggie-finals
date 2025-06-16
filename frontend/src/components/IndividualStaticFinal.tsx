import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {  
  TabsContent, 
} from "@/components/ui/tabs";
import { CalendarIcon, ClockIcon } from 'lucide-react';

interface FormattedExam {
    examId: number;
    dayPattern: string;
    examDate: string;
    examTime: string;
    regularClassTime: string;
}

interface IndividualStaticFinalProps {
    exams: FormattedExam[];
    dayValue: string;
    dayTitle: string;
}

export const IndividualStaticFinal: React.FC<IndividualStaticFinalProps> = ({
    exams,
    dayValue,
    dayTitle
}) => {
    return (
        <TabsContent value={dayValue} className="space-y-4">
            <h2 className="text-xl font-semibold text-[#562626] mb-4">{dayTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                    <Card 
                        key={exam.examId} 
                        className="border-l-4 border-l-[#562626] hover:shadow-md transition-all duration-300 
                                hover:-translate-y-1 hover:bg-red-50 group"
                    >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium group-hover:text-[#5A0010]">
                        <span className="mr-2 font-bold text-[#562626] group-hover:text-[#5A0010]">{exam.dayPattern}</span> Class
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        {exam.regularClassTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-[#562626]">Final Exam:</h3>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-[#562626] group-hover:scale-110 transition-transform" />
                          <span>{exam.examDate}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-[#562626] group-hover:scale-110 transition-transform" />
                          <span className="font-medium group-hover:font-bold transition-all">{exam.examTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
        </TabsContent>
    );
};