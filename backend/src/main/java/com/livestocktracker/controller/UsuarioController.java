package com.livestocktracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livestocktracker.model.Usuario;
import com.livestocktracker.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
public Usuario guardarUsuario(@RequestBody Usuario usuario) {
    if (usuario == null) {
        throw new IllegalArgumentException("El usuario no puede ser nulo");
    }
    return usuarioRepository.save(usuario);
}
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Usuario usuarioData) {
    return usuarioRepository.findByEmail(usuarioData.getEmail())
            .map(usuario -> {
                if (usuario.getContrasena().equals(usuarioData.getContrasena())) {
                    return ResponseEntity.ok(usuario);
                } else {
                    return ResponseEntity.status(401).body("Contraseña incorrecta");
                }
            })
            .orElse(ResponseEntity.status(404).body("Usuario no encontrado"));
}
}