import React, { useState, useEffect } from 'react';

export default function Inventario() {
  const [animales, setAnimales] = useState([]);
  const [filtro, setFiltro] = useState(''); // Estado para el buscador
  const [form, setForm] = useState({
    chapeta: '', nombre: '', raza: '', fechaNacimiento: '', estado: 'Producción'
  });

  const listar = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/animales');
      const data = await res.json();
      setAnimales(data);
    } catch (err) { console.error("Error al listar:", err); }
  };

  useEffect(() => { listar(); }, []);

  // Lógica de contadores
  const totalProduccion = animales.filter(a => a.estado === 'Producción').length;
  const totalSecas = animales.filter(a => a.estado === 'Seca').length;
  const totalGeneral = animales.length;

  // Lógica de filtrado por chapeta
  const animalesFiltrados = animales.filter(a => 
    a.chapeta.toLowerCase().includes(filtro.toLowerCase())
  );

  const guardar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/animales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();

      if (res.ok) {
        alert("Animal guardado exitosamente");
        listar(); 
        setForm({ chapeta: '', nombre: '', raza: '', fechaNacimiento: '', estado: 'Producción' });
      } else {
        // Muestra el mensaje de error que enviamos desde el Backend (Chapeta duplicada)
        alert(data.error || "Error al guardar");
      }
    } catch (err) {
      alert("Error al conectar con el servidor");
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este animal?")) {
      await fetch(`http://localhost:8080/api/animales/${id}`, { method: 'DELETE' });
      listar();
    }
  };

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      
      {/* TARJETAS DE RESUMEN */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow-sm border-0 p-3">
            <h6 className="small text-uppercase opacity-75">Total Inventario</h6>
            <h2 className="fw-bold mb-0">{totalGeneral} <small className="fs-6">Animales</small></h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow-sm border-0 p-3">
            <h6 className="small text-uppercase opacity-75">En Producción</h6>
            <h2 className="fw-bold mb-0">{totalProduccion}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white shadow-sm border-0 p-3">
            <h6 className="small text-uppercase opacity-75">Estado: Secas</h6>
            <h2 className="fw-bold mb-0">{totalSecas}</h2>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="text-primary fw-bold mb-3">Nuevo Registro</h5>
            <form onSubmit={guardar}>
              <div className="mb-2">
                <label className="small fw-bold">Chapeta (ID Único)</label>
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
              <button type="submit" className="btn btn-primary w-100 fw-bold">REGISTRAR ANIMAL</button>
            </form>
          </div>
        </div>

        {/* TABLA CON FILTRO */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-secondary fw-bold m-0">Lista de Animales</h5>
              <div className="w-50">
                <input 
                  type="text" 
                  className="form-control form-control-sm border-primary" 
                  placeholder="🔍 Buscar por chapeta..." 
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
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
                  {animalesFiltrados.length > 0 ? (
                    animalesFiltrados.map(a => (
                      <tr key={a.id}>
                        <td className="fw-bold text-primary">{a.chapeta}</td>
                        <td>{a.nombre}</td>
                        <td>{a.raza}</td>
                        <td>{a.edad} años</td> 
                        <td>
                          <span className={`badge ${a.estado === 'Producción' ? 'bg-success' : 'bg-secondary'}`}>
                            {a.estado}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-outline-danger btn-sm border-0" onClick={() => eliminar(a.id)}>
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-3 text-muted">No se encontraron animales con esa chapeta</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}