package com.nielchong.login.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.nielchong.login.entities.User;
import com.nielchong.login.entities.UserDTO;
import com.nielchong.login.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin(value = "localhost:3000",allowedHeaders = "*", allowCredentials = "true")
public class UserController {
    
    @Autowired
	private UserService userService;

    @PostMapping("/user/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/user/info")
    public ResponseEntity<UserDTO> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();

            List<String> roles = authentication.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .map(this::transformRole)
            .collect(Collectors.toList());
    
            User user = userService.getExistingUserInfo(username);

            UserDTO userDTO = new UserDTO(user.getName(),user.getUsername(),roles);
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/user/session")
    public ResponseEntity<?> getSession(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken)) {
            return ResponseEntity.ok(authentication);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
    }

    private String transformRole(String role) {
        if (role != null && !role.isEmpty()) {
            return Character.toUpperCase(role.charAt(0)) + role.substring(1).toLowerCase();
        }
        return role;
    }
}