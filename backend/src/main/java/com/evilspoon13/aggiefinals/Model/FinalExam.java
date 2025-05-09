package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "final_exams")
public class FinalExam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private Long id;

    @Column(name = "course_code", nullable = false, unique = true)
    private String courseCode;

    @Column(name = "course_description")
    private String courseDescription;

    @Column(name = "course_lecture_days")
    private String courseLectureDays;

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    @Column(name = "exam_start_time", nullable = false)
    private LocalTime examStartTime;

    @Column(name = "exam_end_time", nullable = false)
    private LocalTime examEndTime;

    @ManyToMany(mappedBy = "finalExams")
    private List<User> users = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getCourseLectureDays() {
        return courseLectureDays;
    }

    public void setCourseLectureDays(String courseLectureDays) {
        this.courseLectureDays = courseLectureDays;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public LocalTime getExamStartTime() {
        return examStartTime;
    }

    public void setExamStartTime(LocalTime examStartTime) {
        this.examStartTime = examStartTime;
    }

    public LocalTime getExamEndTime() {
        return examEndTime;
    }

    public void setExamEndTime(LocalTime examEndTime) {
        this.examEndTime = examEndTime;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
