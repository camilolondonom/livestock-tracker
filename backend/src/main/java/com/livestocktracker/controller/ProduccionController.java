package com.livestocktracker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.livestocktracker.model.Produccion;
import com.livestocktracker.repository.ProduccionRepository;

@RestController
@RequestMapping("/api/produccion")
@CrossOrigin(origins = "*")
public class ProduccionController {

    @Autowired
    private ProduccionRepository produccionRepository;

    @GetMapping
    public List<Produccion> listarTodo() {
        return produccionRepository.findAll();
    }

    @PostMapping
    @SuppressWarnings("null")
    public ResponseEntity<Produccion> guardarProduccion(@RequestBody Produccion produccion) {
        try {
            Produccion nueva = produccionRepository.save(produccion);
            return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Void> eliminarProduccion(@PathVariable Long id) {
        try {
            if (produccionRepository.existsById(id)) {
                produccionRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
