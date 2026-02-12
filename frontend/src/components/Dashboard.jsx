import React from 'react';

export default function Dashboard({ setView, user }) {
  return (
    <div className="row g-4">
      <div className="col-12 mb-3">
        {/* Usamos el encadenamiento opcional (?.) para evitar errores si user es null */}
        <h3>Bienvenido, {user?.nombre || 'Ganadero'}</h3>
        <p className="text-muted">Resumen del sistema</p>
      </div>

      <div className="col-md-4" onClick={() => setView('inventario')} style={{cursor: 'pointer'}}>
        <div className="card bg-primary text-white p-4 shadow-sm border-0 text-center">
          <h5>🐄 INVENTARIO</h5>
          <small>Gestionar animales</small>
        </div>
      </div>

      <div className="col-md-4" onClick={() => setView('produccion')} style={{cursor: 'pointer'}}>
        <div className="card bg-warning text-dark p-4 shadow-sm border-0 text-center">
          <h5>🥛 PRODUCCIÓN</h5>
          <small>Registros diarios</small>
        </div>
      </div>

      <div className="col-md-4" onClick={() => setView('reproduccion')} style={{cursor: 'pointer'}}>
        <div className="card bg-success text-white p-4 shadow-sm border-0 text-center">
          <h5>🧬 REPRODUCCIÓN</h5>
          <small>Ciclos y partos</small>
        </div>
      </div>
    </div>
  );
}