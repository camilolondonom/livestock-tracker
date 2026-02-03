package com.livestocktracker.model;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "produccion")
public class Produccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produccion")
    private int idProduccion;

    private java.sql.Date fecha;
    private java.math.BigDecimal litros; // Precisión decimal confirmada

    @Column(name = "id_animal")
    private int idAnimal;

    @Column(name = "id_usuario")
    private int idUsuario;

    // Constructores
    public Produccion() {}

    // Getters y Setters
    public int getIdProduccion() { return idProduccion; }
    public void setIdProduccion(int idProduccion) { this.idProduccion = idProduccion; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public BigDecimal getLitros() { return litros; }
    public void setLitros(BigDecimal litros) { this.litros = litros; }

    public int getIdAnimal() { return idAnimal; }
    public void setIdAnimal(int idAnimal) { this.idAnimal = idAnimal; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
}