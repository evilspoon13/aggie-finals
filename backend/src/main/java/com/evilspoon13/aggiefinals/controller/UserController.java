package com.evilspoon13.aggiefinals.Controller;

import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/auth")
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserAuthRequest request) {
        try {

            if (request.getGoogleId() == null || request.getGoogleId().trim().isEmpty()) {
                logger.warn("Authentication failed: Google ID is null or empty");
                return ResponseEntity.badRequest().body("Google ID is required");
            }

            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                logger.warn("Authentication failed: Email is null or empty");
                return ResponseEntity.badRequest().body("Email is required");
            }

            logger.info("Creating/updating user with Google ID: {}", request.getGoogleId());

            User user = userService.createOrUpdateUser(
                    request.getGoogleId(),
                    request.getEmail(),
                    request.getName()
            );

            logger.info("Successfully created/updated user: {}", user.getGoogleId());
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            logger.error("Error creating/updating user with Google ID: {}", request.getGoogleId(), e);
            return ResponseEntity.badRequest().body("Authentication failed: " + e.getMessage());
        }
    }

    // DTO for user authentication
    public static class UserAuthRequest {
        private String googleId;
        private String email;
        private String name;

        public UserAuthRequest() {}

        public UserAuthRequest(String googleId, String email, String name) {
            this.googleId = googleId;
            this.email = email;
            this.name = name;
        }

        // Getters and setters
        public String getGoogleId() { return googleId; }
        public void setGoogleId(String googleId) { this.googleId = googleId; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        @Override
        public String toString() {
            return "UserAuthRequest{" +
                    "googleId='" + googleId + '\'' +
                    ", email='" + email + '\'' +
                    ", name='" + name + '\'' +
                    '}';
        }
    }
}