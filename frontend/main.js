// ==========================================
// LÓGICA GLOBAL DE LIVESTOCK TRACKER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Formulario de Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", manejarLogin);
    }

    // 2. Manejo del Formulario de Registro de Usuario
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", manejarRegistroUsuario);
    }

    // 3. Carga automática de animales (si existe la tabla)
    if (document.getElementById("tabla-animales-body")) {
        cargarAnimalesDesdeBackend();
    }

    // 4. Manejo del Formulario de Registro de Animal
    const animalForm = document.querySelector('section:nth-child(3) form');
    if (animalForm) {
        animalForm.addEventListener("submit", manejarRegistroAnimal);
    }

    // 5. Buscador de animales por chapeta
    const buscarInput = document.getElementById('buscar-id');
    if (buscarInput) {
        buscarInput.addEventListener('input', (e) => {
            const texto = e.target.value.toLowerCase();
            const filas = document.querySelectorAll('#tabla-animales-body tr');

            filas.forEach(fila => {
                const chapeta = fila.cells[0].textContent.toLowerCase();
                fila.style.display = chapeta.includes(texto) ? '' : 'none';
            });
        });
    }
});

// --- FUNCIONES DE USUARIO ---

async function manejarLogin(e) {
    e.preventDefault();
    const email = document.getElementById("username").value;
    const contrasena = document.getElementById("password").value;

    try {
        const respuesta = await fetch("http://localhost:8080/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contrasena }),
        });

        if (respuesta.ok) {
            const usuario = await respuesta.json();
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
            window.location.href = "dashboard.html";
        } else {
            const errorMsg = await respuesta.text();
            alert("Error: " + errorMsg);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

async function manejarRegistroUsuario(e) {
    e.preventDefault();
    const nuevoUsuario = {
        nombre: document.getElementById("reg-username").value,
        email: document.getElementById("reg-email").value,
        contrasena: document.getElementById("reg-password").value,
        rol: "ADMIN",
    };

    try {
        const respuesta = await fetch("http://localhost:8080/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario),
        });

        if (respuesta.ok) {
            alert("¡Usuario creado con éxito! Ya puedes iniciar sesión.");
            e.target.reset();
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Hubo un error al conectar con el servidor.");
    }
}

// --- FUNCIONES DE ANIMALES ---

async function cargarAnimalesDesdeBackend() {
    try {
        const respuesta = await fetch("http://localhost:8080/api/animales");
        const animales = await respuesta.json();
        const tablaBody = document.getElementById("tabla-animales-body");

        tablaBody.innerHTML = "";
        animales.forEach((animal) => {
            const fila = `
                <tr>
                    <td>${animal.chapeta}</td>
                    <td>${animal.nombre || "N/A"}</td>
                    <td>${animal.raza}</td>
                    <td>${animal.edad}</td> 
                    <td>${animal.estado}</td>
                    <td>
                        <button onclick="eliminarAnimal(${animal.id})" style="color: red; cursor: pointer;">Eliminar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar animales:", error);
    }
}

async function manejarRegistroAnimal(e) {
    e.preventDefault();
    const nuevoAnimal = {
        chapeta: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        raza: document.getElementById('raza').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        estado: document.getElementById('estado').value
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/animales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoAnimal)
        });

        if (respuesta.ok) {
            alert("¡Animal registrado con éxito!");
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function eliminarAnimal(id) {
    if (confirm("¿Estás seguro de eliminar este animal?")) {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/animales/${id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                location.reload();
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el animal.");
        }
    }
}