package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Animal;
import com.livestocktracker.repository.AnimalRepository;

/**
 * Controlador REST para el módulo de producción.
 * Gestiona los datos relacionados con el rendimiento productivo de los ejemplares.
 */
@RestController
@RequestMapping("/api/produccion")
@CrossOrigin(origins = "*")
public class ProduccionController {

    @Autowired
    private AnimalRepository animalRepository;

    /**
     * Endpoint de ejemplo para obtener animales de alta productividad (ej. > 400kg).
     */
    @GetMapping("/destacados")
    public List<Animal> obtenerProductividadAlta() {
        // En una implementación real, aquí se filtraría por registros de producción
        return animalRepository.findAll(); 
    }
}