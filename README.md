# Livestock Tracker - Gestión Ganadera

Sistema de gestión para el control de inventario, producción lechera y eventos reproductivos. Desarrollado como parte de la formación ADSO - SENA.

## Tecnologías Utilizadas
* **Frontend:** React JS, Bootstrap 5.
* **Backend:** Java Spring Boot, Spring Data JPA.
* **Base de Datos:** MySQL.
* **Versionamiento:** Git / GitHub.

## Módulos Implementados
1. **Seguridad/Usuarios:** Login real contra base de datos y gestión de perfil.
2. **Inventario:** Registro, edición y eliminación de animales (CRUD).
3. **Producción:** Registro de pesaje de leche (mañana/tarde) asociado a cada animal.
4. **Reproducción:** Registro de eventos (partos, celos, inseminaciones) vinculados al historial del animal.

## Instrucciones de Ejecución
1. **Base de Datos:** Importar el script SQL ubicado en la carpeta `/database`.
2. **Backend:** Ejecutar `mvn spring-boot:run` o iniciar desde el IDE (Puerto 8080).
3. **Frontend:** Ejecutar `npm install` y luego `npm run dev` (Puerto 5173).


**Desarrollado por:** Camilo Londoño