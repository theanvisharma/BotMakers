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
@RequestMapping("/api/admin")
@Tag(name = "Admin API", description = "Endpoints accessible by ADMIN only")
@SecurityRequirement(name = "Bearer Authentication")
public class AdminController {

    @GetMapping("/dashboard")
    @Operation(summary = "Get admin dashboard data")
    public ResponseEntity<Map<String, Object>> getAdminDashboard(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to the Admin Dashboard");
        response.put("admin", authentication.getName());
        response.put("status", "System is running optimally");
        return ResponseEntity.ok(response);
    }
}
