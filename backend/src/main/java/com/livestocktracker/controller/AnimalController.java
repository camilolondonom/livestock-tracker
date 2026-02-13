package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Animal;
import com.livestocktracker.repository.AnimalRepository;

@RestController
@RequestMapping("/api/animales")
@CrossOrigin(origins = "http://localhost:5173")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Animal animal) { // Cambiamos <Animal> por <?>
        try {
            // 1. Validar si la chapeta ya existe
            if (animalRepository.findByChapeta(animal.getChapeta()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(java.util.Map.of("error", "El animal con la chapeta " + animal.getChapeta() + " ya está registrado."));
            }
            
            // 2. Guardar el animal
            Animal nuevo = animalRepository.save(animal);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(java.util.Map.of("error", "Error interno: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (animalRepository.existsById(id)) {
            animalRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}