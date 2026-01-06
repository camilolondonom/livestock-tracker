package com.livestocktracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.livestocktracker.model.Animal;
import com.livestocktracker.util.ConexionDB;

public class AnimalDAO {

    // ====================================================================
    // 1. CONSTANTES SQL (SCREAMING_SNAKE_CASE)
    // ====================================================================
    
    // FUNCIONALIDAD: INSERCIÓN (CREATE)
    private static final String INSERTAR_ANIMAL = 
        "INSERT INTO animal (chapeta, raza, fechaNacimiento, estado, idUsuario) VALUES (?, ?, ?, ?, ?)";
        
    // FUNCIONALIDAD: CONSULTA (READ - Todos)
    private static final String SELECCIONAR_TODOS = 
        "SELECT idAnimal, chapeta, raza, fechaNacimiento, estado, idUsuario FROM animal";
        
    // FUNCIONALIDAD: ACTUALIZACIÓN (UPDATE)
    private static final String ACTUALIZAR_ANIMAL = 
        "UPDATE animal SET chapeta=?, raza=?, fechaNacimiento=?, estado=?, idUsuario=? WHERE idAnimal=?";
        
    // FUNCIONALIDAD: ELIMINACIÓN (DELETE)
    private static final String ELIMINAR_ANIMAL = 
        "DELETE FROM animal WHERE idAnimal = ?";


    // ====================================================================
    // 2. MÉTODOS CRUD (camelCase)
    // ====================================================================

    /**
     * Inserta un nuevo objeto Animal en la base de datos (CREATE).
     * Cumple con la funcionalidad de inserción.
     */
    public boolean saveAnimal(Animal animal) {
        Connection conexion = null;
        PreparedStatement ps = null;
        boolean exito = false;

        try {
            conexion = ConexionDB.getConexion();
            ps = conexion.prepareStatement(INSERTAR_ANIMAL);

            // Establecer los parámetros (usando los Getters del objeto Animal)
            ps.setString(1, animal.getChapeta());
            ps.setString(2, animal.getRaza());
            ps.setDate(3, animal.getFechaNacimiento());
            ps.setString(4, animal.getEstado());
            ps.setInt(5, animal.getIdUsuario());

            // Ejecutar la sentencia
            int filasAfectadas = ps.executeUpdate();
            
            if (filasAfectadas > 0) {
                exito = true;
            }

        } catch (SQLException e) {
            System.err.println("Error al insertar animal: " + e.getMessage());
        } finally {
            // Cierre de recursos (IMPORTANTE)
            try {
                if (ps != null) ps.close();
                ConexionDB.cerrarConexion(conexion);
            } catch (SQLException e) {
            }
        }
        return exito;
    }


    /**
     * Consulta y obtiene todos los registros de animales de la base de datos (READ).
     * Cumple con la funcionalidad de consulta.
     */
    public List<Animal> obtenerTodosLosAnimales() {
        List<Animal> animales = new ArrayList<>(); 
        Connection conexion = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            conexion = ConexionDB.getConexion();
            ps = conexion.prepareStatement(SELECCIONAR_TODOS);
            
            rs = ps.executeQuery(); // Ejecutar la consulta
            
            // Iterar sobre los resultados
            while (rs.next()) {
                Animal animal = new Animal(); // Nuevo objeto para cada registro
                
                // Mapeo (Setters)
                animal.setIdAnimal(rs.getInt("idAnimal")); 
                animal.setChapeta(rs.getString("chapeta"));
                animal.setRaza(rs.getString("raza"));
                animal.setFechaNacimiento(rs.getDate("fechaNacimiento"));
                animal.setEstado(rs.getString("estado"));
                animal.setIdUsuario(rs.getInt("idUsuario"));
                
                animales.add(animal);
            }

        } catch (SQLException e) {
            System.err.println("Error al consultar todos los animales: " + e.getMessage());
        } finally {
            // Cierre de recursos
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
                ConexionDB.cerrarConexion(conexion); 
            } catch (SQLException e) {
            }
        }
        return animales;
    }


    /**
     * Actualiza la información de un objeto Animal existente (UPDATE).
     * Cumple con la funcionalidad de actualización.
     */
    public boolean actualizarAnimal(Animal animal) {
        Connection conexion = null;
        PreparedStatement ps = null;
        boolean filaActualizada = false;

        try {
            conexion = ConexionDB.getConexion();
            ps = conexion.prepareStatement(ACTUALIZAR_ANIMAL);

            // 1. Establecer los nuevos valores
            ps.setString(1, animal.getChapeta());
            ps.setString(2, animal.getRaza());
            ps.setDate(3, animal.getFechaNacimiento());
            ps.setString(4, animal.getEstado());
            ps.setInt(5, animal.getIdUsuario());

            // 2. Establecer el ID para la condición WHERE
            ps.setInt(6, animal.getIdAnimal()); 

            filaActualizada = ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.err.println("Error al actualizar el animal: " + e.getMessage());
        } finally {
            try {
                if (ps != null) ps.close();
                ConexionDB.cerrarConexion(conexion);
            } catch (SQLException e) {
            }
        }
        return filaActualizada;
    }


    /**
     * Elimina un registro de animal de la base de datos (DELETE).
     * Cumple con la funcionalidad de eliminación.
     */
    public boolean eliminarAnimal(int idAnimal) {
        Connection conexion = null;
        PreparedStatement ps = null;
        boolean filaEliminada = false;

        try {
            conexion = ConexionDB.getConexion();
            ps = conexion.prepareStatement(ELIMINAR_ANIMAL);

            // Establecer el ID a eliminar
            ps.setInt(1, idAnimal);

            filaEliminada = ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.err.println("Error al eliminar el animal: " + e.getMessage());
        } finally {
            try {
                if (ps != null) ps.close();
                ConexionDB.cerrarConexion(conexion);
            } catch (SQLException e) {
            }
        }
        return filaEliminada;
    }
}