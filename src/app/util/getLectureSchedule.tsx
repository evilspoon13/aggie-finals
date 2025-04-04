import { CourseMeeting } from "../api/types";


export const getLectureSchedule = (meetings: CourseMeeting[]) => {
    // Find the lecture meeting
    const lectureMeeting = meetings.find(meeting => 
      meeting.SSRMEET_MTYP_CODE === "Lecture" || 
      meeting.SSRMEET_CREDIT_HR_SESS > 0
    );
    
    if (!lectureMeeting) {
      return null;
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
    
    return {
      days: daysString,
      beginTime: lectureMeeting.SSRMEET_BEGIN_TIME,
      endTime: lectureMeeting.SSRMEET_END_TIME,
    };
  };