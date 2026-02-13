import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Inventario from './components/Inventario';
import Produccion from './components/Produccion';
import Reproduccion from './components/Reproduccion';
import Perfil from './components/Perfil';
import Configuracion from './components/Configuracion';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // LÓGICA DE LOGIN
  const handleLogin = async (credentials) => {
    try {
      const res = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setIsLoggedIn(true);
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (err) {
      alert("Error: No se pudo conectar con el servidor.");
    }
  };

  // LÓGICA DE REGISTRO
  const handleRegister = async (newUser) => {
    try {
      const res = await fetch('http://localhost:8080/api/usuarios/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      
      if (res.ok) {
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setShowRegister(false);
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Error al registrar.");
      }
    } catch (err) {
      alert("Error: No se pudo conectar con el servidor.");
    }
  };

  // VISTA DE ACCESO (LOGIN / REGISTRO)
  if (!isLoggedIn) {
    return showRegister ? (
      <RegisterForm 
        onRegister={handleRegister} 
        onBack={() => setShowRegister(false)} 
      />
    ) : (
      <LoginForm 
        onLogin={handleLogin} 
        onGoToRegister={() => setShowRegister(true)} 
      />
    );
  }

  // VISTA PRINCIPAL (SISTEMA LOGUEADO)
  return (
    <div className="min-vh-100 bg-light">
      <Navbar 
        setView={setView} 
        setLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
          setView('dashboard');
        }} 
      />
      
      <div className="container py-4">
        {view === 'dashboard'    && <Dashboard setView={setView} user={user} />}
        {view === 'inventario'   && <Inventario setView={setView} user={user} />}
        {view === 'produccion'   && <Produccion setView={setView} user={user} />}
        {view === 'reproduccion' && <Reproduccion setView={setView} user={user} />}
        {view === 'usuario'      && <Perfil user={user} setUser={setUser} />}
        {view === 'config'       && <Configuracion setView={setView} />}
      </div>
    </div>
  );
}

// --- COMPONENTE LOGIN ---
function LoginForm({ onLogin, onGoToRegister }) {
  const [cred, setCred] = useState({ email: '', contrasena: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(cred);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 border-0" style={{width: '350px'}}>
        <h3 className="text-center text-success mb-4 fw-bold">LIVESTOCK</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Correo Electrónico</label>
            <input type="email" className="form-control" required
              onChange={e => setCred({...cred, email: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Contraseña</label>
            <input type="password" className="form-control" required
              onChange={e => setCred({...cred, contrasena: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">INGRESAR</button>
          <button type="button" className="btn btn-outline-secondary w-100 mt-2 fw-bold" onClick={onGoToRegister}>
            REGISTRARSE
          </button>
        </form>
      </div>
    </div>
  );
}

// --- COMPONENTE REGISTRO ---
function RegisterForm({ onRegister, onBack }) {
  const [data, setData] = useState({ 
    nombre: '', email: '', telefono: '', contrasena: '', rol: 'Ganadero' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4 border-0" style={{width: '400px'}}>
        <h3 className="text-center text-success mb-4 fw-bold">CREAR CUENTA</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Nombre Completo</label>
            <input type="text" className="form-control" required 
              onChange={e => setData({...data, nombre: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Correo Electrónico</label>
            <input type="email" className="form-control" required 
              onChange={e => setData({...data, email: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Teléfono / Celular</label>
            <input type="text" className="form-control" placeholder="Ej: 3001234567"
              onChange={e => setData({...data, telefono: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="small fw-bold text-muted">Contraseña</label>
            <input type="password" className="form-control" required 
              onChange={e => setData({...data, contrasena: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">REGISTRARME</button>
          <button type="button" className="btn btn-link w-100 mt-2 text-decoration-none text-muted" onClick={onBack}>
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;