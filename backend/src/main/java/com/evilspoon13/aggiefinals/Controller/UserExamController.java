package com.evilspoon13.aggiefinals.Controller;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Service.UserExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserExamController {

    @Autowired
    private UserExamService userExamService;

    // Get user's exam schedule
    @GetMapping("/{googleId}/exams")
    public ResponseEntity<Set<FinalExam>> getUserExams(@PathVariable String googleId) {
        try {
            Set<FinalExam> exams = userExamService.getUserExams(googleId);
            return ResponseEntity.ok(exams);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Add exam to user's schedule
    @PostMapping("/{googleId}/exams/{examId}")
    public ResponseEntity<String> addExamToUser(@PathVariable String googleId,
                                                @PathVariable Long examId) {
        try {
            userExamService.addExamToUser(googleId, examId);
            return ResponseEntity.ok("Exam added successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Remove exam from user's schedule
    @DeleteMapping("/{googleId}/exams/{examId}")
    public ResponseEntity<String> removeExamFromUser(@PathVariable String googleId,
                                                     @PathVariable Long examId) {
        try {
            userExamService.removeExamFromUser(googleId, examId);
            return ResponseEntity.ok("Exam removed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Create or update user (for NextAuth)
    @PostMapping("/auth")
    public ResponseEntity<User> createOrUpdateUser(@RequestBody UserAuthRequest request) {
        try {
            User user = userExamService.createOrUpdateUser(
                    request.getGoogleId(),
                    request.getEmail(),
                    request.getName()
            );
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DTO for user authentication
    public static class UserAuthRequest {
        private String googleId;
        private String email;
        private String name;

        // Getters and setters
        public String getGoogleId() { return googleId; }
        public void setGoogleId(String googleId) { this.googleId = googleId; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}