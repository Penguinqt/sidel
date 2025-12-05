package com.sidelbackend.Repositories;

import com.sidelbackend.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepositories extends JpaRepository<ReviewEntity, Long> {
}
