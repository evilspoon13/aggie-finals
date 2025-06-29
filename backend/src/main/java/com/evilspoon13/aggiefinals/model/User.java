package com.evilspoon13.aggiefinals.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "google_id", nullable = false)
    private String googleId;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "last_login")
    private ZonedDateTime lastLogin;

    public User(){

    }

    // Getters and setters
    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(ZonedDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }
}