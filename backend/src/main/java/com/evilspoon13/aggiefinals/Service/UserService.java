package com.evilspoon13.aggiefinals.Service;


import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Repo.FinalExamRepository;
import com.evilspoon13.aggiefinals.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final FinalExamRepository examRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo, FinalExamRepository examRepo, PasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.examRepo = examRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        // check if username or email already exists
        if(userRepo.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already taken");
        }
        if(userRepo.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already in use");
        }

        // encode password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));

        return userRepo.save(user);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepo.findById(userId);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Transactional
    public void addExamToUserSchedule(Long userId, Long examId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FinalExam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        user.getFinalExams().add(exam);
        userRepo.save(user);
    }

    @Transactional
    public void removeExamFromUserSchedule(Long userId, Long examId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.getFinalExams().removeIf(exam -> exam.getId().equals(examId));
        userRepo.save(user);
    }

    @Transactional
    public List<FinalExam> getUserExams(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getFinalExams();
    }
}
