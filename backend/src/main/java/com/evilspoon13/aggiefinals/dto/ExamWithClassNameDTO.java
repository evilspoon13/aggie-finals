package com.evilspoon13.aggiefinals.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ExamWithClassNameDTO {
    private Long examId;
    private String termId;
    private String dayPattern;
    private LocalDate date;
    private String examTime;
    private LocalTime classBeginTime;
    private LocalTime classEndTime;
    private String className;

    public ExamWithClassNameDTO() {
    }

    // Constructor to easily create from FinalExam and className
    public ExamWithClassNameDTO(Long examId, String termId, String dayPattern,
                                LocalDate date, String examTime, LocalTime classBeginTime,
                                LocalTime classEndTime, String className) {
        this.examId = examId;
        this.termId = termId;
        this.dayPattern = dayPattern;
        this.date = date;
        this.examTime = examTime;
        this.classBeginTime = classBeginTime;
        this.classEndTime = classEndTime;
        this.className = className;
    }

    // Getters and setters
    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getExamTime() {
        return examTime;
    }

    public void setExamTime(String examTime) {
        this.examTime = examTime;
    }

    public LocalTime getClassBeginTime() {
        return classBeginTime;
    }

    public void setClassBeginTime(LocalTime classBeginTime) {
        this.classBeginTime = classBeginTime;
    }

    public LocalTime getClassEndTime() {
        return classEndTime;
    }

    public void setClassEndTime(LocalTime classEndTime) {
        this.classEndTime = classEndTime;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}