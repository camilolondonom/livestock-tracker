package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Animal;
import com.livestocktracker.model.Reproduccion;
import com.livestocktracker.repository.AnimalRepository;
import com.livestocktracker.repository.ReproduccionRepository;

@RestController
@RequestMapping("/api/reproduccion")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings("null")
public class ReproduccionController {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private ReproduccionRepository reproduccionRepository;

    // Para llenar el select de vacas
    @GetMapping("/aptos")
    public List<Animal> listarAptosParaReproduccion() {
        return animalRepository.findAll();
    }

    // Para llenar la tabla de historial
    @GetMapping("/historial")
    public List<Reproduccion> listarHistorial() {
        return reproduccionRepository.findAll();
    }

    // Para guardar el evento desde el formulario
    @PostMapping("/evento")
    public ResponseEntity<?> registrarEvento(@RequestBody Reproduccion evento) {
        try {
            Reproduccion nuevo = reproduccionRepository.save(evento);
            return ResponseEntity.ok(nuevo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al registrar evento: " + e.getMessage());
        }
    }
}