package com.livestocktracker.model;

import java.sql.Date;

public class Reproduccion {
    private int idReproduccion;
    private String tipoEvento; // ENUM: 'celo', 'servicio', 'parto', 'secado'
    private Date fechaEvento;
    private String observaciones;
    private int idAnimal;
    private int idUsuario;

    public Reproduccion() {}

    // Getters y Setters
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
