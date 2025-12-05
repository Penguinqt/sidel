package com.sidelbackend.Service;

import com.sidelbackend.Entity.BookingEntity;
import com.sidelbackend.Repositories.BookingRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepositories bookingRepository;

    public BookingService(BookingRepositories bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<BookingEntity> getAllBookings() {
        return bookingRepository.findAll();
    }

    public BookingEntity getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    public BookingEntity createBooking(BookingEntity booking) {
        return bookingRepository.save(booking);
    }

    public BookingEntity updateBooking(Long id, BookingEntity newData) {
        BookingEntity b = getBookingById(id);
        if (b == null) return null;

        b.setBookingDate(newData.getBookingDate());
        b.setServiceDate(newData.getServiceDate());
        b.setStatus(newData.getStatus());
        b.setTechnician(newData.getTechnician());
        b.setUser(newData.getUser());
        b.setGadget(newData.getGadget());

        return bookingRepository.save(b);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}