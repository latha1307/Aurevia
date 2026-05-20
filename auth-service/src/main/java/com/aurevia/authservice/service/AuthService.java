package com.aurevia.authservice.service;

import com.aurevia.authservice.dto.RegisterRequest;
import com.aurevia.authservice.entity.User;
import com.aurevia.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
        passwordEncoder.encode(request.getPassword())
        );
        user.setRole("USER");

        return userRepository.save(user);
    }
}