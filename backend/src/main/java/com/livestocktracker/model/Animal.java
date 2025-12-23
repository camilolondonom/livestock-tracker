package com.livestocktracker.model; 

import java.sql.Date; 

public class Animal {
    
    // 1. Atributos (Variables de Instancia en camelCase)
    private int idAnimal; 
    private String chapeta;
    private String raza;
    private Date fechaNacimiento; 
    private String estado; 
    private int idUsuario; // FK para la tabla 'usuario'

    // 2. Constructor Vacío 
    public Animal() {
    }

    // 3. Getters y Setters (Nombramiento de métodos: getXxx/setXxx en camelCase)

    public int getIdAnimal() {
        return idAnimal;
    }

    public void setIdAnimal(int idAnimal) {
        this.idAnimal = idAnimal;
    }

    public String getChapeta() {
        return chapeta;
    }

    public void setChapeta(String chapeta) {
        this.chapeta = chapeta;
    }
    
    // Getters y Setters para 'raza'
    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    // Getters y Setters para 'fechaNacimiento'
    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    // Getters y Setters para 'estado'
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    // Getters y Setters para 'idUsuario'
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
    
    // Sugerencia: Método toString() para facilitar la depuración
    @Override
    public String toString() {
        return "Animal{" +
                "idAnimal=" + idAnimal +
                ", chapeta='" + chapeta + '\'' +
                ", raza='" + raza + '\'' +
                ", estado='" + estado + '\'' +
                '}';
    }
}