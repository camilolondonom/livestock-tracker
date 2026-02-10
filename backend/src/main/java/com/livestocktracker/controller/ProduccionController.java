package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;      // NECESARIO
import org.springframework.http.ResponseEntity;  // NECESARIO
import org.springframework.web.bind.annotation.CrossOrigin; // Importa PostMapping, RequestBody, etc.
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Produccion> guardarProduccion(@RequestBody Produccion produccion) {
        try {
            Produccion nuevaProduccion = produccionRepository.save(produccion);
            return new ResponseEntity<>(nuevaProduccion, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> eliminarProduccion(@PathVariable("id") Long id) {
        try {
            // Verificamos si existe antes de borrar (buena práctica de arquitectura)
            if (produccionRepository.existsById(id)) {
                produccionRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
