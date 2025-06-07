import { CourseMeeting } from "@/app/api/types";

export const getLectureSchedule = (meetings: CourseMeeting[]) => {
  // Find the meeting to use
  const lectureMeeting = meetings.find(meeting => 
    meeting.SSRMEET_MTYP_CODE === "Lecture" || 
    meeting.SSRMEET_MTYP_CODE === "Laboratory" ||
    meeting.SSRMEET_CREDIT_HR_SESS > 0
  );
  
  if (!lectureMeeting) {
    return null;
  }
  
  // Check if all days are null (online course)
  const hasNoDays = !lectureMeeting.SSRMEET_MON_DAY && 
                    !lectureMeeting.SSRMEET_TUE_DAY && 
                    !lectureMeeting.SSRMEET_WED_DAY &&
                    !lectureMeeting.SSRMEET_THU_DAY &&
                    !lectureMeeting.SSRMEET_FRI_DAY &&
                    !lectureMeeting.SSRMEET_SAT_DAY &&
                    !lectureMeeting.SSRMEET_SUN_DAY;
  
  // Check for online delivery based on building/room codes
  const isOnlineDelivery = 
    (lectureMeeting.SSRMEET_BLDG_CODE === "ONLINE" || 
     lectureMeeting.SSRMEET_ROOM_CODE === "ONLINE");
  
  // Check if it's a special course type
  const isSpecialCourseType = 
    lectureMeeting.SSRMEET_MTYP_CODE === "Seminar" || 
    lectureMeeting.SSRMEET_MTYP_CODE === "Research" ||
    lectureMeeting.SSRMEET_MTYP_CODE === "Independent Study";
  
  // Check if it's a laboratory
  const isLaboratory = lectureMeeting.SSRMEET_MTYP_CODE === "Laboratory";
  
  // Return special values for fully online courses with no meeting days
  if (hasNoDays) {
    return {
      days: "Online",
      beginTime: "Online",
      endTime: "Online",
      courseType: lectureMeeting.SSRMEET_MTYP_CODE || "Online"
    };
  }
  
  // Extract meeting days
  const days = [];
  if (lectureMeeting.SSRMEET_MON_DAY) days.push("M");
  if (lectureMeeting.SSRMEET_TUE_DAY) days.push("T");
  if (lectureMeeting.SSRMEET_WED_DAY) days.push("W");
  if (lectureMeeting.SSRMEET_THU_DAY) days.push("R");
  if (lectureMeeting.SSRMEET_FRI_DAY) days.push("F");
  if (lectureMeeting.SSRMEET_SAT_DAY) days.push("S");
  if (lectureMeeting.SSRMEET_SUN_DAY) days.push("U");
  
  const daysString = days.join("");
  
  // Online delivery courses
  if (isOnlineDelivery) {
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
      courseType: "Online " + (lectureMeeting.SSRMEET_MTYP_CODE || "Course")
    };
  }
  
  // Laboratory courses
  if (isLaboratory) {
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
      courseType: "Laboratory"
    };
  }
  
  // Seminars and special courses
  if (isSpecialCourseType) {
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
      courseType: lectureMeeting.SSRMEET_MTYP_CODE
    };
  }
  
  // Regular in-person courses
  return {
    days: daysString,
    beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
    endTime: lectureMeeting.SSRMEET_END_TIME,
    courseType: lectureMeeting.SSRMEET_MTYP_CODE || "Lecture" // Use the actual type or default to "Lecture"
  };
};