package com.evilspoon13.aggiefinals.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_exams")
public class UserExam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id", nullable = false)
    private Long id;

    @Column(name = "google_id", nullable = false)
    private String googleId;

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "class_name")
    private String className;

    public UserExam() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}
