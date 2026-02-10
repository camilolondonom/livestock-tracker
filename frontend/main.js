// ==========================================
// LÓGICA GLOBAL DE LIVESTOCK TRACKER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Manejo del Formulario de Login
  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", manejarLogin);

  // 2. Manejo del Formulario de Registro de Usuario
  const registerForm = document.getElementById("register-form");
  if (registerForm)
    registerForm.addEventListener("submit", manejarRegistroUsuario);

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

  // 8. Control de registro de producción
  const produccionForm = document.getElementById("produccion-form");
  if (produccionForm) produccionForm.addEventListener("submit", manejarRegistroProduccion);

  // 9. Cargar historial de producción si existe la tabla
  if (document.getElementById("tabla-produccion-body")) {
      cargarHistorialProduccion();
  }

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
    const esPaginaPublica =
      window.location.pathname.includes("index.html") ||
      window.location.pathname === "/";
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
      const esProduccion =
        animal.estado && animal.estado.toLowerCase().includes("producción");
      if (esProduccion) produccion++;
      else secas++;

      const estadoClase = esProduccion
        ? "badge-produccion"
        : "badge-reproduccion";

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
      const respuesta = await fetch(
        `http://localhost:8080/api/animales/${id}`,
        { method: "DELETE" },
      );
      if (respuesta.ok) location.reload();
    } catch (error) {
      alert("No se pudo eliminar.");
    }
  }
}

// --- LÓGICA DE GESTIÓN PRODUCTIVA ---

async function manejarRegistroProduccion(e) {
    e.preventDefault();

    // Recuperamos el ID del usuario logueado para la auditoría
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    const nuevaProduccion = {
        fecha: document.getElementById("prod-fecha").value,
        chapeta: document.getElementById("prod-chapeta").value,
        lecheManana: parseFloat(document.getElementById("leche-manana").value) || 0,
        lecheTarde: parseFloat(document.getElementById("leche-tarde").value) || 0,
        idUsuario: usuario ? usuario.id_usuario : null
    };

    try {
        const respuesta = await fetch("http://localhost:8080/api/produccion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaProduccion),
        });

        if (respuesta.ok) {
            alert("¡Producción registrada con éxito!");
            location.reload(); // Para ver el nuevo registro en la tabla
        } else {
            const error = await respuesta.text();
            alert("Error al guardar: " + error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor.");
    }
}

// Asegúrate de que esta función reemplace a la anterior en tu main.js
async function cargarHistorialProduccion() {
    const tablaBody = document.getElementById("tabla-produccion-body");
    if (!tablaBody) return;

    try {
        const respuesta = await fetch("http://localhost:8080/api/produccion");
        if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");
        
        const registros = await respuesta.json();
        tablaBody.innerHTML = "";
        
        registros.forEach(reg => {
            const total = (reg.lecheManana || 0) + (reg.lecheTarde || 0);
            // Validamos cuál es el nombre del ID que viene del backend
            const idProduccion = reg.id_produccion || reg.id; 

            const fila = `
                <tr>
                    <td>${reg.fecha}</td>
                    <td>${reg.chapeta}</td>
                    <td>Vaca Registrada</td> 
                    <td>${reg.lecheManana} L</td>
                    <td>${reg.lecheTarde} L</td>
                    <td><strong>${total.toFixed(1)} L</strong></td>
                    <td>
                        <button class="btn-delete" onclick="eliminarProduccion(${idProduccion})">Borrar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error al cargar historial:", error);
    }
}

// Función extra para poder borrar registros de leche si te equivocas
async function eliminarProduccion(id) {
    if (confirm("¿Eliminar este registro de producción?")) {
        await fetch(`http://localhost:8080/api/produccion/${id}`, { method: 'DELETE' });
        location.reload();
    }
}