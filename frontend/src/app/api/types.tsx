export interface CourseRequest{
    term: string;
    crn: string;
}

export interface CourseMeeting {
    SSRMEET_CREDIT_HR_SESS: number;
    SSRMEET_SUN_DAY: string | null;
    SSRMEET_MON_DAY: string | null;
    SSRMEET_TUE_DAY: string | null;
    SSRMEET_WED_DAY: string | null;
    SSRMEET_THU_DAY: string | null;
    SSRMEET_FRI_DAY: string | null;
    SSRMEET_SAT_DAY: string | null;
    SSRMEET_BEGIN_TIME: string;
    SSRMEET_END_TIME: string;
    SSRMEET_START_DATE: string;
    SSRMEET_END_DATE: string;
    SSRMEET_BLDG_CODE: string;
    SSRMEET_ROOM_CODE: string;
    SSRMEET_MTYP_CODE: string;
  }
export interface CourseInstructor{
    NAME: string;
}

export interface CourseResponse {
    SWV_CLASS_SEARCH_TERM: string;
    SWV_CLASS_SEARCH_CRN: string;
    SWV_CLASS_SEARCH_TITLE: string;
    SWV_CLASS_SEARCH_SUBJECT: string;
    SWV_CLASS_SEARCH_SUBJECT_DESC: string;
    SWV_CLASS_SEARCH_COURSE: string;
    SWV_CLASS_SEARCH_SECTION: string;
    SWV_CLASS_SEARCH_SSBSECT_HOURS: number | null;
    SWV_CLASS_SEARCH_HOURS_LOW: number | null;
    SWV_CLASS_SEARCH_HOURS_IND: string | null;
    SWV_CLASS_SEARCH_HOURS_HIGH: string | null;
    SWV_CLASS_SEARCH_SITE: string;
    SWV_CLASS_SEARCH_PTRM: string;
    SWV_CLASS_SEARCH_HAS_SYL_IND: string;
    STUSEAT_OPEN: string;
    SWV_CLASS_SEARCH_MAX_ENRL: string;
    SWV_CLASS_SEARCH_ENRL: string;
    SWV_CLASS_SEARCH_SEATS_AVAIL: string;
    SWV_WAIT_CAPACITY: string;
    SWV_WAIT_COUNT: string;
    SWV_WAIT_AVAIL: string;
    SWV_CLASS_SEARCH_SCHD: string;
    SWV_CLASS_SEARCH_INST_TYPE: string;
    SWV_CLASS_SEARCH_INSTRCTR_JSON: string; // JSON string to be parsed
    SWV_CLASS_SEARCH_JSON_CLOB: string;      // JSON string to be parsed
    SWV_CLASS_SEARCH_ATTRIBUTES: string;
    SWV_CLASS_SEARCH_SESSION: string;
    HRS_COLUMN_FIELD: number;
  }

  export interface CourseSection {
    SWV_CLASS_SEARCH_TERM: string;
    SWV_CLASS_SEARCH_CRN: string;
    SWV_CLASS_SEARCH_TITLE: string;
    SWV_CLASS_SEARCH_SUBJECT: string;
    SWV_CLASS_SEARCH_SUBJECT_DESC: string;
    SWV_CLASS_SEARCH_COURSE: string;
    SWV_CLASS_SEARCH_SECTION: string;
    SWV_CLASS_SEARCH_SSBSECT_HOURS: number | null;
    SWV_CLASS_SEARCH_HOURS_LOW: number | null;
    SWV_CLASS_SEARCH_HOURS_IND: string | null;
    SWV_CLASS_SEARCH_HOURS_HIGH: string | null;
    SWV_CLASS_SEARCH_SITE: string;
    SWV_CLASS_SEARCH_PTRM: string;
    SWV_CLASS_SEARCH_HAS_SYL_IND: string;
    STUSEAT_OPEN: string;
    SWV_CLASS_SEARCH_MAX_ENRL: string;
    SWV_CLASS_SEARCH_ENRL: string;
    SWV_CLASS_SEARCH_SEATS_AVAIL: string;
    SWV_WAIT_CAPACITY: string;
    SWV_WAIT_COUNT: string;
    SWV_WAIT_AVAIL: string;
    SWV_CLASS_SEARCH_SCHD: string;
    SWV_CLASS_SEARCH_INST_TYPE: string;
    SWV_CLASS_SEARCH_INSTRCTR_JSON: string;
    SWV_CLASS_SEARCH_JSON_CLOB: string;
    SWV_CLASS_SEARCH_ATTRIBUTES: string;
    SWV_CLASS_SEARCH_SESSION: string;
    HRS_COLUMN_FIELD: number;
  }

export interface LectureSchedule {
    days: string;
    beginTime: string;
    endTime: string;
    courseType?: string;
    creditHours?: number | null;
}
// Change this interface name
export interface FinalExamResult {  // Changed from FinalExam
    success: boolean;
    error: string | null;
    schedule?: LectureSchedule | null;
    date?: string;
    examTime?: string;
    courseDetails?: CourseDetails
}

// Add the new backend interface
export interface FinalExam {
    examId: number;
    termId: string;
    dayPattern: string;
    date: string; // ISO date string
    examTime: string;
    classBeginTime: string;
    classEndTime: string;
}

// Update CourseEntry to use the new name
export interface CourseEntry {
    crn: string;
    loading: boolean;
    error: string | null;
    courseDetails?: CourseDetails;
    lectureSchedule?: LectureSchedule;
    finalExam?: FinalExamResult;  // Changed from FinalExam
}

export interface CourseSectionRequest {
    department?: string;
    courseNumber?: string;
}

export interface CourseDetails{
    subject: string;
    courseNumber: string;
    section: string;
    title: string;
    instructor: string;
}


export interface CourseSectionRequest {
    department?: string;
    courseNumber?: string;
}