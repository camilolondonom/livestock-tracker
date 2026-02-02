package com.livestocktracker.model; 

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "animales") 
public class Animal {
    
    // 2. ATRIBUTOS CON SUS ANOTACIONES
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "id_animal") 
    private int idAnimal; 

    private String chapeta;
    private String raza;

    @Column(name = "fecha_nacimiento") 
    private Date fechaNacimiento; 

    private String estado; 

    @Column(name = "id_usuario") 
    private int idUsuario; 

    // 3. CONSTRUCTOR VACÍO 
    public Animal() {
    }

    // 4. GETTERS Y SETTERS
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
    
    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
    
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