package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

// Botón de eliminar animal
// Botón de eliminar animal
@DeleteMapping("/{id}")
public ResponseEntity<Void> eliminarAnimal(@PathVariable Integer id) {
    // 1. Verificación básica
    if (id == null) {
        return ResponseEntity.badRequest().build();
    }
    
    // 2. Comprobamos si existe antes de borrar
    if (animalRepository.existsById(id)) {
        animalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    } else {
        // 3. Si no existe, avisamos
        return ResponseEntity.notFound().build();
    }
}
}
