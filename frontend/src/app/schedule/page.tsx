"use client";

import { GoBackButton } from "@/components/GoBackButton";
import { FinalExam } from "../api/types";
import { CalendarExamCard } from "@/components/CalendarExamCard";
import { useUserExams } from "../api/hooks/useUserExams";
import { useEffect, useState } from "react";

export default function Calendar(){
    const { getUserExams, removeExamFromSchedule } = useUserExams(); // Get remove function here
    const [userExams, setUserExams] = useState<FinalExam[]>([]);

    useEffect(() => {
        const fetchExams = async () => {
            const userExams = await getUserExams();
            if (userExams) {
                setUserExams(userExams);
            }
        }
        fetchExams();
    }, [])

    // Handle remove at parent level
    const handleRemoveExam = async (examId: number) => {
        const success = await removeExamFromSchedule(examId);
        if (success) {
            // Remove from local state immediately
            setUserExams(prev => prev.filter(exam => exam.examId !== examId));
        }
    };

    return(
        <div className="w-full min-h-screen bg-gradient-to-b from-[#562626]/90 via-[#8a4141] to-[#f8f0e9] relative">
            <div className="absolute top-4 left-4">
                <GoBackButton/>
            </div>
            
            <div className="flex min-h-screen flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Your Final Exams</h1>
                    </div>
                    {userExams.length === 0 ? (
                        <p className="text-center text-gray-500">No exams added yet</p>
                    ) : (
                        userExams.map((exam) => (
                            <CalendarExamCard 
                                key={exam.examId} 
                                exam={exam} 
                                onRemove={handleRemoveExam} // Pass down remove handler
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}