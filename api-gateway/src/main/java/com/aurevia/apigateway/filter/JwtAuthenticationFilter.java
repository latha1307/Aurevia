package com.aurevia.apigateway.filter;

import com.aurevia.apigateway.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class JwtAuthenticationFilter {

    private final JwtService jwtService;

}