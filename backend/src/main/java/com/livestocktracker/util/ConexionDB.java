package com.livestocktracker.util; // Nuevo paquete!

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {

    // Nombramiento de CONSTANTES (SCREAMING_SNAKE_CASE)
    private static final String URL_DB = "jdbc:mysql://localhost:3306/ganaderiadb";
    private static final String USUARIO_DB = "livestock_user";
    private static final String CONTRASENA_DB = "1234"; // Por favor, cambia esta en un entorno real.
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    // Método para obtener la conexión (Nombramiento de Método en camelCase)
    public static Connection obtenerConexion() {
        Connection conexion = null; 
        try {
            Class.forName(DRIVER); // Carga del driver
            conexion = DriverManager.getConnection(URL_DB, USUARIO_DB, CONTRASENA_DB);
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver no encontrado.");
        } catch (SQLException e) {
            System.err.println("Error de conexión: " + e.getMessage());
        }
        return conexion;
    }
    
    // Método para cerrar la conexión (vital para liberar recursos)
    public static void cerrarConexion(Connection conexion) {
        if (conexion != null) {
            try {
                conexion.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
