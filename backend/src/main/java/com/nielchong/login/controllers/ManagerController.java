package com.nielchong.login.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.nielchong.login.entities.Manager;
import com.nielchong.login.entities.ManagerDTO;
import com.nielchong.login.services.ManagerService;

@Controller
@CrossOrigin(value = "localhost:3000",allowedHeaders = "*", allowCredentials = "true")
public class ManagerController {
    
    @Autowired
	private ManagerService managerService;

    @PostMapping("/manager/register")
    public ResponseEntity<String> registerManager(@RequestBody Manager manager) {
        try {
            managerService.registerManager(manager);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }

    @GetMapping("/manager/info")
    public ResponseEntity<ManagerDTO> getManager() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();

            List<String> roles = authentication.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .map(role -> role.replace("ROLE_", ""))
            .map(this::transformRole)
            .collect(Collectors.toList());
    
            Manager manager = managerService.getExistingManagerInfo(username);

            ManagerDTO managerDTO = new ManagerDTO(manager.getName(),manager.getUsername(),roles);
            return ResponseEntity.ok(managerDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    private String transformRole(String role) {
        if (role != null && !role.isEmpty()) {
            return Character.toUpperCase(role.charAt(0)) + role.substring(1).toLowerCase();
        }
        return role;
    }
}