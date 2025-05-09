package com.evilspoon13.aggiefinals;

import com.evilspoon13.aggiefinals.Model.FinalExam;
import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{userId}/exams")
    public ResponseEntity<List<FinalExam>> getUserExams(@PathVariable Long userId) {
        try {
            List<FinalExam> exams = userService.getUserExams(userId);
            return new ResponseEntity<>(exams, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{userId}/exams/{examId}")
    public ResponseEntity<Void> addExamToUserSchedule(@PathVariable Long userId, @PathVariable Long examId) {
        try{
            userService.addExamToUserSchedule(userId, examId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}/exams/{examId}")
    public ResponseEntity<Void> removeExamFromUserSchedule(@PathVariable Long userId, @PathVariable Long examId) {
        try{
            userService.removeExamFromUserSchedule(userId, examId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}