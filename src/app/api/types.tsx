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
    // both gross json that need to be parsed
    SWV_CLASS_SEARCH_INSTRCTR_JSON: string;
    SWV_CLASS_SEARCH_JSON_CLOB: string; 
}