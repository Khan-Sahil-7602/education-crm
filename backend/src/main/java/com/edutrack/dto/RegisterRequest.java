package com.edutrack.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RegisterRequest {

    @NotBlank(message = "Name shouldn't be empty")
    @Pattern(regexp = "^[A-Za-z]+(?:[ '-][A-Za-z]+)*$", message = "")
    private String name;

    @NotBlank(message = "Email shouldn't be empty")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Password shouldn't be empty")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$", message = "Password must contain at least one(lowercase, uppercase, digit, special character(@$!%*?&#)), total 8 characters(minimum)")
    private String password;

    @NotBlank(message = "Phone Number shouldn't be empty")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid number")
    private String phone;

    private String role;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
