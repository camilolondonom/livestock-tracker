package com.livestocktracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.livestocktracker.model.Reproduccion;
import com.livestocktracker.util.ConexionDB;

public class ReproduccionDAO {
    
    public boolean registrarEvento(Reproduccion r) {
        String sql = "INSERT INTO reproduccion (tipoEvento, fechaEvento, observaciones, idAnimal, idUsuario) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = ConexionDB.getConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, r.getTipoEvento());
            ps.setDate(2, r.getFechaEvento());
            ps.setString(3, r.getObservaciones());
            ps.setInt(4, r.getIdAnimal());
            ps.setInt(5, r.getIdUsuario());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
