// ==========================================
// LÓGICA GLOBAL DE LIVESTOCK TRACKER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Formulario de Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", manejarLogin);

    // 2. Manejo del Formulario de Registro de Usuario
    const registerForm = document.getElementById("register-form");
    if (registerForm) registerForm.addEventListener("submit", manejarRegistroUsuario);

    // 3. Carga automática de animales (si existe la tabla)
    if (document.getElementById("tabla-animales-body")) {
        cargarAnimalesDesdeBackend();
    }

    // 4. Manejo del Formulario de Registro de Animal
    const animalForm = document.getElementById("animal-form");
    if (animalForm) animalForm.addEventListener("submit", manejarRegistroAnimal);

    // 5. Buscador de animales por chapeta
    const buscarInput = document.getElementById("buscar-id");
    if (buscarInput) {
        buscarInput.addEventListener("input", (e) => {
            const texto = e.target.value.toLowerCase();
            const filas = document.querySelectorAll("#tabla-animales-body tr");
            filas.forEach((fila) => {
                const chapeta = fila.cells[0].textContent.toLowerCase();
                fila.style.display = chapeta.includes(texto) ? "" : "none";
            });
        });
    }

    // 6. Botones de cerrar sesión (Nav y Perfil)
    const btnCerrarNav = document.getElementById("btn-cerrar-sesion-nav");
    if (btnCerrarNav) btnCerrarNav.addEventListener("click", cerrarSesion);

    const btnCerrarPerfil = document.getElementById("btn-cerrar-sesion");
    if (btnCerrarPerfil) btnCerrarPerfil.addEventListener("click", cerrarSesion);

    // 7. Carga de datos de usuario (Dashboard o Perfil)
    cargarDatosPerfil();
});

// --- FUNCIONES DE USUARIO ---

async function manejarLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const contrasena = document.getElementById("login-password").value;

    try {
        const respuesta = await fetch("http://localhost:8080/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contrasena }),
        });

        if (respuesta.ok) {
            const usuario = await respuesta.json();
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
            window.location.href = "dashboard.html";
        } else {
            alert("Error: Credenciales incorrectas");
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
            alert("¡Usuario creado con éxito!");
            e.target.reset();
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
}

function cargarDatosPerfil() {
    const datos = localStorage.getItem("usuarioLogueado");
    if (datos) {
        const usuario = JSON.parse(datos);

        // Lógica para la página de Perfil
        const nombreTexto = document.getElementById("perfil-nombre-texto");
        if (nombreTexto) {
            nombreTexto.textContent = usuario.nombre;
            document.getElementById("perfil-email-texto").textContent = usuario.email;
            document.getElementById("perfil-rol-texto").textContent = usuario.rol;
            document.getElementById("edit-nombre").value = usuario.nombre;
            document.getElementById("edit-email").value = usuario.email;
            document.getElementById("edit-rol").value = usuario.rol;
        }

        // Lógica para el Dashboard
        const displayNombre = document.getElementById("user-name-display");
        if (displayNombre) {
            displayNombre.textContent = usuario.nombre;
        }
    } else {
        // Si no hay datos y no estamos en el login, redirigir al index
        const esPaginaPublica = window.location.pathname.includes("index.html") || window.location.pathname === "/";
        if (!esPaginaPublica) {
            window.location.href = "index.html";
        }
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    alert("Has cerrado sesión correctamente.");
    window.location.href = "index.html";
}

// --- FUNCIONES DE ANIMALES ---

async function cargarAnimalesDesdeBackend() {
    try {
        const respuesta = await fetch("http://localhost:8080/api/animales");
        const animales = await respuesta.json();
        const tablaBody = document.getElementById("tabla-animales-body");

        let total = animales.length;
        let produccion = 0;
        let secas = 0;

        tablaBody.innerHTML = "";
        animales.forEach((animal) => {
            const esProduccion = animal.estado && animal.estado.toLowerCase().includes("producción");
            if (esProduccion) produccion++; else secas++;

            const estadoClase = esProduccion ? "badge-produccion" : "badge-reproduccion";

            const fila = `
                <tr>
                    <td><strong>${animal.chapeta}</strong></td>
                    <td>${animal.nombre || "Sin nombre"}</td>
                    <td>${animal.raza}</td>
                    <td>${animal.edad || 0}</td> 
                    <td><span class="badge ${estadoClase}">${animal.estado || "Activo"}</span></td>
                    <td>
                        <button onclick="eliminarAnimal(${animal.id})" class="btn-delete">Eliminar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });

        if (document.getElementById("stat-total")) {
            document.getElementById("stat-total").textContent = total;
            document.getElementById("stat-produccion").textContent = produccion;
            document.getElementById("stat-secas").textContent = secas;
        }
    } catch (error) {
        console.error("Error al cargar animales:", error);
    }
}

async function manejarRegistroAnimal(e) {
    e.preventDefault();
    const nuevoAnimal = {
        chapeta: document.getElementById("chapeta").value,
        nombre: document.getElementById("nombre").value,
        raza: document.getElementById("raza").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estado: document.getElementById("estado-select").value,
    };

    try {
        const respuesta = await fetch("http://localhost:8080/api/animales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoAnimal),
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
    if (confirm("¿Estás seguro de eliminar este registro?")) {
        try {
            const respuesta = await fetch(`http://localhost:8080/api/animales/${id}`, { method: "DELETE" });
            if (respuesta.ok) location.reload();
        } catch (error) {
            alert("No se pudo eliminar.");
        }
    }
}
