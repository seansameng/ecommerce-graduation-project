package com.stepacademy.sameng.ecommerce_graduation_project.services;

import com.stepacademy.sameng.ecommerce_graduation_project.dto.LoginRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.dto.RegisterRequest;
import com.stepacademy.sameng.ecommerce_graduation_project.models.Role;
import com.stepacademy.sameng.ecommerce_graduation_project.models.User;
import com.stepacademy.sameng.ecommerce_graduation_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.Builder;

@Service
@RequiredArgsConstructor
@Builder
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(User.Role.CUSTOMER)
                .enabled(true)
                .build();

        userRepository.save(user);

    }

    @Override
    public void login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
