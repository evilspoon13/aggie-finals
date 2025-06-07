package com.evilspoon13.aggiefinals.DTO;

import java.time.LocalTime;

public class ExamRequest{
    private String termId;
    private String dayPattern;
    private LocalTime classStartTime;
    private LocalTime classEndTime;

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

    public LocalTime getClassStartTime() {
        return classStartTime;
    }
    public void setClassStartTime(LocalTime classStartTime) {
        this.classStartTime = classStartTime;
    }

    public LocalTime getClassEndTime() {
        return classEndTime;
    }
    public void setClassEndTime(LocalTime classEndTime) {
        this.classEndTime = classEndTime;
    }
}