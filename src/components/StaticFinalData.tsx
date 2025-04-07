import React from 'react';
import { examMappings, examMapping } from '@/app/util/examData';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IndividualStaticFinal } from './IndividualStaticFinal';

function separateExamData(examData: examMapping[]):{
    thursdayExams: examMapping[];
    fridayExams: examMapping[];
    mondayExams: examMapping[];
    tuesdayExams: examMapping[];
} {
    return {
        thursdayExams: examData.filter(exam =>
            exam.examDate.includes('Thursday')
        ),
        fridayExams: examData.filter(exam =>
            exam.examDate.includes('Friday')
        ),
        mondayExams: examData.filter(exam =>
            exam.examDate.includes('Monday')
        ),
        tuesdayExams: examData.filter(exam =>
            exam.examDate.includes('Tuesday')
        )
    };
}

export const StaticFinalData: React.FC = () => {
    const { thursdayExams, fridayExams, mondayExams, tuesdayExams } = separateExamData(examMappings);

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#500000] mb-2">Spring 2025 Final Exam Schedule</h1>
                <p className="text-gray-600">Old school? Find your final exam times by hand.</p>
            </div>

            <Tabs defaultValue="thursday" className="w-full">
                <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6 w-full">
                    <TabsTrigger value="thursday" className="md:col-span-2 data-[state=active]:bg-[#500000] data-[state=active]:text-white">
                        Thursday<Badge className="ml-2 bg-[#f8e2e4] text-[#500000]">{thursdayExams.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="friday" className="md:col-span-2 data-[state=active]:bg-[#500000] data-[state=active]:text-white">
                        Friday<Badge className="ml-2 bg-[#f8e2e4] text-[#500000]">{fridayExams.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="monday" className="md:col-span-2 data-[state=active]:bg-[#500000] data-[state=active]:text-white">
                        Monday<Badge className="ml-2 bg-[#f8e2e4] text-[#500000]">{mondayExams.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="tuesday" className="md:col-span-2 data-[state=active]:bg-[#500000] data-[state=active]:text-white">
                        Tuesday<Badge className="ml-2 bg-[#f8e2e4] text-[#500000]">{tuesdayExams.length}</Badge>
                    </TabsTrigger>
                </TabsList>

                <IndividualStaticFinal 
                    exams={thursdayExams} 
                    dayValue="thursday"
                    dayTitle="Thursday, May 1, 2025"
                />

                <IndividualStaticFinal 
                    exams={fridayExams} 
                    dayValue="friday"
                    dayTitle="Friday, May 2, 2025"
                />

                <IndividualStaticFinal 
                    exams={mondayExams} 
                    dayValue="monday"
                    dayTitle="Monday, May 5, 2025"
                />

                <IndividualStaticFinal 
                    exams={tuesdayExams} 
                    dayValue="tuesday"
                    dayTitle="Tuesday, May 6, 2025"
                />
            </Tabs>
        </div>
    );
}