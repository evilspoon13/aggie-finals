import { CourseMeeting } from "../api/types";

export const getLectureSchedule = (meetings: CourseMeeting[]) => {
  const lectureMeeting = meetings.find(meeting => 
    meeting.SSRMEET_MTYP_CODE === "Lecture" || 
    meeting.SSRMEET_CREDIT_HR_SESS > 0
  );
  
  if (!lectureMeeting) {
    return null;
  }
  
  // check if all days are null (online course)
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
  
  // Check if it's a seminar or special course type
  const isSpecialCourseType = 
    lectureMeeting.SSRMEET_MTYP_CODE === "Seminar" || 
    lectureMeeting.SSRMEET_MTYP_CODE === "Research" ||
    lectureMeeting.SSRMEET_MTYP_CODE === "Independent Study";
  
  // return special values for fully online courses with no meeting days
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
  
  // online delivery courses?
  if (isOnlineDelivery) {
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
      courseType: "Online " + (lectureMeeting.SSRMEET_MTYP_CODE || "Course")
    };
  }
  
  // for seminars and special courses!
  if (isSpecialCourseType) {
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
      courseType: lectureMeeting.SSRMEET_MTYP_CODE
    };
  }
  
  // for regular in-person courses
  return {
    days: daysString,
    beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
    endTime: lectureMeeting.SSRMEET_END_TIME,
    courseType: "Lecture" // default
  };
};