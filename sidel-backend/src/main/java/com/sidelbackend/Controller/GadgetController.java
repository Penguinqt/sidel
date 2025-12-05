package com.sidelbackend.Controller;



import com.sidelbackend.Entity.GadgetEntity;
import com.sidelbackend.Service.GadgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gadgets")
public class GadgetController {

    @Autowired
    private GadgetService gadgetService;

    @PostMapping
    public ResponseEntity<GadgetEntity> create(@RequestBody GadgetEntity gadget) {
        return ResponseEntity.ok(gadgetService.createGadget(gadget));
    }

    @GetMapping
    public ResponseEntity<List<GadgetEntity>> getAll() {
        return ResponseEntity.ok(gadgetService.getAllGadgets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GadgetEntity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(gadgetService.getGadgetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GadgetEntity> update(@PathVariable Long id, @RequestBody GadgetEntity gadget) {
        return ResponseEntity.ok(gadgetService.updateGadget(id, gadget));
    }
}
