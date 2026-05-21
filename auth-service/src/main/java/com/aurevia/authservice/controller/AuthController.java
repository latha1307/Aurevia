package com.aurevia.authservice.controller;

import com.aurevia.authservice.dto.AuthResponse;
import com.aurevia.authservice.dto.LoginRequest;
import com.aurevia.authservice.dto.RegisterRequest;
import com.aurevia.authservice.entity.User;
import com.aurevia.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}