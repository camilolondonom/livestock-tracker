package com.livestocktracker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Usuario;
import com.livestocktracker.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                                     .body(Map.of("error", "El correo ya está registrado"));
            }
            Usuario nuevoUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Error al guardar: " + e.getMessage()));
        }
    }

    /**
     * Actualizar perfil con manejo de excepciones para depuración
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable @NonNull Integer id, @RequestBody Usuario datosNuevos) {
        try {
            // Buscamos el usuario por ID
            java.util.Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);

            if (usuarioOptional.isPresent()) {
                Usuario user = usuarioOptional.get();
                
                // Actualizamos los campos
                user.setNombre(datosNuevos.getNombre());
                user.setEmail(datosNuevos.getEmail());
                user.setTelefono(datosNuevos.getTelefono());
                
                // Solo cambiamos contraseña si no viene vacía
                if (datosNuevos.getContrasena() != null && !datosNuevos.getContrasena().trim().isEmpty()) {
                    user.setContrasena(datosNuevos.getContrasena());
                }
                
                Usuario actualizado = usuarioRepository.save(user);
                return ResponseEntity.ok(actualizado);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(Map.of("error", "Usuario no encontrado"));
            }
        } catch (Exception e) {
            System.err.println("ERROR AL ACTUALIZAR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "Error en el servidor al actualizar"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuarioData) {
        try {
            return usuarioRepository.findByEmail(usuarioData.getEmail())
                .map(usuario -> {
                    if (usuario.getContrasena().equals(usuarioData.getContrasena())) {
                        return ResponseEntity.ok(usuario);
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                             .body(Map.of("error", "Contraseña incorrecta"));
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body(Map.of("error", "Usuario no encontrado")));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Error en login"));
        }
    }
}