package com.aurevia.productservice.filter;

import com.aurevia.productservice.jwt.JwtService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AdminAuthorizationFilter implements Filter {

    private final JwtService jwtService;

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {

        HttpServletRequest req =
                (HttpServletRequest) request;

        HttpServletResponse res =
                (HttpServletResponse) response;

        String path = req.getRequestURI();

        // Allow GET requests
        if (req.getMethod().equals("GET")) {
            chain.doFilter(request, response);
            return;
        }

        // Protect POST PUT DELETE
        if (
                path.startsWith("/api/products")
        ) {

            String authHeader =
                    req.getHeader("Authorization");

            if (
                    authHeader == null ||
                    !authHeader.startsWith("Bearer ")
            ) {
                res.setStatus(401);
                res.getWriter().write("Missing token");
                return;
            }

            String token =
                    authHeader.substring(7);

            String role =
                    jwtService.extractRole(token);

            if (!"ADMIN".equals(role)) {
                res.setStatus(403);
                res.getWriter().write("Access denied");
                return;
            }
        }

        chain.doFilter(request, response);
    }
}