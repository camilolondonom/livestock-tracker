import React, { useState, useEffect } from 'react';

export default function Inventario() {
  const [animales, setAnimales] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [editandoId, setEditandoId] = useState(null);
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

  // --- LÓGICA DE CONTADORES (RECUPERADA) ---
  const totalProduccion = animales.filter(a => a.estado === 'Producción').length;
  const totalSecas = animales.filter(a => a.estado === 'Seca').length;
  const totalGeneral = animales.length;

  // --- LÓGICA DE FILTRADO ---
  const animalesFiltrados = animales.filter(a => 
    a.chapeta.toLowerCase().includes(filtro.toLowerCase())
  );

  const guardar = async (e) => {
    e.preventDefault();
    const url = editandoId 
      ? `http://localhost:8080/api/animales/${editandoId}` 
      : 'http://localhost:8080/api/animales';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();

      if (res.ok) {
        alert(editandoId ? "Datos actualizados" : "Animal guardado");
        cancelarEdicion();
        listar(); 
      } else {
        alert(data.error || "Error en la operación");
      }
    } catch (err) { alert("Error de conexión"); }
  };

  const prepararEdicion = (animal) => {
    setEditandoId(animal.id);
    setForm({
      chapeta: animal.chapeta,
      nombre: animal.nombre,
      raza: animal.raza,
      fechaNacimiento: animal.fechaNacimiento,
      estado: animal.estado
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ chapeta: '', nombre: '', raza: '', fechaNacimiento: '', estado: 'Producción' });
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este animal?")) {
      await fetch(`http://localhost:8080/api/animales/${id}`, { method: 'DELETE' });
      listar();
    }
  };

  return (
    <div className="container-fluid animate__animated animate__fadeIn">
      
      {/* SECCIÓN DE CONTADORES RECUPERADA */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow-sm border-0 p-3">
            <h6 className="small text-uppercase opacity-75">Total Inventario</h6>
            <h2 className="fw-bold mb-0">{totalGeneral} <small className="fs-6 opacity-50">Animales</small></h2>
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
          <div className={`card shadow-sm border-0 p-4 ${editandoId ? 'border-top border-warning border-4' : ''}`}>
            <h5 className={editandoId ? 'text-warning fw-bold' : 'text-primary fw-bold'}>
              {editandoId ? '📝 Editando Animal' : '✨ Nuevo Registro'}
            </h5>
            <form onSubmit={guardar}>
              <div className="mb-2">
                <label className="small fw-bold">Chapeta</label>
                <input type="text" className="form-control" value={form.chapeta}
                       onChange={e => setForm({...form, chapeta: e.target.value})} 
                       required disabled={editandoId} />
              </div>
              <div className="mb-2">
                <label className="small fw-bold">Nombre</label>
                <input type="text" className="form-control" value={form.nombre}
                       onChange={e => setForm({...form, nombre: e.target.value})} />
              </div>
              <div className="mb-2">
                <label className="small fw-bold">Raza</label>
                <input type="text" className="form-control" value={form.raza}
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

              <button type="submit" className={`btn w-100 fw-bold ${editandoId ? 'btn-warning' : 'btn-primary'}`}>
                {editandoId ? 'GUARDAR CAMBIOS' : 'REGISTRAR ANIMAL'}
              </button>
              
              {editandoId && (
                <button type="button" className="btn btn-link w-100 mt-2 text-muted" onClick={cancelarEdicion}>
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* TABLA CON BUSCADOR */}
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
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {animalesFiltrados.map(a => (
                    <tr key={a.id}>
                      <td className="fw-bold text-primary">{a.chapeta}</td>
                      <td>{a.nombre}</td>
                      <td>
                        <span className={`badge ${a.estado === 'Producción' ? 'bg-success' : 'bg-secondary'}`}>
                          {a.estado}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-warning me-2 border-0" onClick={() => prepararEdicion(a)}>
                          ✏️
                        </button>
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => eliminar(a.id)}>
                          🗑️
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
    </div>
  );
}