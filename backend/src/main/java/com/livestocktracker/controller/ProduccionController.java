package com.livestocktracker.controller;

import java.util.List;
import java.util.Map;

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
            if (produccion == null) return ResponseEntity.badRequest().build();
            Produccion nueva = produccionRepository.save(produccion);
            return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // --- NUEVO MÉTODO PARA ACTUALIZAR (PUT) ---
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProduccion(@PathVariable Long id, @RequestBody Produccion datosNuevos) {
        return produccionRepository.findById(id).map(prod -> {
            prod.setFecha(datosNuevos.getFecha());
            prod.setLecheManana(datosNuevos.getLecheManana());
            prod.setLecheTarde(datosNuevos.getLecheTarde());
            // La chapeta y el usuario normalmente no cambian en una edición de pesaje
            
            Produccion actualizado = produccionRepository.save(prod);
            return ResponseEntity.ok(actualizado);
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