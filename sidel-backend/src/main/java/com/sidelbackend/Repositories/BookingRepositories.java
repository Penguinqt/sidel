package com.sidelbackend.Repositories;

import com.sidelbackend.Entity.Booking;
import com.sidelbackend.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepositories extends JpaRepository<BookingEntity, Long> {
}
