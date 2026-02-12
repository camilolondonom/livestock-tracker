import React, { useState } from 'react'

/**
 * PROYECTO: Livestock Tracker (React Migration)
 * EVIDENCIAS: GA7-220501096-AA4-EV03 & Módulo Usuarios
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventos, setEventos] = useState([]);
  
  // Vista de Login
  if (!isLoggedIn) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{maxWidth: '400px', width: '100%'}}>
          <h2 className="text-center text-success mb-4">Livestock Tracker</h2>
          <h5 className="text-center mb-3">Módulo de Usuarios</h5>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className="mb-3">
              <label className="form-label">Usuario (Email)</label>
              <input type="email" className="form-control" defaultValue="camilo@sena.edu.co" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" defaultValue="123456" required />
            </div>
            <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
          </form>
          <p className="text-muted small mt-3 text-center">Simulación de acceso - Proyecto SENA</p>
        </div>
      </div>
    );
  }

  // Vista del Dashboard / Reproducción (Si está logueado)
  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-success shadow">
        <div className="container">
          <span className="navbar-brand fw-bold">Livestock Tracker 🚜</span>
          <button className="btn btn-outline-light btn-sm" onClick={() => setIsLoggedIn(false)}>Cerrar Sesión</button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-4">
          {/* Módulo Reproductivo */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="card-title text-success mb-4">Registro Reproductivo</h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  setEventos([...eventos, {
                    id: data.get('id'),
                    tipo: data.get('tipo'),
                    fecha: data.get('fecha')
                  }]);
                  e.target.reset();
                }}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Chapeta del Animal</label>
                    <input name="id" type="text" className="form-control" placeholder="Ej: VACA-001" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Tipo de Evento</label>
                    <select name="tipo" className="form-select">
                      <option>Inseminación</option>
                      <option>Detección de Celo</option>
                      <option>Parto</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Fecha</label>
                    <input name="fecha" type="date" className="form-control" required />
                  </div>
                  <button className="btn btn-success w-100">Guardar Evento</button>
                </form>
              </div>
            </div>
          </div>

          {/* Historial */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h4 className="card-title text-secondary mb-4">Historial Reciente</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th>Animal</th>
                        <th>Evento</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventos.map((ev, i) => (
                        <tr key={i}>
                          <td><strong>{ev.id}</strong></td>
                          <td>{ev.tipo}</td>
                          <td>{ev.fecha}</td>
                        </tr>
                      ))}
                      {eventos.length === 0 && <tr><td colSpan="3" className="text-center text-muted">No hay registros</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;