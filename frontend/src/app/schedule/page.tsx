"use client";

import { GoBackButton } from "@/components/GoBackButton";
import { CalendarExamCard } from "@/components/CalendarExamCard";
import { useUserExams, ExamWithClassName } from "../api/hooks/useUserExams";
import { useEffect, useState } from "react";

export default function Calendar(){
    const { getUserExams, removeExamFromSchedule } = useUserExams();
    const [userExams, setUserExams] = useState<ExamWithClassName[]>([]);

    useEffect(() => {
        const fetchExams = async () => {
            const userExams = await getUserExams();
            if (userExams) {
                setUserExams(userExams);
            }
        }
        fetchExams();
    }, [])

    const handleRemoveExam = async (examId: number) => {
        // Find the exam to get its className
        const examToRemove = userExams.find(exam => exam.examId === examId);
        if (!examToRemove) {
            console.error('Exam not found');
            return;
        }

        const success = await removeExamFromSchedule(examId, examToRemove.className);
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
            
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6 text-white">Your Final Exams</h2>
                </div>

                <div className="w-2xl max-w-4xl space-y-8 p-6 bg-white rounded-lg shadow-md">
                    
                    {userExams.length === 0 ? (
                        <p className="text-center text-gray-500">No exams added yet!</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userExams.map((exam) => (
                                <CalendarExamCard 
                                    key={exam.examId} 
                                    exam={exam} 
                                    onRemove={handleRemoveExam}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}