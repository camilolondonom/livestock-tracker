package com.livestocktracker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.livestocktracker.model.Animal;
import com.livestocktracker.repository.AnimalRepository;

@RestController
@RequestMapping("/api/reproduccion")
@CrossOrigin(origins = "*")
public class ReproduccionController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping("/aptos")
    public List<Animal> listarAptosParaReproduccion() {
        return animalRepository.findAll();
    }

    @PostMapping("/evento/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<String> registrarEvento(@PathVariable Long id, @RequestBody String detalleEvento) {
        if (!animalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Evento reproductivo registrado para el ID: " + id);
    }
}