package com.evilspoon13.aggiefinals.config;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(1) // runs before other controllers
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getRequestURI();

        //skip auth at user creation endpoint
        if(requestPath.equals("/api/users/auth") || requestPath.startsWith("/api/final-exams") || requestPath.startsWith("/api/subjects")) {
            filterChain.doFilter(request, response);
            return;
        }


        String token = extractToken(request);

        if(token != null && jwtUtil.isTokenValid(token)){

            // tokens valid - extract google ID
            String googleId = jwtUtil.extractGoogleId(token);
            request.setAttribute("authenticatedGoogleId", googleId);

            filterChain.doFilter(request, response);
        }
        else{
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or missing JWT token");
        }
    }

    private String extractToken(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer ")){
            return header.substring(7); // remove "Bearer " prefix
        }
        return null;
    }
}
