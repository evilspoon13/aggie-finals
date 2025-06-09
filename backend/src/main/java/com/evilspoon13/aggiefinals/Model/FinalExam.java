package com.evilspoon13.aggiefinals.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "final_exams")
public class FinalExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private Long examId;

    @Column(name = "term_id", nullable = false, length = 10)
    private String termId;

    @Column(name = "day_pattern")
    private String dayPattern;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "exam_time", length = 50)
    private String examTime;

    @Column(name = "class_begin_time")
    private LocalTime classBeginTime;  // 8:00 AM

    @Column(name = "class_end_time")
    private LocalTime classEndTime;    // 9:15 AM

    @ManyToMany(mappedBy = "finalExams")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public FinalExam() {
    }

    public String getDayPattern() {
        return dayPattern;
    }

    public void setDayPattern(String dayPattern) {
        this.dayPattern = dayPattern;
    }

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}