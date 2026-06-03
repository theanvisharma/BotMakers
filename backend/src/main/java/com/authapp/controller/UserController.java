package com.authapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User API", description = "Endpoints accessible by USER or ADMIN")
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    @GetMapping("/dashboard")
    @Operation(summary = "Get user dashboard data")
    public ResponseEntity<Map<String, Object>> getUserDashboard(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to the User Dashboard");
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());
        return ResponseEntity.ok(response);
    }
}
