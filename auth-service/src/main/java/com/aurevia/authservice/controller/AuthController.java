package com.aurevia.authservice.controller;

import com.aurevia.authservice.entity.User;
import com.aurevia.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/create")
public User createUser() {

    User user = new User();

    user.setName("Latha");
    user.setEmail("ldkannammal@gmail.com");
    user.setPassword("123456");
    user.setRole("USER");

    return userRepository.save(user);
}
}