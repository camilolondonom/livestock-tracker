import React, { useState, useEffect } from 'react';

export default function Perfil({ user, setUser }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [allUsers, setAllUsers] = useState([]);

  // Cargar todos los usuarios registrados en el sistema
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/usuarios');
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data);
      }
    } catch (err) {
      console.error("Error al obtener la lista de usuarios:", err);
    }
  };

  // Efecto para cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Sincronizar formData si el objeto user cambia externamente
  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/usuarios/${user.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser); // Actualiza el usuario en App.jsx
        setEditMode(false);
        fetchUsers(); // Refresca la tabla de usuarios
        alert("¡Datos actualizados con éxito!");
      } else {
        alert("No se pudo actualizar el perfil. Revisa la consola.");
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  };

  if (!user) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-success" role="status"></div>
      <p className="mt-2">Cargando datos de perfil...</p>
    </div>
  );

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      <div className="row g-4">
        
        {/* PANEL IZQUIERDO: EDICIÓN DE PERFIL */}
        <div className="col-lg-5">
          <div className="card shadow border-0 overflow-hidden">
            <div className="bg-success p-4 text-center text-white">
               <div className="bg-white text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm" style={{width: '70px', height: '70px'}}>
                  <h2 className="m-0 fw-bold">{user.nombre.charAt(0).toUpperCase()}</h2>
               </div>
               <h4 className="mb-0">{user.nombre}</h4>
               <small className="opacity-75">{user.rol}</small>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Nombre Completo</label>
  <input 
    type="text" 
    className={`form-control ${editMode ? 'border-primary shadow-sm' : 'bg-light'}`} 
    disabled={!editMode} // <--- Esto es lo que permite o bloquea la escritura
    value={formData.nombre || ''} 
    onChange={e => setFormData({...formData, nombre: e.target.value})} 
  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Correo Electrónico</label>
  <input 
    type="email" 
    className={`form-control ${editMode ? 'border-primary shadow-sm' : 'bg-light'}`}
    disabled={!editMode}
    value={formData.email || ''} 
    onChange={e => setFormData({...formData, email: e.target.value})} 
  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">Teléfono / WhatsApp</label>
                  <label className="form-label small fw-bold">Teléfono</label>
  <input 
    type="text" 
    className={`form-control ${editMode ? 'border-primary shadow-sm' : 'bg-light'}`}
    disabled={!editMode}
    value={formData.telefono || ''} 
    onChange={e => setFormData({...formData, telefono: e.target.value})} 
  />
                </div>

                {editMode && (
                  <div className="mb-4 animate__animated animate__fadeInDown">
                    <label className="form-label small fw-bold text-danger">Nueva Contraseña (opcional)</label>
                    <input 
                      type="password" 
                      className="form-control border-danger" 
                      placeholder="Dejar en blanco para no cambiar"
                      onChange={e => setFormData({...formData, contrasena: e.target.value})} 
                    />
                  </div>
                )}

                <div className="pt-2">
                  {!editMode ? (
                    <button type="button" className="btn btn-success w-100 fw-bold shadow-sm" onClick={() => setEditMode(true)}>
                      MODIFICAR MIS DATOS
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary flex-grow-1 fw-bold">GUARDAR CAMBIOS</button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setEditMode(false)}>CANCELAR</button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: LISTADO GENERAL */}
        <div className="col-lg-7">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-white py-3 border-0">
              <h5 className="mb-0 fw-bold text-muted">Personal Registrado</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th className="pe-4">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.length > 0 ? allUsers.map(u => (
                      <tr key={u.idUsuario}>
                        <td className="ps-4 fw-medium">{u.nombre}</td>
                        <td className="text-muted small">{u.email}</td>
                        <td>{u.telefono || <span className="text-warning small">No reg.</span>}</td>
                        <td className="pe-4">
                          <span className={`badge ${u.rol === 'Administrador' ? 'bg-info' : 'bg-light text-dark border'}`}>
                            {u.rol}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-muted">No hay otros usuarios registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}