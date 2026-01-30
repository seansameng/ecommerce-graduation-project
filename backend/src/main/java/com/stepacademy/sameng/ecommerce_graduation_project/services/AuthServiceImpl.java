package com.stepacademy.sameng.ecommerce_graduation_project.services;

import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.RegisterRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.LoginRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dtos.auth.AuthResponse;
import com.stepacademy.sameng.ecommerce_graduation_project.exceptions.ApiException;
import com.stepacademy.sameng.ecommerce_graduation_project.exceptions.EmailAlreadyExistsException;
import com.stepacademy.sameng.ecommerce_graduation_project.exceptions.InvalidCredentialsException;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Role;
import com.stepacademy.sameng.ecommerce_graduation_project.models.User;
import com.stepacademy.sameng.ecommerce_graduation_project.models.UserStatus;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.UserRepository;
import com.stepacademy.sameng.ecommerce_graduation_project.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.Builder;

@Service
@RequiredArgsConstructor
@Builder
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException();
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .build();

        userRepository.save(user);

    }

    @Override
    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null) {
            log.warn("Login attempt with null email");
        } else {
            log.info("Login attempt for email={}", request.getEmail());
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Login failed: user not found for email={}", request.getEmail());
                    return new InvalidCredentialsException();
                });

        if (!request.getPassword().equals(user.getPassword())) {
            log.warn("Login failed: password mismatch for email={}", request.getEmail());
            throw new InvalidCredentialsException();
        }

        if (user.getStatus() == UserStatus.BLOCKED) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Account is disabled");
        }

        String role = user.getRole().name();
        String token = jwtService.generateToken(user.getId(), role);
        return new AuthResponse(token, role);
    }

}
