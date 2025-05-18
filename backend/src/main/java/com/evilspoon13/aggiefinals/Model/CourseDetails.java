package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "course_details")
public class CourseDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_details_id")
    private Long courseDetailsId;

    @Column(name = "subject", nullable = false, length = 10)
    private String subject;

    @Column(name = "course_number", nullable = false, length = 10)
    private String courseNumber;

    @Column(name = "section", nullable = false, length = 10)
    private String section;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "instructor", length = 100)
    private String instructor;

    public Long getCourseDetailsId() {
        return courseDetailsId;
    }

    public void setCourseDetailsId(Long courseDetailsId) {
        this.courseDetailsId = courseDetailsId;
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
}
