package com.nielchong.login.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nielchong.login.entities.Manager;
import com.nielchong.login.repositories.ManagerRepo;

@Service
public class ManagerService {
    
    @Autowired
	private ManagerRepo managerRepo;
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public boolean registerManager(Manager manager) {

		Optional<Manager> managerOptional = managerRepo.findByUsername(manager.getUsername());

		if (managerOptional.isPresent()) {
			return false;
		} else {
			manager.setPassword(encoder.encode(manager.getPassword()));
			managerRepo.save(manager);
			return true;
		}
	}

    public Manager getExistingManagerInfo(String username) {
		Optional<Manager> managerOptional = managerRepo.findByUsername(username);
        return managerOptional.orElse(null);
	}
}