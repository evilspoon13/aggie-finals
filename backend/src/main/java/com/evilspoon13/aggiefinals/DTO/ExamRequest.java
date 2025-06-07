package com.evilspoon13.aggiefinals.DTO;

import java.time.LocalTime;

public class ExamRequest{
    private String termId;
    private String dayPattern;
    private String classStartTime;
    private String classEndTime;

    public String getTermId() {
        return termId;
    }
    public void setTermId(String termId) {
        this.termId = termId;
    }

    public String getDayPattern() {
        return dayPattern;
    }
    public void setDayPattern(String dayPattern) {
        this.dayPattern = dayPattern;
    }

    public String getClassStartTime() {
        return classStartTime;
    }
    public void setClassStartTime(String classStartTime) {
        this.classStartTime = classStartTime;
    }

    public String getClassEndTime() {
        return classEndTime;
    }
    public void setClassEndTime(String classEndTime) {
        this.classEndTime = classEndTime;
    }
}