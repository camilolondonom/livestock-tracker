// ==========================================
// LÓGICA GLOBAL DE LIVESTOCK TRACKER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Formulario de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
    }

    // 2. Manejo del Formulario de Registro de Usuario
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', manejarRegistroUsuario);
    }

    // 3. Carga automática de animales (si existe la tabla)
    if (document.getElementById('tabla-animales-body')) {
        cargarAnimalesDesdeBackend();
    }
});

// --- FUNCIONES DE USUARIO ---

async function manejarLogin(e) {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const contrasena = document.getElementById('password').value;

    console.log("Iniciando sesión para:", email);
    
    // Por ahora, validación local para avanzar al dashboard
    // En el siguiente paso crearemos el endpoint en Java para validar esto
    if (email && contrasena) {
        window.location.href = "dashboard.html";
    }
}

async function manejarRegistroUsuario(e) {
    e.preventDefault();
    
    const nuevoUsuario = {
        nombre: document.getElementById('reg-username').value,
        email: document.getElementById('reg-email').value,
        contrasena: document.getElementById('reg-password').value,
        rol: 'ADMIN' // Rol por defecto para tus pruebas
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoUsuario)
        });

        if (respuesta.ok) {
            alert("¡Usuario creado con éxito! Ya puedes iniciar sesión.");
            e.target.reset(); // Limpia el formulario
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Hubo un error al conectar con el servidor.");
    }
}

// --- FUNCIONES DE ANIMALES ---

async function cargarAnimalesDesdeBackend() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/animales');
        const animales = await respuesta.json();
        const tablaBody = document.getElementById('tabla-animales-body');

        tablaBody.innerHTML = ''; 
        animales.forEach(animal => {
            const fila = `
                <tr>
                    <td>${animal.chapeta}</td>
                    <td>${animal.nombre || 'N/A'}</td>
                    <td>${animal.raza}</td>
                    <td>${animal.estado}</td>
                    <td><button>Ver</button></td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar animales:", error);
    }
}
