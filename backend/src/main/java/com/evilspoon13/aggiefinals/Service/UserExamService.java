package com.evilspoon13.aggiefinals.Service;

import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Repository.UserRepository;
import com.evilspoon13.aggiefinals.Repository.FinalExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Set;

@Service
@Transactional
public class UserExamService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FinalExamRepository finalExamRepository;

    // get user's final exams
    public Set<FinalExam> getUserExams(String googleId) {
        User user = userRepository.findByGoogleId(googleId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getFinalExams();
    }

    // add exam to user's schedule
    public void addExamToUser(String googleId, Long examId) {
        User user = userRepository.findByGoogleId(googleId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FinalExam exam = finalExamRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found "));

        if(!user.getFinalExams().contains(exam)){
            user.getFinalExams().add(exam);
            userRepository.save(user);
        }
    }

    // remove exam from user's schedule
    public void removeExamFromUser(String googleId, Long examId) {
        User user = userRepository.findByGoogleId(googleId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getFinalExams().removeIf(exam -> exam.getExamId().equals(examId));
        userRepository.save(user);
    }

    // create or update user (for NextAuth integration)
    public User createOrUpdateUser(String googleId, String email, String name) {
        User user = userRepository.findByGoogleId(googleId)
                .orElse(new User());

        user.setGoogleId(googleId);
        user.setEmail(email);
        user.setName(name);

        if (user.getCreatedAt() == null) {
            user.setCreatedAt(ZonedDateTime.now());
        }
        user.setLastLogin(ZonedDateTime.now());

        return userRepository.save(user);
    }
}