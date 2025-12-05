package com.sidelbackend.Service;

import com.sidelbackend.Entity.GadgetEntity;
import com.sidelbackend.Repositories.GadgetRepositories;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GadgetService {

    private final GadgetRepositories gadgetRepository;

    public GadgetService(GadgetRepositories gadgetRepository) {
        this.gadgetRepository = gadgetRepository;
    }

    public List<GadgetEntity> getAllGadgets() {
        return gadgetRepository.findAll();
    }

    public GadgetEntity getGadgetById(Long id) {
        return gadgetRepository.findById(id).orElse(null);
    }

    public GadgetEntity createGadget(GadgetEntity gadget) {
        return gadgetRepository.save(gadget);
    }

    public GadgetEntity updateGadget(Long id, GadgetEntity newData) {
        GadgetEntity g = getGadgetById(id);
        if (g == null) return null;

        g.setGadgetType(newData.getGadgetType());
        g.setBrand(newData.getBrand());
        g.setModel(newData.getModel());
        g.setIssueDescription(newData.getIssueDescription());
        g.setDateReported(newData.getDateReported());

        return gadgetRepository.save(g);
    }

    public void delete(Long id) {
        gadgetRepository.deleteById(id);
    }
}
