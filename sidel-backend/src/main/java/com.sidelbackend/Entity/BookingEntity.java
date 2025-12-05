package com.sidelbackend.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking")

public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private TechnicianEntity technician;

    @ManyToOne
    @JoinColumn(name = "gadget_id")
    private GadgetEntity gadget;

    private LocalDate bookingDate;
    private LocalDate serviceDate;

    @Enumerated(EnumType.STRING)
    private Booking status;

    // Getters and Setters for BookingEntity

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public TechnicianEntity getTechnician() {
        return technician;
    }

    public void setTechnician(TechnicianEntity technician) {
        this.technician = technician;
    }

    public GadgetEntity getGadget() {
        return gadget;
    }

    public void setGadget(GadgetEntity gadget) {
        this.gadget = gadget;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public Booking getStatus() {
        return status;
    }

    public void setStatus(Booking status) {
        this.status = status;
    }
}


