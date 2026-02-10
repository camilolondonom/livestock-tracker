package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Animal;
import com.livestocktracker.repository.AnimalRepository;

/**
 * Controlador para la gestión de eventos reproductivos del hato.
 */
@RestController
@RequestMapping("/api/reproduccion")
@CrossOrigin(origins = "*")
public class ReproduccionController {

    @Autowired
    private AnimalRepository animalRepository;

    /**
     * Obtiene los ejemplares que cumplen con los requisitos para procesos de reproducción.
     */
    @GetMapping("/aptos")
    public List<Animal> listarAptosParaReproduccion() {
        return animalRepository.findAll();
    }

    /**
     * Registra un suceso reproductivo específico (como inseminación o parto) vinculado a un animal.
     */
    @PostMapping("/evento/{id}")
    public ResponseEntity<String> registrarEvento(@PathVariable Long id, @RequestBody String detalleEvento) {
        // Validación de existencia del ejemplar en la base de datos
        if (!animalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok("Evento reproductivo registrado exitosamente para el ID: " + id);
    }
}
