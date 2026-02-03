package com.livestocktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Reproduccion;

@Repository
public interface ReproduccionRepository extends JpaRepository<Reproduccion, Integer> {
}