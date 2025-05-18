package com.evilspoon13.aggiefinals.Model;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "lecture_schedules")
public class LectureSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "days", nullable = false, length = 10)
    private String days;

    @Column(name = "begin_time", nullable = false)
    private LocalTime beginTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "course_type", length = 50)
    private String courseType;

    @Column(name = "credit_hours")
    private int creditHours;
}
