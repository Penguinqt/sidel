package com.sidelbackend.Repositories;

import com.sidelbackend.Entity.TechnicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnicianRepositories extends JpaRepository <TechnicianEntity, Long> {
    Optional<TechnicianEntity> findByEmail(String email);
}
