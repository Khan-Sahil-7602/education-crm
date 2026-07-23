package com.edutrack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edutrack.dto.LoginRequest;
import com.edutrack.dto.LoginResponse;
import com.edutrack.dto.RegisterRequest;
import com.edutrack.service.AuthService;
import com.edutrack.service.BlacklistTokenService;
import com.edutrack.util.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final BlacklistTokenService blacklistTokenService;

    public AuthController(AuthService authService, BlacklistTokenService blacklistTokenService) {
        this.authService = authService;
        this.blacklistTokenService = blacklistTokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, message, null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Login successful", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>(false, "No token provided", null));
        }

        String token = authHeader.substring(7);

        blacklistTokenService.blackListToken(token);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Logged out successfully", null));
    }
}
