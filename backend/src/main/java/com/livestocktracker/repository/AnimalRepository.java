package com.livestocktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.livestocktracker.model.Animal;

@Repository

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    java.util.Optional<Animal> findByChapeta(String chapeta);
}