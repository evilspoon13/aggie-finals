import { useAllExams } from "@/app/api/hooks/useAllExams";
import { IndividualStaticFinal } from "./IndividualStaticFinal";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { FinalExam } from "@/app/api/types";


interface GroupedExams {
  thursdayExams: FinalExam[];
  fridayExams: FinalExam[];
  mondayExams: FinalExam[];
  tuesdayExams: FinalExam[];
}

function groupExamsByDay(examData: FinalExam[]): GroupedExams {
  const grouped = examData.reduce((acc, exam) => {
    console.log(`Processing exam with date: ${exam.date}`);
    
    // Just check the actual date strings from your database
    if (exam.date.includes('2025-12-11')) { // Thursday
      acc.thursdayExams.push(exam);
    } else if (exam.date.includes('2025-12-12')) { // Friday
      acc.fridayExams.push(exam);
    } else if (exam.date.includes('2025-12-15')) { // Monday
      acc.mondayExams.push(exam);
    } else if (exam.date.includes('2025-12-16')) { // Tuesday
      acc.tuesdayExams.push(exam);
    }
    
    return acc;
  }, {
    thursdayExams: [] as FinalExam[],
    fridayExams: [] as FinalExam[],
    mondayExams: [] as FinalExam[],
    tuesdayExams: [] as FinalExam[]
  });

  return grouped;
}

// Helper function to format exam data for display
const formatExamForDisplay = (exam: FinalExam) => ({
  dayPattern: exam.dayPattern,
  examDate: formatDate(exam.date),
  examTime: exam.examTime,
  regularClassTime: formatClassTime(exam.classBeginTime, exam.classEndTime),
  examId: exam.examId
});

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const formatClassTime = (beginTime: string, endTime: string): string => {
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'p.m.' : 'a.m.';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };
  
  return `${formatTime(beginTime)} – ${formatTime(endTime)}`;
};

export const StaticFinalData: React.FC = () => {
  const { exams, loading, error } = useAllExams("202531"); // Fall 2025 term
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#562626] mb-2">Fall 2025 Final Exam Schedule</h1>
          <p className="text-gray-600">Loading exam data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#562626] mb-2">Fall 2025 Final Exam Schedule</h1>
          <p className="text-red-600">Error loading exam data: {error}</p>
        </div>
      </div>
    );
  }

  const { thursdayExams, fridayExams, mondayExams, tuesdayExams } = groupExamsByDay(exams);

  const formattedThursdayExams = thursdayExams.map(formatExamForDisplay);
  const formattedFridayExams = fridayExams.map(formatExamForDisplay);
  const formattedMondayExams = mondayExams.map(formatExamForDisplay);
  const formattedTuesdayExams = tuesdayExams.map(formatExamForDisplay);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#562626] mb-2">Fall 2025 Final Exam Schedule</h1>
        <p className="text-gray-600">Old school? Find your final exam times by hand.</p>
      </div>

      <Tabs defaultValue="thursday" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6 w-full">
          <TabsTrigger value="thursday" className="md:col-span-2 data-[state=active]:bg-[#562626] data-[state=active]:text-white">
            Thu<Badge className="ml-2 bg-[#f8e2e4] text-[#562626]">{formattedThursdayExams.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="friday" className="md:col-span-2 data-[state=active]:bg-[#562626] data-[state=active]:text-white">
            Fri<Badge className="ml-2 bg-[#f8e2e4] text-[#562626]">{formattedFridayExams.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="monday" className="md:col-span-2 data-[state=active]:bg-[#562626] data-[state=active]:text-white">
            Mon<Badge className="ml-2 bg-[#f8e2e4] text-[#562626]">{formattedMondayExams.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tuesday" className="md:col-span-2 data-[state=active]:bg-[#562626] data-[state=active]:text-white">
            Tue<Badge className="ml-2 bg-[#f8e2e4] text-[#562626]">{formattedTuesdayExams.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <IndividualStaticFinal 
          exams={formattedThursdayExams} 
          dayValue="thursday"
          dayTitle="Thursday, December 11, 2025"
        />

        <IndividualStaticFinal 
          exams={formattedFridayExams} 
          dayValue="friday"
          dayTitle="Friday, December 12, 2025"
        />

        <IndividualStaticFinal 
          exams={formattedMondayExams} 
          dayValue="monday"
          dayTitle="Monday, December 15, 2025"
        />

        <IndividualStaticFinal 
          exams={formattedTuesdayExams} 
          dayValue="tuesday"
          dayTitle="Tuesday, December 16, 2025"
        />
      </Tabs>
    </div>
  );
};