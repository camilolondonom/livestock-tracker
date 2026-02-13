import React from 'react';

export default function Dashboard({ setView, user }) {
  return (
    <div className="container animate__animated animate__fadeIn">
      <div className="row g-4">
        {/* Cabecera del Dashboard */}
        <div className="col-12 mb-2">
          <h3 className="fw-bold">Bienvenido, <span className="text-success">{user?.nombre || 'Ganadero'}</span></h3>
          <p className="text-muted">¿Qué gestión realizaremos hoy en la finca?</p>
          <hr />
        </div>

        {/* Tarjeta Inventario */}
        <div className="col-sm-6 col-lg-4">
          <div 
            className="card h-100 bg-primary text-white p-4 shadow-sm border-0 text-center card-hover" 
            onClick={() => setView('inventario')} 
            style={{cursor: 'pointer', transition: 'transform 0.2s'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="display-4 mb-2">🐄</div>
            <h5 className="fw-bold">INVENTARIO</h5>
            <p className="small mb-0 opacity-75">Control de pesajes, razas y existencias</p>
          </div>
        </div>

        {/* Tarjeta Producción */}
        <div className="col-sm-6 col-lg-4">
          <div 
            className="card h-100 bg-warning text-dark p-4 shadow-sm border-0 text-center card-hover" 
            onClick={() => setView('produccion')} 
            style={{cursor: 'pointer', transition: 'transform 0.2s'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="display-4 mb-2">🥛</div>
            <h5 className="fw-bold">PRODUCCIÓN</h5>
            <p className="small mb-0 opacity-75">Registro de leche y rendimiento diario</p>
          </div>
        </div>

        {/* Tarjeta Reproducción */}
        <div className="col-sm-6 col-lg-4 mx-auto">
          <div 
            className="card h-100 bg-success text-white p-4 shadow-sm border-0 text-center card-hover" 
            onClick={() => setView('reproduccion')} 
            style={{cursor: 'pointer', transition: 'transform 0.2s'}}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="display-4 mb-2">🧬</div>
            <h5 className="fw-bold">REPRODUCCIÓN</h5>
            <p className="small mb-0 opacity-75">Seguimiento de celos, preñeces y partos</p>
          </div>
        </div>
      </div>
    </div>
  );
}