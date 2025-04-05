import { LectureSchedule, FinalExam } from "../api/types";

export function findFinalExam(lectureSchedule: LectureSchedule): FinalExam {
  // Convert time from "HH:MM AM/PM" format to decimal hours
  const convertToDecimalHours = (timeStr: string): number => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    let hoursNum = parseInt(hours);
    
    if (period === "PM" && hoursNum < 12) {
      hoursNum += 12;
    } else if (period === "AM" && hoursNum === 12) {
      hoursNum = 0;
    }
    
    return hoursNum + parseInt(minutes) / 60;
  };

  // Get meeting pattern and decimal time
  const days = lectureSchedule.days;
  const startTime = convertToDecimalHours(lectureSchedule.beginTime);
  
  // Define schedule mappings directly
  const examMappings = [
    // Format: { dayPattern, timeStart, timeEnd, examDate, examTime }
    
    // May 1 (Thursday)
    { dayPattern: "MW", timeStart: 17.75, timeEnd: 19.00, examDate: "May 1, 2025 (Thursday)", examTime: "7:30 - 9:30 a.m." },
    { dayPattern: "MW", timeStart: 19.50, timeEnd: 20.75, examDate: "May 1, 2025 (Thursday)", examTime: "7:30 - 9:30 a.m." },
    { dayPattern: "MWF", timeStart: 8.00, timeEnd: 8.83, examDate: "May 1, 2025 (Thursday)", examTime: "10:00 a.m. - 12:00 p.m. (noon)" },
    { dayPattern: "MWF", timeStart: 8.58, timeEnd: 9.42, examDate: "May 1, 2025 (Thursday)", examTime: "10:00 a.m. - 12:00 p.m. (noon)" },
    { dayPattern: "TR", timeStart: 9.58, timeEnd: 10.83, examDate: "May 1, 2025 (Thursday)", examTime: "12:30 - 2:30 p.m." },
    { dayPattern: "TR", timeStart: 10.33, timeEnd: 11.58, examDate: "May 1, 2025 (Thursday)", examTime: "12:30 - 2:30 p.m." },
    { dayPattern: "TR", timeStart: 11.17, timeEnd: 12.42, examDate: "May 1, 2025 (Thursday)", examTime: "3:00 - 5:00 p.m." },
    { dayPattern: "TR", timeStart: 11.92, timeEnd: 13.17, examDate: "May 1, 2025 (Thursday)", examTime: "3:00 - 5:00 p.m." },
    { dayPattern: "MW", timeStart: 19.33, timeEnd: 20.58, examDate: "May 1, 2025 (Thursday)", examTime: "6:00 - 8:00 p.m." },
    { dayPattern: "MW", timeStart: 21.08, timeEnd: 22.33, examDate: "May 1, 2025 (Thursday)", examTime: "6:00 - 8:00 p.m." },
    
    // May 2 (Friday)
    { dayPattern: "MWF", timeStart: 9.17, timeEnd: 10.00, examDate: "May 2, 2025 (Friday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 9.75, timeEnd: 10.58, examDate: "May 2, 2025 (Friday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 12.67, timeEnd: 13.50, examDate: "May 2, 2025 (Friday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "MWF", timeStart: 13.25, timeEnd: 14.08, examDate: "May 2, 2025 (Friday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "TR", timeStart: 8.00, timeEnd: 9.25, examDate: "May 2, 2025 (Friday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "TR", timeStart: 8.75, timeEnd: 10.00, examDate: "May 2, 2025 (Friday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "MW", timeStart: 16.17, timeEnd: 17.42, examDate: "May 2, 2025 (Friday)", examTime: "3:30 - 5:30 p.m." },
    { dayPattern: "MW", timeStart: 17.92, timeEnd: 19.33, examDate: "May 2, 2025 (Friday)", examTime: "3:30 - 5:30 p.m." },
    
    // May 5 (Monday)
    { dayPattern: "MWF", timeStart: 10.33, timeEnd: 11.17, examDate: "May 5, 2025 (Monday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 10.92, timeEnd: 11.75, examDate: "May 5, 2025 (Monday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 15.00, timeEnd: 15.83, examDate: "May 5, 2025 (Monday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "MW", timeStart: 16.33, timeEnd: 17.58, examDate: "May 5, 2025 (Monday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "TR", timeStart: 15.92, timeEnd: 17.17, examDate: "May 5, 2025 (Monday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "TR", timeStart: 16.67, timeEnd: 17.92, examDate: "May 5, 2025 (Monday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "MWF", timeStart: 13.83, timeEnd: 14.67, examDate: "May 5, 2025 (Monday)", examTime: "3:30 - 5:30 p.m." },
    { dayPattern: "MW", timeStart: 14.42, timeEnd: 15.67, examDate: "May 5, 2025 (Monday)", examTime: "3:30 - 5:30 p.m." },
    { dayPattern: "TR", timeStart: 19.08, timeEnd: 20.33, examDate: "May 5, 2025 (Monday)", examTime: "6:00 - 8:00 p.m." },
    { dayPattern: "TR", timeStart: 19.83, timeEnd: 21.08, examDate: "May 5, 2025 (Monday)", examTime: "6:00 - 8:00 p.m." },
    
    // May 6 (Tuesday)
    { dayPattern: "TR", timeStart: 12.75, timeEnd: 14.00, examDate: "May 6, 2025 (Tuesday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "TR", timeStart: 13.50, timeEnd: 14.75, examDate: "May 6, 2025 (Tuesday)", examTime: "8:00 - 10:00 a.m." },
    { dayPattern: "MWF", timeStart: 11.50, timeEnd: 12.33, examDate: "May 6, 2025 (Tuesday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "MWF", timeStart: 12.08, timeEnd: 12.92, examDate: "May 6, 2025 (Tuesday)", examTime: "10:30 a.m. - 12:30 p.m." },
    { dayPattern: "TR", timeStart: 14.33, timeEnd: 15.58, examDate: "May 6, 2025 (Tuesday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "TR", timeStart: 15.08, timeEnd: 16.33, examDate: "May 6, 2025 (Tuesday)", examTime: "1:00 - 3:00 p.m." },
    { dayPattern: "TR", timeStart: 17.50, timeEnd: 18.75, examDate: "May 6, 2025 (Tuesday)", examTime: "3:30 - 5:30 p.m." },
    { dayPattern: "TR", timeStart: 18.25, timeEnd: 19.50, examDate: "May 6, 2025 (Tuesday)", examTime: "3:30 - 5:30 p.m." }
  ];

  // Helper function to check if days match
  const daysMatch = (classDays: string, scheduleDays: string): boolean => {
    // Exact match
    if (classDays === scheduleDays) {
      return true;
    }
    
    // Single day mapping to double days
    if (scheduleDays === "MW" && (classDays === "M" || classDays === "W")) {
      return true;
    }
    
    if (scheduleDays === "TR" && (classDays === "T" || classDays === "R")) {
      return true;
    }
    
    // MWF pattern matching
    if (scheduleDays === "MWF") {
      return classDays.split("").every(day => "MWF".includes(day));
    }
    
    return false;
  };

  // Find a matching slot with a tiny tolerance for time
  const match = examMappings.find(mapping => 
    daysMatch(days, mapping.dayPattern) && 
    startTime >= mapping.timeStart && 
    startTime <= mapping.timeEnd
  );

  if (match) {
    return {
      success: true,
      error: null,
      date: match.examDate,
      examTime: match.examTime,
      schedule: lectureSchedule
    };
  }

  return {
    success: false,
    error: "No matching final exam time found for this course schedule",
    schedule: lectureSchedule
  };
}