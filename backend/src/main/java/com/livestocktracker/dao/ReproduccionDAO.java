package com.livestocktracker.dao;

import com.livestocktracker.model.Reproduccion;
import com.livestocktracker.util.ConexionDB;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReproduccionDAO {
    
    // Método para registrar un evento reproductivo
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
            System.err.println("Error al registrar evento: " + e.getMessage());
            return false;
        }
    }

    // Método para consultar eventos por animal (para usar List y ArrayList)
    public List<Reproduccion> obtenerEventosPorAnimal(int idAnimal) {
        List<Reproduccion> lista = new ArrayList<>();
        String sql = "SELECT * FROM reproduccion WHERE idAnimal = ? ORDER BY fechaEvento DESC";
        
        try (Connection conn = ConexionDB.getConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, idAnimal);
            ResultSet rs = ps.executeQuery();
            
            while (rs.next()) {
                Reproduccion r = new Reproduccion();
                r.setIdReproduccion(rs.getInt("idReproduccion"));
                r.setTipoEvento(rs.getString("tipoEvento"));
                r.setFechaEvento(rs.getDate("fechaEvento"));
                r.setObservaciones(rs.getString("observaciones"));
                r.setIdAnimal(rs.getInt("idAnimal"));
                r.setIdUsuario(rs.getInt("idUsuario"));
                lista.add(r);
            }
        } catch (SQLException e) {
            System.err.println("Error al consultar eventos: " + e.getMessage());
        }
        return lista;
    }
}
