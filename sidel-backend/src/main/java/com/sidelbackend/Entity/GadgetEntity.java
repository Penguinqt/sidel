package com.sidelbackend.Entity;


import jakarta.persistence.*;
import com.sidelbackend.Entity.UserEntity;
import com.sidelbackend.Entity.BookingEntity;

import java.time.LocalDate;

@Entity
@Table(name = "gadget")
public class GadgetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gadgetId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String gadgetType;
    private String brand;
    private String model;
    private String issueDescription;
    private LocalDate dateReported;

    @OneToMany(mappedBy = "gadget")
    private java.util.List<BookingEntity> bookings;

    // GETTERS & SETTERS
    public Long getGadgetId() {
        return gadgetId;
    }

    public void setGadgetId(Long gadgetId) {
        this.gadgetId = gadgetId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getGadgetType() {
        return gadgetType;
    }

    public void setGadgetType(String gadgetType) {
        this.gadgetType = gadgetType;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public LocalDate getDateReported() {
        return dateReported;
    }

    public void setDateReported(LocalDate dateReported) {
        this.dateReported = dateReported;
    }

    public java.util.List<BookingEntity> getBookings() {
        return bookings;
    }

    public void setBookings(java.util.List<BookingEntity> bookings) {
        this.bookings = bookings;
    }

}
