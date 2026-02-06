package com.livestocktracker.repository; // Asegúrate que sea este y no el de "sena"

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> { 
    // Mantenemos "Integer" porque tu modelo Usuario probablemente usa Integer
    Optional<Usuario> findByEmail(String email);
}
