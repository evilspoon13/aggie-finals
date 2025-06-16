package com.evilspoon13.aggiefinals.Controller;

import com.evilspoon13.aggiefinals.DTO.ExamRequest;
import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Service.FinalExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/final-exams")
public class FinalExamController {

    @Autowired
    private FinalExamService finalExamService;

    @GetMapping("/all")
    public ResponseEntity<List<FinalExam>> getAllExams(@RequestParam String termId) {
        try {
            List<FinalExam> exams = finalExamService.getAllExamsByTermId(termId);
            return ResponseEntity.ok(exams);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/search")
    public ResponseEntity<FinalExam> searchExam(@RequestBody ExamRequest examRequest) {
        try {
            Optional<FinalExam> examOptional = finalExamService.searchExam(examRequest);

            return examOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
