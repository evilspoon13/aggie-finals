package com.evilspoon13.aggiefinals.Service;

import com.evilspoon13.aggiefinals.Model.User;
import com.evilspoon13.aggiefinals.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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
