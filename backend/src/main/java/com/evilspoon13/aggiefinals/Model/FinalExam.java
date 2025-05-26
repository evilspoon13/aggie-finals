package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "final_exams")
public class FinalExam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private Integer examId;

    @Column(name = "term_id", nullable = false, length = 10)
    private String termId;

    @Column(name = "crn", nullable = false, length = 10)
    private String crn;

    @Column(name = "success", nullable = false)
    private Boolean success = true;

    @Column(name = "error")
    private String error;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "exam_time", length = 50)
    private String examTime;

    // Store course info as simple fields (not foreign keys)
    @Column(name = "subject", length = 10)
    private String subject;

    @Column(name = "course_number", length = 10)
    private String courseNumber;

    @Column(name = "section", length = 10)
    private String section;

    @Column(name = "title")
    private String title;

    @Column(name = "instructor", length = 100)
    private String instructor;

    // Store schedule info as simple fields
    @Column(name = "days", length = 10)
    private String days;

    @Column(name = "begin_time")
    private LocalTime beginTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "course_type", length = 50)
    private String courseType;

    @Column(name = "credit_hours")
    private BigDecimal creditHours;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @ManyToMany(mappedBy = "finalExams")
    private Set<User> users = new HashSet<>();

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public String getTermId() {
        return termId;
    }

    public void setTermId(String termId) {
        this.termId = termId;
    }

    public String getCrn() {
        return crn;
    }

    public void setCrn(String crn) {
        this.crn = crn;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
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

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public LocalTime getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(LocalTime beginTime) {
        this.beginTime = beginTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public BigDecimal getCreditHours() {
        return creditHours;
    }

    public void setCreditHours(BigDecimal creditHours) {
        this.creditHours = creditHours;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}