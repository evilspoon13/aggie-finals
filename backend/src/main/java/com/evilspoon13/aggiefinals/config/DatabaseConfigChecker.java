package com.evilspoon13.aggiefinals.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfigChecker {

    @Value("${DB_HOST:NOT_SET}")
    private String dbHost;

    @Value("${DB_NAME:NOT_SET}")
    private String dbName;

    @Value("${DB_USER:NOT_SET}")
    private String dbUser;

    @PostConstruct
    public void checkConfig() {
        System.out.println("=== DATABASE CONFIG DEBUG ===");
        System.out.println("DB_HOST: " + dbHost);
        System.out.println("DB_NAME: " + dbName);
        System.out.println("DB_USER: " + dbUser);
        System.out.println("Full URL: jdbc:postgresql://" + dbHost + ":5432/" + dbName);
        System.out.println("============================");
    }
}