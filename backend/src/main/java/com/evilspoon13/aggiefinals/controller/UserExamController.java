package com.evilspoon13.aggiefinals.controller;

import com.evilspoon13.aggiefinals.dto.ExamWithClassNameDTO;
import com.evilspoon13.aggiefinals.exception.ExamAlreadyExistsException;
import com.evilspoon13.aggiefinals.model.UserExam;
import com.evilspoon13.aggiefinals.service.UserExamService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserExamController {

    @Autowired
    private UserExamService userExamService;

    @GetMapping("/exams")
    public ResponseEntity<Set<ExamWithClassNameDTO>> getUserExams(HttpServletRequest request) {
        try {

            String authenticatedGoogleId = (String) request.getAttribute("authenticatedGoogleId");

            // user can only access their own exams
            if (authenticatedGoogleId == null) {
                return ResponseEntity.status(403).body(null); // Forbidden
            }

            Set<ExamWithClassNameDTO> exams = userExamService.getUserExamsWithClassName(authenticatedGoogleId);

            return ResponseEntity.ok(exams);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Add exam to user's schedule
    @PostMapping
    public ResponseEntity<String> addExamToUser(@RequestBody UserExam userExam,
                                                HttpServletRequest request) {
        try {
            String authenticatedGoogleId = (String) request.getAttribute("authenticatedGoogleId");

            // user can only add exams to their own schedule
            if (authenticatedGoogleId == null || !authenticatedGoogleId.equals(userExam.getGoogleId())) {
                return ResponseEntity.status(403).body(null); // Forbidden
            }

            if(userExamService.isExamAlreadyExists(userExam)) {
                throw new ExamAlreadyExistsException("Exam already exists in your schedule.");
            }

            userExamService.addExamToUser(userExam);
            return ResponseEntity.ok("Exam added successfully");
        }
        catch(ExamAlreadyExistsException e){
            return ResponseEntity.status(409).body("Exam already exists in your schedule.");
        }

        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Remove exam from user's schedule
    @DeleteMapping
    public ResponseEntity<String> removeExamFromUser(@RequestBody UserExam userExam,
                                                     HttpServletRequest request) {
        try {
            String authenticatedGoogleId = (String) request.getAttribute("authenticatedGoogleId");

            // user can only remove exams from their own schedule
            if (authenticatedGoogleId == null || !authenticatedGoogleId.equals(userExam.getGoogleId())) {
                return ResponseEntity.status(403).body(null); // Forbidden
            }

            userExamService.removeExamFromUser(userExam);
            return ResponseEntity.ok("Exam removed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}