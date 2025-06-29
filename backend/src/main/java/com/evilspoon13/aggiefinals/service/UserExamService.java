package com.evilspoon13.aggiefinals.service;

import com.evilspoon13.aggiefinals.dto.ExamWithClassNameDTO;
import com.evilspoon13.aggiefinals.model.FinalExam;
import com.evilspoon13.aggiefinals.model.UserExam;
import com.evilspoon13.aggiefinals.repository.FinalExamRepository;
import com.evilspoon13.aggiefinals.repository.UserExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserExamService {

    @Autowired
    private UserExamRepository userExamRepo;

    @Autowired
    private FinalExamRepository finalExamRepo;


    public boolean isExamAlreadyExists(UserExam userExam) {
        Set<UserExam> userExams = userExamRepo.findByGoogleId(userExam.getGoogleId());
        return userExams.stream().anyMatch(exam -> exam.getExamId().equals(userExam.getExamId()));
    }

    // get user's final exams
    public Set<ExamWithClassNameDTO> getUserExamsWithClassName(String googleId) {
        Set<UserExam> userExams = userExamRepo.findByGoogleId(googleId);

        return userExams.stream().map(userExam -> {
            FinalExam finalExam = finalExamRepo.findById(userExam.getExamId())
                    .orElseThrow(() -> new RuntimeException("Exam not found"));

            return new ExamWithClassNameDTO(
                    finalExam.getExamId(),
                    finalExam.getTermId(),
                    finalExam.getDayPattern(),
                    finalExam.getDate(),
                    finalExam.getExamTime(),
                    finalExam.getClassBeginTime(),
                    finalExam.getClassEndTime(),
                    userExam.getClassName() // added this!
            );
        }).collect(Collectors.toSet());
    }

    // add exam to user's schedule
    public void addExamToUser(UserExam userExam) {
        Set<UserExam> userExams = userExamRepo.findByGoogleId(userExam.getGoogleId());

        if(userExams.stream().anyMatch(exam -> exam.getExamId().equals(userExam.getExamId()))) {
            throw new RuntimeException("Exam already exists in user's schedule");
        }

        userExamRepo.save(userExam);
    }

    // remove exam from user's schedule
    public void removeExamFromUser(UserExam userExam) {
        Optional<UserExam> userExamOptional = userExamRepo.findByExamIdAndGoogleId(userExam.getExamId(), userExam.getGoogleId());

        if (userExamOptional.isEmpty()) {
            throw new RuntimeException("Exam not found in user's schedule");
        }

        userExamRepo.delete(userExamOptional.get());
    }
}