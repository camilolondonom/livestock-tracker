import React from 'react';

/**
 * COMPONENTE: Navbar
 * Propósito: Navegación global persistente.
 */
export default function Navbar({ setView, setLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm mb-4">
      <div className="container">
        <span className="navbar-brand fw-bold" onClick={() => setView('dashboard')} style={{cursor:'pointer'}}>
          🚜 LIVESTOCK ERP
        </span>
        <div className="navbar-nav me-auto">
          <button className="nav-link btn btn-link" onClick={() => setView('inventario')}>Inventario</button>
          <button className="nav-link btn btn-link" onClick={() => setView('produccion')}>Producción</button>
          <button className="nav-link btn btn-link" onClick={() => setView('reproduccion')}>Reproducción</button>
          <button className="nav-link btn btn-link" onClick={() => setView('usuario')}>Usuario</button>
          <button className="nav-link btn btn-link" onClick={() => setView('config')}>Configuración</button>
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={setLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
}