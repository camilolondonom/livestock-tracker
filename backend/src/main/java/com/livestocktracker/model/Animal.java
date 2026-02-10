package com.livestocktracker.model;

import java.time.LocalDate;
import java.time.Period;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animales")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_animal") // ESTO ES VITAL
    private Long id;

    private String chapeta;
    private String nombre;
    private String raza;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String estado;

    // --- CONSTRUCTORES ---
    public Animal() {
    } // Constructor vacío necesario para JPA

    // --- MÉTODOS ESPECIALES ---
    // Este método calcula la edad automáticamente para el frontend
    public int getEdad() {
        if (this.fechaNacimiento == null)
            return 0;
        return Period.between(this.fechaNacimiento, LocalDate.now()).getYears();
    }

    // --- GETTERS Y SETTERS (Las "llaves" de la clase) ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChapeta() {
        return chapeta;
    }

    public void setChapeta(String chapeta) {
        this.chapeta = chapeta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}