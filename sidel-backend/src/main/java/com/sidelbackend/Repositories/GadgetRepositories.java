package com.sidelbackend.Repositories;

import com.sidelbackend.Entity.GadgetEntity;
import com.sidelbackend.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GadgetRepositories extends JpaRepository<GadgetEntity, Long> {

    Optional<GadgetEntity> findByUser(UserEntity user);
}
