package com.evilspoon13.aggiefinals.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {
    @Value("${nextauth.secret}")
    private String nextAuthSecret;

    //extract google ID
    public String extractGoogleId(String token){
        Claims claims = extractAllClaims(token);

        // (sub is where nextauth stores the googleid)
        return claims.get("sub", String.class);
    }

    public boolean isTokenValid(String token){
        try{
            extractAllClaims(token);
            return true;
        }
        catch (Exception e){
            System.out.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }

    // extract all claims from jwt token
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSigningKey(){
        byte[] keyBytes = nextAuthSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }



}
