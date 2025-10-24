package com.livestocktracker;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnectionTest {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/ganaderiadb";
        String user = "livestock_user";
        String password = "1234";

        try (Connection connection = DriverManager.getConnection(url, user, password)) {
            System.out.println("✅ Conexión exitosa a la base de datos!");
        } catch (SQLException e) {
            System.out.println("❌ Error al conectar con la base de datos:");
            e.printStackTrace();
        }
    }
}
