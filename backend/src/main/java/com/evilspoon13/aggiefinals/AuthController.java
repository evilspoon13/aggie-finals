package com.evilspoon13.aggiefinals;

import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/google-login")
    public ResponseEntity<?> authenticateUser(@RequestBody GoogleTokenRequest tokenRequest) {
        // verify the Google token with google's API
        GoogleIdToken idToken = verifier.verify(tokenRequest.getToken());

        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            // get user information from the token
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // find or create the user
            User user = userRepository.findByGoogleId(googleId)
                    .orElse(new User());

            // update user information
            user.setGoogleId(googleId);
            user.setEmail(email);
            user.setName(name);
            user.setLastLogin(ZonedDateTime.now());

            if (user.getCreatedAt() == null) {
                user.setCreatedAt(ZonedDateTime.now());
            }

            userRepository = userRepository.save(user);

            // generate JWT token
            String token = generateToken(user);

            return ResponseEntity.ok(new AuthResponse(token, user));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
}