package com.livestocktracker.dao;

import java.sql.Date;
import java.util.List; // Necesario para crear fechas que JDBC entiende

import com.livestocktracker.model.Animal;

public class AnimalDAOTest {
    
    // Aquí declaramos la variable que nos permitirá llamar a los métodos CRUD
    private static AnimalDAO animalDAO = new AnimalDAO();

    // El punto de entrada del programa de prueba
    public static void main(String[] args) {
        System.out.println("--- INICIANDO PRUEBAS CRUD DEL MÓDULO ANIMAL ---");
        
        // 1. Probar que podemos guardar un registro
        probarInsercion(); 
        
        // 2. Probar que podemos leer los registros existentes
        probarConsulta();
        
        // 3. Probar que podemos modificar un registro
        probarActualizacion();
        
        // 4. Probar que podemos eliminar el registro de prueba
        probarEliminacion();
    }
    
    // Método para probar la FUNCIONALIDAD CREATE (Guardar)
    private static void probarInsercion() {
        System.out.println("\n--- 1. PRUEBA DE INSERCIÓN ---");
        
        // Creamos el objeto Animal con datos de prueba
        Animal nuevoAnimal = new Animal();
        nuevoAnimal.setChapeta("A-TEST-001"); // Un ID fácil de identificar
        nuevoAnimal.setRaza("Jersey");
        // Creamos una fecha para la BD (ej. 2024-05-20)
        nuevoAnimal.setFechaNacimiento(Date.valueOf("2024-05-20"));
        nuevoAnimal.setEstado("activa");
        nuevoAnimal.setIdUsuario(1); // Debe ser un ID de usuario que exista en tu tabla 'usuario'
        
        // Llamamos al método saveAnimal() del DAO
        boolean exito = animalDAO.saveAnimal(nuevoAnimal);
        
        if (exito) {
            System.out.println("✅ OK: Inserción exitosa de A-TEST-001.");
        } else {
            System.out.println("❌ ERROR: Fallo en la inserción. (Revisa ConexionDB y la BD)");
        }
    }

    // Método para probar la FUNCIONALIDAD READ (Consultar)
    private static void probarConsulta() {
        System.out.println("\n--- 2. PRUEBA DE CONSULTA (READ) ---");
        
        // Llamamos al método obtenerTodosLosAnimales() del DAO
        List<Animal> listaAnimales = animalDAO.obtenerTodosLosAnimales();
        
        if (!listaAnimales.isEmpty()) {
            System.out.println("Total de animales consultados: " + listaAnimales.size());
            // Mostramos los datos del primer animal de la lista (debe ser el que insertamos)
            Animal primerAnimal = listaAnimales.get(0); 
            System.out.println("Primer registro: Chapeta: " + primerAnimal.getChapeta() + ", Estado: " + primerAnimal.getEstado());
        } else {
            System.out.println("⚠️ La consulta no trajo ningún registro.");
        }
    }

    // Método para probar la FUNCIONALIDAD UPDATE (Actualizar)
    private static void probarActualizacion() {
        System.out.println("\n--- 3. PRUEBA DE ACTUALIZACIÓN ---");
        
        // 1. Necesitamos el registro que acabamos de crear para obtener su ID
        List<Animal> lista = animalDAO.obtenerTodosLosAnimales();
        if (lista.isEmpty()) return;
        
        Animal animalAActualizar = lista.get(0);
        int idOriginal = animalAActualizar.getIdAnimal();

        // 2. Cambiamos el ESTADO y la RAZA
        String nuevoEstado = "seca"; 
        animalAActualizar.setEstado(nuevoEstado);
        
        // 3. Llamamos al método actualizarAnimal() del DAO
        boolean exito = animalDAO.actualizarAnimal(animalAActualizar);
        
        if (exito) {
            System.out.println("✅ OK: Actualización exitosa. ID " + idOriginal + " ahora está en estado '" + nuevoEstado + "'.");
        } else {
            System.out.println("❌ ERROR: Fallo en la actualización.");
        }
    }

    // Método para probar la FUNCIONALIDAD DELETE (Eliminar)
    private static void probarEliminacion() {
        System.out.println("\n--- 4. PRUEBA DE ELIMINACIÓN ---");
        
        // 1. Necesitamos el ID del animal a eliminar
        List<Animal> lista = animalDAO.obtenerTodosLosAnimales();
        if (lista.isEmpty()) return;

        int idAEliminar = lista.get(0).getIdAnimal();
        
        // 2. Llamamos al método eliminarAnimal() del DAO
        boolean exito = animalDAO.eliminarAnimal(idAEliminar);
        
        if (exito) {
            System.out.println("✅ OK: Eliminación exitosa. ID " + idAEliminar + " borrado.");
        } else {
            System.out.println("❌ ERROR: Fallo en la eliminación.");
        }
    }
}