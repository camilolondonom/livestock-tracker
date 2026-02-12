import React, { useState, useEffect } from 'react';

export default function Inventario() {
  const [animales, setAnimales] = useState([]);
  const [form, setForm] = useState({
    chapeta: '',
    nombre: '',
    raza: '',
    fechaNacimiento: '',
    estado: 'Producción'
  });

  // Cargar animales desde el Backend
  const listar = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/animales');
      const data = await res.json();
      setAnimales(data);
    } catch (err) {
      console.error("Error al listar:", err);
    }
  };

  useEffect(() => { listar(); }, []);

  // Guardar animal en la BD
  const guardar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/animales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Animal guardado exitosamente");
        listar(); 
        setForm({ chapeta: '', nombre: '', raza: '', fechaNacimiento: '', estado: 'Producción' });
      }
    } catch (err) {
      alert("Error al conectar con el servidor");
    }
  };

  // Eliminar animal
  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este animal?")) {
      await fetch(`http://localhost:8080/api/animales/${id}`, { method: 'DELETE' });
      listar();
    }
  };

  return (
    <div className="row g-4">
      {/* FORMULARIO */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-primary fw-bold mb-3">Nuevo Registro</h5>
          <form onSubmit={guardar}>
            <div className="mb-2">
              <label className="small fw-bold">Chapeta</label>
              <input type="text" className="form-control" placeholder="Ej: V-001" value={form.chapeta}
                     onChange={e => setForm({...form, chapeta: e.target.value})} required />
            </div>
            <div className="mb-2">
              <label className="small fw-bold">Nombre</label>
              <input type="text" className="form-control" placeholder="Nombre del animal" value={form.nombre}
                     onChange={e => setForm({...form, nombre: e.target.value})} />
            </div>
            <div className="mb-2">
              <label className="small fw-bold">Raza</label>
              <input type="text" className="form-control" placeholder="Ej: Holstein" value={form.raza}
                     onChange={e => setForm({...form, raza: e.target.value})} />
            </div>
            <div className="mb-2">
              <label className="small">Fecha Nacimiento</label>
              <input type="date" className="form-control" value={form.fechaNacimiento}
                     onChange={e => setForm({...form, fechaNacimiento: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="small">Estado</label>
              <select className="form-select" value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                <option value="Producción">Producción</option>
                <option value="Seca">Seca</option>
                <option value="Vendida">Vendida</option>
                <option value="Muerta">Muerta</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Guardar Animal</button>
          </form>
        </div>
      </div>

      {/* TABLA */}
      <div className="col-md-8">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-secondary fw-bold mb-3">Lista de Animales</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Chapeta</th>
                  <th>Nombre</th>
                  <th>Raza</th>
                  <th>Edad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {animales.map(a => (
                  <tr key={a.id}>
                    <td className="fw-bold text-primary">{a.chapeta}</td>
                    <td>{a.nombre}</td>
                    <td>{a.raza}</td>
                    <td>{a.edad} años</td> 
                    <td><span className="badge bg-info text-dark">{a.estado}</span></td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(a.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}