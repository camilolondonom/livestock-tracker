package com.livestocktracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List; // <--- ASEGÚRATE DE QUE ESTA LÍNEA ESTÉ PRESENTE

import com.livestocktracker.model.Produccion;
import com.livestocktracker.util.ConexionDB;

public class ProduccionDAO {
    
    public boolean registrarProduccion(Produccion p) {
        String sql = "INSERT INTO produccion (fecha, litros, idAnimal, idUsuario) VALUES (?, ?, ?, ?)";
        try (Connection conn = ConexionDB.getConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setDate(1, p.getFecha());
            ps.setBigDecimal(2, p.getLitros());
            ps.setInt(3, p.getIdAnimal());
            ps.setInt(4, p.getIdUsuario());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Produccion> obtenerProduccionPorAnimal(int idAnimal) {
        List<Produccion> lista = new ArrayList<>();
        String sql = "SELECT * FROM produccion WHERE idAnimal = ? ORDER BY fecha DESC";
        try (Connection conn = ConexionDB.getConexion();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idAnimal);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Produccion p = new Produccion();
                p.setIdProduccion(rs.getInt("idProduccion"));
                p.setFecha(rs.getDate("fecha"));
                p.setLitros(rs.getBigDecimal("litros"));
                p.setIdAnimal(rs.getInt("idAnimal"));
                p.setIdUsuario(rs.getInt("idUsuario"));
                lista.add(p);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }
}