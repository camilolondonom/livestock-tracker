package com.livestocktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Produccion;

@Repository
public interface ProduccionRepository extends JpaRepository<Produccion, Integer> {
}

