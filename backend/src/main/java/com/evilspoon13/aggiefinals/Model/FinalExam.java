package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_details_id")
    private CourseDetails courseDetails;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schedule_id")
    private LectureSchedule schedule;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @ManyToMany(mappedBy = "finalExams")
    private Set<User> users = new HashSet<>();

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

    public CourseDetails getCourseDetails() {
        return courseDetails;
    }

    public void setCourseDetails(CourseDetails courseDetails) {
        this.courseDetails = courseDetails;
    }

    public LectureSchedule getSchedule() {
        return schedule;
    }

    public void setSchedule(LectureSchedule schedule) {
        this.schedule = schedule;
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