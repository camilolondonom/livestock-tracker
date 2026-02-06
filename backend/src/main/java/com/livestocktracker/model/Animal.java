package com.livestocktracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "animal")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_animal")
    private Integer id;

    private String chapeta;
    private String nombre;
    private String raza;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    private String estado;

    // Método especial para calcular la edad automáticamente
    public Integer getEdad() {
        if (this.fechaNacimiento != null) {
            return Period.between(this.fechaNacimiento, LocalDate.now()).getYears();
        }
        return 0;
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getChapeta() { return chapeta; }
    public void setChapeta(String chapeta) { this.chapeta = chapeta; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}