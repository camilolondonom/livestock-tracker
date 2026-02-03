package com.livestocktracker.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // Dice: "Spring, esta clase representa una tabla en la DB"
@Table(name = "reproduccion") // Dice: "La tabla en MySQL se llama 'reproduccion'"
public class Reproduccion {

    @Id // Dice: "Este campo es la Llave Primaria"
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Dice: "La DB se encarga de sumar 1, 2, 3..."
    @Column(name = "id_reproduccion") // Dice: "En la DB la columna se llama id_reproduccion"
    private int idReproduccion;

    @Column(name = "tipo_evento") // Importante: si en DB tiene guion bajo, ponlo aquí
    private String tipoEvento; 

    @Column(name = "fecha_evento")
    private Date fechaEvento;

    private String observaciones;

    @Column(name = "id_animal")
    private int idAnimal;

    @Column(name = "id_usuario")
    private int idUsuario;

    // Constructor Vacío (Obligatorio para que Spring pueda crear el objeto)
    public Reproduccion() {}

    // Getters y Setters (Los que permiten leer y escribir los datos)
    public int getIdReproduccion() { return idReproduccion; }
    public void setIdReproduccion(int idReproduccion) { this.idReproduccion = idReproduccion; }

    public String getTipoEvento() { return tipoEvento; }
    public void setTipoEvento(String tipoEvento) { this.tipoEvento = tipoEvento; }

    public Date getFechaEvento() { return fechaEvento; }
    public void setFechaEvento(Date fechaEvento) { this.fechaEvento = fechaEvento; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public int getIdAnimal() { return idAnimal; }
    public void setIdAnimal(int idAnimal) { this.idAnimal = idAnimal; }

    public int getIdUsuario() { return idUsuario; }
    public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }
}
