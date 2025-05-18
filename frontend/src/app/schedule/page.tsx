import { GoBackButton } from "@/components/GoBackButton";
import { CourseEntry } from "../api/types";
import { FinalExamCard } from "@/components/FinalExamCard";

export default function Calendar(){

    const courses: CourseEntry[] = [
        {
            crn: "100",
            loading: false,
            error: null,
            courseDetails: {
                subject: "CSCE",
                courseNumber: "120",
                section: "500",
                title: "Program Design and Concepts",
                instructor: "John Michael Moore"
            },
            lectureSchedule: {
                days: "MWF",
                beginTime: "9:10",
                endTime: "10:00",
                courseType: "Lecture",
                creditHours: 3,
            },
            finalExam: {
                success: true,
                error: null,
                schedule: {
                    days: "MWF",
                    beginTime: "9:10",
                    endTime: "10:00",
                    courseType: "Lecture",
                    creditHours: 3,
                },
                date: "May 5th",
                examTime: "10:00-1:00PM"
            }
        },

        {
            crn: "100",
            loading: false,
            error: null,
            courseDetails: {
                subject: "CSCE",
                courseNumber: "120",
                section: "500",
                title: "Program Design and Concepts",
                instructor: "John Michael Moore"
            },
            lectureSchedule: {
                days: "MWF",
                beginTime: "9:10",
                endTime: "10:00",
                courseType: "Lecture",
                creditHours: 3,
            },
            finalExam: {
                success: true,
                error: null,
                schedule: {
                    days: "MWF",
                    beginTime: "9:10",
                    endTime: "10:00",
                    courseType: "Lecture",
                    creditHours: 3,
                },
                date: "May 5th",
                examTime: "10:00-1:00PM"
            }
        }
    ];



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
                    {courses.map((course, index) => (
                        <div key={index}>
                        <FinalExamCard
                            subject={course.courseDetails?.subject}
                            courseNumber={course.courseDetails?.courseNumber}
                            title={course.courseDetails?.title}
                            loading={course.loading}
                            error={course.error}
                            lectureSchedule={course.lectureSchedule}
                            finalExam={course.finalExam}
                            crn={course.crn}
                        />
                        </div>
                    ))}
            </div>
        </div>
    </div>
    );
}