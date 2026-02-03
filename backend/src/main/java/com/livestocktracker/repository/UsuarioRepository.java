package com.livestocktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Esto ya incluye: guardar, buscar por ID, eliminar y listar usuarios.
}
