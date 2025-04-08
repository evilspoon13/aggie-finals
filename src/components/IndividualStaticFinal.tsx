import React from 'react';
import { examMapping } from '@/app/util/examData';
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

interface IndividualStaticFinalProps {
    exams: examMapping[];
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
                {exams.map((exam, index) => (
                    <Card key={index} className="border-l-4 border-l-[#562626] hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">
                                <span className="mr-2 font-bold text-[#562626]">{exam.dayPattern}</span> Class
                            </CardTitle>
                            <CardDescription className="flex items-center text-sm">
                                Class time: {exam.regularClassTime}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-2 text-[#562626]" />
                                    <span>{exam.examDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-2 text-[#562626]" />
                                    <span className="font-medium">{exam.examTime}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>

    );
}