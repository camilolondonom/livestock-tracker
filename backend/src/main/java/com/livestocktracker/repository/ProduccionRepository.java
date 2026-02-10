package com.livestocktracker.repository;

import java.util.List; // ESTA LÍNEA ES LA QUE FALTA

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Produccion;

@Repository
public interface ProduccionRepository extends JpaRepository<Produccion, Long> {
    List<Produccion> findByChapeta(String chapeta);
}

