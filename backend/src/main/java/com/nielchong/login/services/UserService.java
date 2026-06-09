package com.nielchong.login.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nielchong.login.entities.User;
import com.nielchong.login.repositories.UserRepo;

@Service
public class UserService {
    
    @Autowired
	private UserRepo userRepo;
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public boolean registerUser(User user) {

		Optional<User> userOptional = userRepo.findByUsername(user.getUsername());

		if (userOptional.isPresent()) {
			return false;
		} else {
			user.setPassword(encoder.encode(user.getPassword()));
			userRepo.save(user);
			return true;
		}
	}

    public User getExistingUserInfo(String username) {
		Optional<User> userOptional = userRepo.findByUsername(username);
        return userOptional.orElse(null);
	}
}
