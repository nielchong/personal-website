package com.nielchong.login.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nielchong.login.entities.Manager;

@Repository
public interface ManagerRepo extends JpaRepository<Manager, Long> {

	Optional<Manager> findByUsername(String username);

}