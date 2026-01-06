package com.livestocktracker.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    private static final String URL_DB = "jdbc:mysql://localhost:3306/ganaderiadb";
    private static final String USUARIO_DB = "livestock_user";
    private static final String CONTRASENA_DB = "1234"; 
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    public static Connection getConexion() {
        Connection conexion = null; 
        try {
            Class.forName(DRIVER);
            conexion = DriverManager.getConnection(URL_DB, USUARIO_DB, CONTRASENA_DB);
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver no encontrado.");
        } catch (SQLException e) {
            System.err.println("Error de conexión: " + e.getMessage());
        }
        return conexion;
    }
    
    public static void cerrarConexion(Connection conexion) {
        if (conexion != null) {
            try {
                conexion.close();
            } catch (SQLException e) {
                System.err.println("Error al cerrar conexión: " + e.getMessage());
            }
        }
    }
}