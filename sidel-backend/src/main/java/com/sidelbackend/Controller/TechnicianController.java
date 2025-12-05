package com.sidelbackend.Controller;

import com.sidelbackend.Entity.TechnicianEntity;
import com.sidelbackend.Repositories.TechnicianRepositories;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
@CrossOrigin
public class TechnicianController {

    private final TechnicianRepositories technicianRepository;

    public TechnicianController(TechnicianRepositories technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    @GetMapping
    public List<TechnicianEntity> getAll() {
        return technicianRepository.findAll();
    }

    @PostMapping
    public TechnicianEntity addTechnician(@RequestBody TechnicianEntity tech) {
        return technicianRepository.save(tech);
    }

    @GetMapping("/{id}")
    public TechnicianEntity getById(@PathVariable Long id) {
        return technicianRepository.findById(id).orElse(null);
    }
}
