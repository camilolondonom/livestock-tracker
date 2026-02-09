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

/**
 * Controlador REST para la gestión de inventario bovino.
 * Provee los servicios necesarios para el ciclo de vida de los datos de animales.
 */
@RestController
@RequestMapping("/api/animales")
@CrossOrigin(origins = "*")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    /**
     * Recupera la lista completa de animales registrados en la base de datos.
     * @return List de objetos Animal.
     */
    @GetMapping
    public List<Animal> listarAnimales() {
        return animalRepository.findAll();
    }

    /**
     * Procesa la inserción de un nuevo registro de animal.
     * @param animal Objeto con los datos capturados en el frontend.
     * @return El objeto guardado con su ID generado.
     */
    @PostMapping
    public Animal guardarAnimal(@RequestBody Animal animal) {
        if (animal == null) {
            throw new IllegalArgumentException("El objeto animal no puede ser nulo");
        }
        return animalRepository.save(animal);
    }

    /**
     * Ejecuta la eliminación física de un registro basado en su identificador único.
     * @param id Identificador del animal a eliminar.
     * @return Respuesta HTTP (200 OK, 400 Bad Request o 404 Not Found).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAnimal(@PathVariable Integer id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }
        
        if (animalRepository.existsById(id)) {
            animalRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}