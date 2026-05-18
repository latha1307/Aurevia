package com.aurevia.authservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    
    @GetMapping("/api/auth/test")
    public String test() {
        return "Auth Service is working!";
    }
}
