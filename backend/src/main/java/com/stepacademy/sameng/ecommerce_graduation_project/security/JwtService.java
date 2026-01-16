package com.stepacademy.sameng.ecommerce_graduation_project.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "your-256-bit-secret";
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    private Key key() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    }

    public String generateToken(String subject) {
        long now = System.currentTimeMillis();
        return io.jsonwebtoken.Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new java.util.Date(now))
                .setExpiration(new java.util.Date(now + EXPIRATION_TIME))
                .signWith(key())
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parser()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token);
    }

    public long getUserId(String token) {
        Claims claims = parse(token).getBody();
        return Long.parseLong(claims.getSubject());
    }

    public String getRole(String token) {
        Claims claims = parse(token).getBody();
        return claims.get("role", String.class);
    }

}
