package com.livestocktracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Reproduccion;

@Repository
public interface ReproduccionRepository extends JpaRepository<Reproduccion, Long> {
    // Esto será vital para calcular los días desde el último parto
    List<Reproduccion> findByIdAnimalOrderByFechaDesc(Long idAnimal);
}