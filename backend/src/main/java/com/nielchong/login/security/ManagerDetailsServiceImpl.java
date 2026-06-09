package com.nielchong.login.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nielchong.login.entities.Manager;
import com.nielchong.login.repositories.ManagerRepo;

@Service
@Qualifier("managerDetailsService")
public class ManagerDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ManagerRepo managerRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<Manager> managerOptional = managerRepo.findByUsername(username);

		Manager manager = managerOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));

		return new ManagerPrincipal(manager);
	}
}