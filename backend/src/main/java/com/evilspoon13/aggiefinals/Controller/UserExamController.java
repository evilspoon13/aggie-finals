package com.evilspoon13.aggiefinals.Controller;

import com.evilspoon13.aggiefinals.DTO.ExamWithClassNameDTO;
import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Model.UserExam;
import com.evilspoon13.aggiefinals.Service.UserExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserExamController {

    @Autowired
    private UserExamService userExamService;

    @GetMapping("/{googleId}/exams")
    public ResponseEntity<Set<ExamWithClassNameDTO>> getUserExams(@PathVariable String googleId) {
        try {
            Set<ExamWithClassNameDTO> exams = userExamService.getUserExamsWithClassName(googleId);
            return ResponseEntity.ok(exams);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Add exam to user's schedule
    @PostMapping
    public ResponseEntity<String> addExamToUser(@RequestBody UserExam userExam) {
        try {
            userExamService.addExamToUser(userExam);
            return ResponseEntity.ok("Exam added successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Remove exam from user's schedule
    @DeleteMapping
    public ResponseEntity<String> removeExamFromUser(@RequestBody UserExam userExam) {
        try {
            userExamService.removeExamFromUser(userExam);
            return ResponseEntity.ok("Exam removed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}