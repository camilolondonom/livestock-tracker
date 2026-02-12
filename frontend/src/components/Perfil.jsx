import React from 'react';

export default function Perfil({ user }) {
  if (!user) return <p>Cargando datos de usuario...</p>;

  return (
    <div className="card shadow-sm border-0 p-4 mx-auto" style={{maxWidth: '600px'}}>
      <div className="text-center mb-4">
        <div className="bg-success text-white rounded-circle d-inline-block p-4 mb-2" style={{width: '80px', height: '80px'}}>
          <h2 className="m-0">{user.nombre.charAt(0)}</h2>
        </div>
        <h4>{user.nombre}</h4>
        <span className="badge bg-secondary">{user.rol}</span>
      </div>

      <div className="list-group list-group-flush">
        <div className="list-group-item d-flex justify-content-between">
          <span className="text-muted">ID de Usuario:</span>
          <span className="fw-bold">{user.idUsuario}</span>
        </div>
        <div className="list-group-item d-flex justify-content-between">
          <span className="text-muted">Email:</span>
          <span className="fw-bold">{user.email}</span>
        </div>
        <div className="list-group-item d-flex justify-content-between">
          <span className="text-muted">Estado:</span>
          <span className="text-success fw-bold">Activo</span>
        </div>
      </div>
      
      <button className="btn btn-outline-success mt-4 w-100" onClick={() => alert("Función para cambiar contraseña en desarrollo")}>
        Cambiar Contraseña
      </button>
    </div>
  );
}