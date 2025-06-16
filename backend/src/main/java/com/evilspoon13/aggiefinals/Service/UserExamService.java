package com.evilspoon13.aggiefinals.Service;

import com.evilspoon13.aggiefinals.DTO.ExamWithClassNameDTO;
import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.UserExam;
import com.evilspoon13.aggiefinals.Repository.FinalExamRepository;
import com.evilspoon13.aggiefinals.Repository.UserExamRepository;
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

    // get user's final exams
    public Set<ExamWithClassNameDTO> getUserExamsWithClassName(String googleId) {
        Set<UserExam> userExams = userExamRepo.findByUserId(googleId);

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
        Set<UserExam> userExams = userExamRepo.findByUserId(userExam.getUserId());

        if(userExams.stream().anyMatch(exam -> exam.getExamId().equals(userExam.getExamId()))) {
            throw new RuntimeException("Exam already exists in user's schedule");
        }

        userExamRepo.save(userExam);
    }

    // remove exam from user's schedule
    public void removeExamFromUser(UserExam userExam) {
        Optional<UserExam> userExamOptional = userExamRepo.findByExamIdAndUserId(userExam.getExamId(), userExam.getUserId());

        if (userExamOptional.isEmpty()) {
            throw new RuntimeException("Exam not found in user's schedule");
        }

        userExamRepo.delete(userExamOptional.get());
    }
}