package com.livestocktracker.model;

import java.time.LocalDate;

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
    private Long id_produccion;

    private LocalDate fecha;

    @Column(name = "leche_manana") // Mapeo exacto a tu DB
    private Double lecheManana;

    @Column(name = "leche_tarde") // Mapeo exacto a tu DB
    private Double lecheTarde;

    private String chapeta; // El identificador único del animal

    @Column(name = "id_usuario")
    private Long idUsuario;

    // Constructor vacío requerido por JPA
    public Produccion() {}

    // Getters y Setters
    public Long getId_produccion() { return id_produccion; }
    public void setId_produccion(Long id_produccion) { this.id_produccion = id_produccion; }
    
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    
    public Double getLecheManana() { return lecheManana; }
    public void setLecheManana(Double lecheManana) { this.lecheManana = lecheManana; }
    
    public Double getLecheTarde() { return lecheTarde; }
    public void setLecheTarde(Double lecheTarde) { this.lecheTarde = lecheTarde; }
    
    public String getChapeta() { return chapeta; }
    public void setChapeta(String chapeta) { this.chapeta = chapeta; }
    
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
}