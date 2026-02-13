import React, { useState } from 'react';

export default function Navbar({ setView, setLogout }) {
  // Estado para controlar si el menú está abierto o cerrado
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Función para cambiar de vista y cerrar el menú automáticamente (útil en móviles)
  const navigateTo = (viewName) => {
    setView(viewName);
    setIsNavCollapsed(true); // Cierra el menú tras hacer clic
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm mb-4">
      <div className="container">
        <span 
          className="navbar-brand fw-bold d-flex align-items-center" 
          onClick={() => navigateTo('dashboard')} 
          style={{cursor:'pointer'}}
        >
          <span className="me-2">🚜</span> LIVESTOCK ERP
        </span>

        {/* Botón Hamburguesa: Ahora con onClick de React */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* La clase 'collapse' ahora depende del estado de React */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn btn-link border-0" onClick={() => navigateTo('inventario')}>Inventario</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link border-0" onClick={() => navigateTo('produccion')}>Producción</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link border-0" onClick={() => navigateTo('reproduccion')}>Reproducción</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link border-0" onClick={() => navigateTo('usuario')}>Usuario</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link border-0" onClick={() => navigateTo('config')}>Configuración</button>
            </li>
          </ul>
          
          <div className="d-flex">
            <button className="btn btn-outline-light btn-sm fw-bold px-3" onClick={setLogout}>
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}