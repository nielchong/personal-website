package com.nielchong.login.entities;

import java.util.List;

public class ManagerDTO {
	
    private String name;
    private String username;
    private List<String> roles;
     
    public ManagerDTO(String name, String username, List<String> roles) {
        this.name = name;
        this.username = username;
        this.roles = roles;
    }

    public ManagerDTO() {
        
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public List<String> getRoles() {
        return roles;
    }
    public void setRoles(List<String> roles) {
        this.roles = roles;
    }	
}
