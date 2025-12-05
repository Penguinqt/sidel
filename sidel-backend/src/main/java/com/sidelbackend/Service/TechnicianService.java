package com.sidelbackend.Service;


import com.sidelbackend.Entity.TechnicianEntity;
import com.sidelbackend.Repositories.TechnicianRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicianService {

    private final TechnicianRepositories technicianRepository;

    public TechnicianService(TechnicianRepositories technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    public List<TechnicianEntity> getAll() {
        return technicianRepository.findAll();
    }

    public TechnicianEntity getById(Long id) {
        return technicianRepository.findById(id).orElse(null);
    }

    public TechnicianEntity create(TechnicianEntity tech) {
        return technicianRepository.save(tech);
    }

    public TechnicianEntity update(Long id, TechnicianEntity newData) {
        TechnicianEntity t = getById(id);
        if (t == null) return null;

        t.setName(newData.getName());
        t.setEmail(newData.getEmail());
        t.setPassword(newData.getPassword());
        t.setPhoneNumber(newData.getPhoneNumber());
        t.setAddress(newData.getAddress());
        t.setSpecialization(newData.getSpecialization());
        t.setStoreLocation(newData.getStoreLocation());
        t.setAvailabilityStatus(newData.getAvailabilityStatus());
        t.setRating(newData.getRating());

        return technicianRepository.save(t);
    }

    public void delete(Long id) {
        technicianRepository.deleteById(id);
    }
}
