package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Animal;
import com.livestocktracker.repository.AnimalRepository;

@RestController
@RequestMapping("/api/animales")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    // Obtener todos los animales
    @GetMapping
    public List<Animal> listarAnimales() {
        return animalRepository.findAll();
    }

    // Registrar un nuevo animal
    @PostMapping
public Animal guardarAnimal(@RequestBody Animal animal) {
    if (animal == null) {
        throw new IllegalArgumentException("El objeto animal no puede ser nulo");
    }
    return animalRepository.save(animal);
}
}
