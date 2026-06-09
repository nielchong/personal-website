package com.nielchong.login.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "manager")
public class Manager {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "manager_id")
	
	private int managerID;

    private String name;
    private String username;
    private String password;


	public Manager(String name, String username, String password) {
		super();
		this.name = name;
		this.username = username;
		this.password = password;
	}

    public Manager(String name, String username) {
		super();
		this.name = name;
		this.username = username;
	}
	
	public Manager() {
		
	}

    public int getManagerID() {
        return this.managerID;
    }

    public void setManagerID(int managerID) {
        this.managerID = managerID;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
