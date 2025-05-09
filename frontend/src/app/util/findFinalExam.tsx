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
    
    // Round to 2 decimal places to avoid floating point precision issues
    return parseFloat((hoursNum + parseInt(minutes) / 60).toFixed(2));
  };

  // Check for 1 credit hour courses
  if(lectureSchedule.creditHours === 1){
    return {
      success: true,
      error: null,
      date: "Check with Instructor",
      examTime: "1 credit hour courses typically don't have final exams",
      schedule: lectureSchedule
    }
  }

  // Check for laboratory courses
  if(lectureSchedule.courseType === "Laboratory"){
    return {
      success: true,
      error: null,
      date: "Check with Instructor",
      examTime: "Laboratory courses typically don't have final exams",
      schedule: lectureSchedule
    };
  }

  // Check for online courses
  if(lectureSchedule.days === "Online") {
    return {
      success: true,
      error: null,
      date: "Check with Instructor",
      examTime: "Check with Instructor",
      schedule: lectureSchedule
    };
  }
  
  // Handle online delivery courses with specific meeting times
  if(lectureSchedule.courseType && lectureSchedule.courseType.startsWith("Online")) {
    return {
      success: true,
      error: null,
      date: "Check with Instructor",
      examTime: "Check with Instructor",
      schedule: lectureSchedule
    };
  }
  
  // Handle seminar, research, and other special course types
  if (lectureSchedule.courseType === "Seminar" || 
      lectureSchedule.courseType === "Research" || 
      lectureSchedule.courseType === "Independent Study") {
    return {
      success: true,
      error: null,
      date: "Check with Instructor",
      examTime: "May not have traditional final exam",
      schedule: lectureSchedule
    };
  }

  // Get meeting pattern and decimal time
  const days = lectureSchedule.days;
  const startTime = convertToDecimalHours(lectureSchedule.beginTime);
  const endTime = convertToDecimalHours(lectureSchedule.endTime);
  
  // Small tolerance for floating-point comparison
  const TIME_TOLERANCE = 0.01;

  // Helper function to check if days match
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

  // Find all potentially matching slots with a tolerance for time
  const potentialMatches = examMappings.filter(mapping => 
    daysMatch(days, mapping.dayPattern) && 
    Math.abs(startTime - mapping.timeStart) <= TIME_TOLERANCE
  );

  // if we have multiple potential matches, find the best one
  if (potentialMatches.length > 1) {
    // Try to find exact match first
    const exactMatch = potentialMatches.find(mapping => 
      Math.abs(startTime - mapping.timeStart) < 0.01 && 
      Math.abs(endTime - mapping.timeEnd) < 0.01
    );
    
    if (exactMatch) return {
      success: true,
      error: null,
      date: exactMatch.examDate,
      examTime: exactMatch.examTime,
      schedule: lectureSchedule
    };
    
    // otherwise pick the closest match
    potentialMatches.sort((a, b) => {
      const aStartDiff = Math.abs(startTime - a.timeStart);
      const aEndDiff = Math.abs(endTime - a.timeEnd);
      const bStartDiff = Math.abs(startTime - b.timeStart);
      const bEndDiff = Math.abs(endTime - b.timeEnd);
      
      return (aStartDiff + aEndDiff) - (bStartDiff + bEndDiff);
    });
    
    const bestMatch = potentialMatches[0];
    return {
      success: true,
      error: null,
      date: bestMatch.examDate,
      examTime: bestMatch.examTime,
      schedule: lectureSchedule
    };
  } 
  else if(potentialMatches.length === 1){
    // if we only have one match (ideal)
    return {
      success: true,
      error: null,
      date: potentialMatches[0].examDate,
      examTime: potentialMatches[0].examTime,
      schedule: lectureSchedule
    };
  }

  // try a more lenient match if no matches found
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

  // we tried everything bro
  return {
    success: false,
    error: "No matching final exam time found for this course schedule",
    schedule: lectureSchedule
  };
}