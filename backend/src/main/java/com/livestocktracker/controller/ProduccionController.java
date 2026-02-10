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
 * Controlador encargado de la analítica y registros de rendimiento productivo.
 */
@RestController
@RequestMapping("/api/produccion")
@CrossOrigin(origins = "*")
public class ProduccionController {

    @Autowired
    private AnimalRepository animalRepository;

    /**
     * Recupera el listado de animales con indicadores de rendimiento destacados.
     */
    @GetMapping("/destacados")
    public List<Animal> obtenerProductividadAlta() {
        return animalRepository.findAll(); 
    }
}