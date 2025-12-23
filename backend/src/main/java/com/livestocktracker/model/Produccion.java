package com.livestocktracker.model;

import java.sql.Date;
import java.math.BigDecimal;

public class Produccion {
    private int idProduccion;
    private Date fecha;
    private BigDecimal litros;
    private int idAnimal;
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