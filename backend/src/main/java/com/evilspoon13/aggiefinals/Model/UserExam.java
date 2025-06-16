package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_exams")
public class UserExam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "id", nullable = false)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "exam_id", nullable = false)
    private Long examId;

    @Column(name = "class_name")
    private String className;

    public UserExam() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
