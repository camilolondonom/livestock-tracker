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
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      alert("Error: Asegúrate de que Spring Boot esté corriendo en el puerto 8080");
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

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
        {/* Agregamos el prop 'user' a los componentes que lo necesitan para el idUsuario */}
        {view === 'dashboard'    && <Dashboard setView={setView} user={user} />}
        {view === 'inventario'   && <Inventario setView={setView} />}
        
        {/* Importante: Produccion y Reproduccion ahora reciben al usuario logueado */}
        {view === 'produccion'   && <Produccion setView={setView} user={user} />}
        {view === 'reproduccion' && <Reproduccion setView={setView} user={user} />}
        
        {view === 'usuario'      && <Perfil user={user} setUser={setUser} />}
        {view === 'config'       && <Configuracion setView={setView} />}
      </div>
    </div>
  );
}

// El componente LoginForm se mantiene igual, ya que funciona correctamente
function LoginForm({ onLogin }) {
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
            <label className="small fw-bold">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              onChange={e => setCred({...cred, email: e.target.value})} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="small fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              onChange={e => setCred({...cred, contrasena: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">INGRESAR</button>
        </form>
      </div>
    </div>
  );
}

export default App;