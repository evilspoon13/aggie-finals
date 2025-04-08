import { LectureSchedule, FinalExam } from "../api/types";
import { examMappings } from "./examData";

export function findFinalExam(lectureSchedule: LectureSchedule): FinalExam {
  // Convert time from "HH:MM AM/PM" format to decimal hours
  const convertToDecimalHours = (timeStr: string): number => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    let hoursNum = parseInt(hours);
    
    if(period === "PM" && hoursNum < 12){
      hoursNum += 12;
    } 
    else if(period === "AM" && hoursNum === 12){
      hoursNum = 0;
    }
    
    // round to 2 decimal places to avoid floating point precision issues
    return parseFloat((hoursNum + parseInt(minutes) / 60).toFixed(2));
  };

  // get meeting pattern and decimal time
  const days = lectureSchedule.days;
  const startTime = convertToDecimalHours(lectureSchedule.beginTime);
  
  // small tolerance for floating-point comparison
  const TIME_TOLERANCE = 0.01;

  // helper function to check if days match
  const daysMatch = (classDays: string, scheduleDays: string): boolean => {
    // Exact match
    if(classDays === scheduleDays) {
      return true;
    }
    
    // Single day mapping to double days
    if(scheduleDays === "MW" && (classDays === "M" || classDays === "W")){
      return true;
    }
    
    if (scheduleDays === "TR" && (classDays === "T" || classDays === "R")){
      return true;
    }
    
    // MWF pattern matching
    if (scheduleDays === "MWF") {
      return classDays.split("").every(day => "MWF".includes(day));
    }
    
    return false;
  };

  // Find a matching slot with a tolerance for time
  const match = examMappings.find(mapping => 
    daysMatch(days, mapping.dayPattern) && 
    startTime >= (mapping.timeStart - TIME_TOLERANCE) && 
    startTime <= (mapping.timeEnd + TIME_TOLERANCE)
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