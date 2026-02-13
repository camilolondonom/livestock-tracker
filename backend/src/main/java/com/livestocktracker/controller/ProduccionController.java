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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Produccion;
import com.livestocktracker.repository.ProduccionRepository;

@RestController
@RequestMapping("/api/produccion")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings("null") // <--- ESTO ES EL "SANTO REMEDIO" PARA TUS ADVERTENCIAS
public class ProduccionController {

    @Autowired
    private ProduccionRepository produccionRepository;

    @GetMapping
    public List<Produccion> listarTodo() {
        return produccionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> guardarProduccion(@RequestBody Produccion produccion) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(produccionRepository.save(produccion));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProduccion(@PathVariable Long id, @RequestBody Produccion datos) {
        return produccionRepository.findById(id).map(prod -> {
            prod.setFecha(datos.getFecha());
            prod.setLecheManana(datos.getLecheManana());
            prod.setLecheTarde(datos.getLecheTarde());
            return ResponseEntity.ok(produccionRepository.save(prod));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProduccion(@PathVariable Long id) {
        if (id != null && produccionRepository.existsById(id)) {
            produccionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}