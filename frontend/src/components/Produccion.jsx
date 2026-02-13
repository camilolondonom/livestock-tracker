import React, { useState, useEffect } from 'react';

export default function Produccion({ user }) {
  const [animales, setAnimales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  
  // FILTROS
  const [fechaDesde, setFechaDesde] = useState(new Date().toISOString().split('T')[0]);
  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().split('T')[0]);
  const [filtroChapeta, setFiltroChapeta] = useState('');
  
  const [form, setForm] = useState({
    chapeta: '', fecha: new Date().toISOString().split('T')[0],
    lecheManana: '', lecheTarde: '', idUsuario: user?.idUsuario || user?.id || null 
  });

  const cargarDatos = async () => {
    try {
      const [resA, resP] = await Promise.all([
        fetch('http://localhost:8080/api/animales'),
        fetch('http://localhost:8080/api/produccion')
      ]);
      if (resA.ok) setAnimales(await resA.json());
      if (resP.ok) setHistorial(await resP.json());
    } catch (err) { console.error("Error cargando datos:", err); }
  };

  useEffect(() => { cargarDatos(); }, []);

  // --- LÓGICA DE FILTRADO ---
  const historialFiltrado = historial.filter(h => {
    const coincideRango = h.fecha >= fechaDesde && h.fecha <= fechaHasta;
    const coincideChapeta = filtroChapeta ? h.chapeta.toString().includes(filtroChapeta) : true;
    return coincideRango && coincideChapeta;
  });

  const totalLeche = historialFiltrado.reduce((acc, curr) => 
    acc + (parseFloat(curr.lecheManana) || 0) + (parseFloat(curr.lecheTarde) || 0), 0
  );

  const promedio = historialFiltrado.length > 0 ? (totalLeche / historialFiltrado.length).toFixed(2) : 0;

  // --- ACCIONES ---
  const handleGuardar = async (e) => {
    e.preventDefault();
    const url = editandoId ? `http://localhost:8080/api/produccion/${editandoId}` : 'http://localhost:8080/api/produccion';
    const method = editandoId ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, idUsuario: user?.idUsuario || user?.id })
      });
      if (res.ok) {
        cancelarEdicion();
        cargarDatos();
      } else {
        alert("Error en el servidor. Revisa si el Backend tiene el método " + method);
      }
    } catch (err) { alert("Error de conexión"); }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      try {
        const res = await fetch(`http://localhost:8080/api/produccion/${id}`, { method: 'DELETE' });
        if (res.ok) cargarDatos();
      } catch (err) { alert("Error al eliminar"); }
    }
  };

  const prepararEdicion = (h) => {
    setEditandoId(h.id_produccion);
    setForm({
      chapeta: h.chapeta, fecha: h.fecha,
      lecheManana: h.lecheManana, lecheTarde: h.lecheTarde,
      idUsuario: h.idUsuario
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ chapeta: '', fecha: new Date().toISOString().split('T')[0], lecheManana: '', lecheTarde: '', idUsuario: user?.idUsuario || user?.id });
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* HEADER DE FILTROS Y TOTALES */}
      <div className="card shadow-sm border-0 mb-4 p-4 bg-dark text-white">
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="small fw-bold opacity-75">Desde</label>
            <input type="date" className="form-control form-control-sm" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="small fw-bold opacity-75">Hasta</label>
            <input type="date" className="form-control form-control-sm" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="small fw-bold opacity-75">Vaca (Chapeta)</label>
            <input type="text" className="form-control form-control-sm" placeholder="Buscar..." value={filtroChapeta} onChange={e => setFiltroChapeta(e.target.value)} />
          </div>
          <div className="col-md-5 d-flex justify-content-around border-start border-secondary">
            <div className="text-center">
              <h6 className="small text-uppercase mb-0">Total Litros</h6>
              <h3 className="fw-bold text-warning mb-0">{totalLeche.toFixed(1)} L</h3>
            </div>
            <div className="text-center">
              <h6 className="small text-uppercase mb-0">Promedio</h6>
              <h3 className="fw-bold text-info mb-0">{promedio} L</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-md-4">
          <div className={`card shadow-sm border-0 p-4 border-top border-4 ${editandoId ? 'border-info' : 'border-warning'}`}>
            <h5 className="fw-bold mb-3">{editandoId ? '✏️ Editar Registro' : '🥛 Nuevo Registro'}</h5>
            <form onSubmit={handleGuardar}>
              <label className="small fw-bold">Vaca</label>
              <select className="form-select mb-2" value={form.chapeta} required onChange={e => setForm({...form, chapeta: e.target.value})} disabled={editandoId}>
                <option value="">Seleccionar...</option>
                {animales.map(a => <option key={a.id} value={a.chapeta}>{a.chapeta} - {a.nombre}</option>)}
              </select>
              <label className="small fw-bold">Fecha</label>
              <input type="date" className="form-control mb-2" value={form.fecha} required onChange={e => setForm({...form, fecha: e.target.value})} />
              <div className="row mb-3">
                <div className="col"><label className="small">Mañana</label><input type="number" step="0.1" className="form-control" value={form.lecheManana} required onChange={e => setForm({...form, lecheManana: e.target.value})} /></div>
                <div className="col"><label className="small">Tarde</label><input type="number" step="0.1" className="form-control" value={form.lecheTarde} required onChange={e => setForm({...form, lecheTarde: e.target.value})} /></div>
              </div>
              <button className={`btn w-100 fw-bold ${editandoId ? 'btn-info text-white' : 'btn-warning'}`}>{editandoId ? 'ACTUALIZAR' : 'GUARDAR'}</button>
              {editandoId && <button type="button" className="btn btn-link btn-sm w-100 mt-2 text-muted" onClick={cancelarEdicion}>Cancelar</button>}
            </form>
          </div>
        </div>

        {/* TABLA */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h6 className="text-muted fw-bold mb-3">Registros: {historialFiltrado.length}</h6>
            <div className="table-responsive" style={{maxHeight: '400px'}}>
              <table className="table table-hover align-middle">
                <thead className="table-light sticky-top">
                  <tr>
                    <th>Vaca</th>
                    <th>Fecha</th>
                    <th>M / T</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {historialFiltrado.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4 text-muted">No hay datos en este rango</td></tr>
                  ) : (
                    historialFiltrado.map((h) => (
                      <tr key={h.id_produccion}>
                        <td className="fw-bold">{h.chapeta}</td>
                        <td>{h.fecha}</td>
                        <td>{h.lecheManana} / {h.lecheTarde}</td>
                        <td className="fw-bold text-primary">{((parseFloat(h.lecheManana) || 0) + (parseFloat(h.lecheTarde) || 0)).toFixed(1)} L</td>
                        <td>
                          <button className="btn btn-sm btn-outline-info border-0 me-1" onClick={() => prepararEdicion(h)}>✏️</button>
                          <button className="btn btn-sm btn-outline-danger border-0" onClick={() => eliminar(h.id_produccion)}>🗑️</button>
                        </td>
                      </tr>
                    ))
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