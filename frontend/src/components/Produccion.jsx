import React, { useState, useEffect } from 'react';

export default function Produccion({ user }) {
  const [animales, setAnimales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  
  // FILTROS
  const [filtroFecha, setFiltroFecha] = useState(new Date().toISOString().split('T')[0]);
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
      setAnimales(await resA.json());
      setHistorial(await resP.json());
    } catch (err) { console.error("Error cargando datos:", err); }
  };

  useEffect(() => { cargarDatos(); }, []);

  // --- LÓGICA DE FILTRADO PARA TABLA Y ESTADÍSTICAS ---
  const historialFiltrado = historial.filter(h => {
    const coincideFecha = filtroFecha ? h.fecha === filtroFecha : true;
    const coincideChapeta = filtroChapeta ? h.chapeta.includes(filtroChapeta) : true;
    return coincideFecha && coincideChapeta;
  });

  const totalLeche = historialFiltrado.reduce((acc, curr) => 
    acc + (parseFloat(curr.lecheManana) || 0) + (parseFloat(curr.lecheTarde) || 0), 0
  );

  const promedio = historialFiltrado.length > 0 ? (totalLeche / historialFiltrado.length).toFixed(2) : 0;

  // --- ACCIONES CRUD ---
  const handleGuardar = async (e) => {
    e.preventDefault();
    if (parseFloat(form.lecheManana) < 0 || parseFloat(form.lecheTarde) < 0) return alert("Valores negativos no permitidos");

    const url = editandoId ? `http://localhost:8080/api/produccion/${editandoId}` : 'http://localhost:8080/api/produccion';
    const method = editandoId ? 'PUT' : 'POST'; // Nota: Asegúrate de tener el PUT en tu backend si vas a usarlo

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, idUsuario: user?.idUsuario || user?.id })
      });
      if (res.ok) {
        alert(editandoId ? "Registro actualizado" : "Registro guardado");
        cancelarEdicion();
        cargarDatos();
      }
    } catch (err) { alert("Error de conexión"); }
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

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar este registro de producción?")) {
      await fetch(`http://localhost:8080/api/produccion/${id}`, { method: 'DELETE' });
      cargarDatos();
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* SECCIÓN DE RESUMEN Y FILTROS */}
      <div className="card shadow-sm border-0 mb-4 p-4 bg-dark text-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <label className="small fw-bold opacity-75">Filtrar Fecha</label>
            <input type="date" className="form-control form-control-sm" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="small fw-bold opacity-75">Filtrar Chapeta</label>
            <input type="text" className="form-control form-control-sm" placeholder="Ej: 101" value={filtroChapeta} onChange={e => setFiltroChapeta(e.target.value)} />
          </div>
          <div className="col-md-3 text-center border-start border-secondary">
            <h6 className="small text-uppercase mb-1">Total Litros</h6>
            <h3 className="fw-bold text-warning mb-0">{totalLeche.toFixed(2)} L</h3>
          </div>
          <div className="col-md-3 text-center border-start border-secondary">
            <h6 className="small text-uppercase mb-1">Promedio</h6>
            <h3 className="fw-bold text-info mb-0">{promedio} L</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* FORMULARIO */}
        <div className="col-md-4">
          <div className={`card shadow-sm border-0 p-4 ${editandoId ? 'border-top border-info border-4' : ''}`}>
            <h5 className={editandoId ? 'text-info fw-bold' : 'text-warning fw-bold'}>
              {editandoId ? '✏️ Editando Leche' : '🥛 Nuevo Registro'}
            </h5>
            <form onSubmit={handleGuardar}>
              <label className="small fw-bold">Vaca</label>
              <select className="form-select mb-2" value={form.chapeta} required onChange={e => setForm({...form, chapeta: e.target.value})} disabled={editandoId}>
                <option value="">Seleccionar...</option>
                {animales.map(a => <option key={a.id} value={a.chapeta}>{a.chapeta} - {a.nombre}</option>)}
              </select>
              <label className="small fw-bold">Fecha</label>
              <input type="date" className="form-control mb-2" value={form.fecha} required onChange={e => setForm({...form, fecha: e.target.value})} />
              <div className="row mb-3">
                <div className="col"><label className="small">Mañana</label><input type="number" step="0.1" min="0" className="form-control" value={form.lecheManana} required onChange={e => setForm({...form, lecheManana: e.target.value})} /></div>
                <div className="col"><label className="small">Tarde</label><input type="number" step="0.1" min="0" className="form-control" value={form.lecheTarde} required onChange={e => setForm({...form, lecheTarde: e.target.value})} /></div>
              </div>
              <button className={`btn w-100 fw-bold ${editandoId ? 'btn-info text-white' : 'btn-warning'}`}>{editandoId ? 'ACTUALIZAR' : 'GUARDAR'}</button>
              {editandoId && <button type="button" className="btn btn-link btn-sm w-100 mt-2 text-muted" onClick={cancelarEdicion}>Cancelar</button>}
            </form>
          </div>
        </div>

        {/* TABLA CON ACCIONES */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="text-secondary fw-bold mb-3">Resultados de Búsqueda ({historialFiltrado.length})</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Vaca</th>
                    <th>Fecha</th>
                    <th>M/T</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {historialFiltrado.map((h) => (
                    <tr key={h.id_produccion}>
                      <td className="fw-bold">{h.chapeta}</td>
                      <td>{h.fecha}</td>
                      <td className="small">{h.lecheManana} / {h.lecheTarde}</td>
                      <td className="fw-bold text-primary">{((parseFloat(h.lecheManana) || 0) + (parseFloat(h.lecheTarde) || 0)).toFixed(2)} L</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info border-0 me-1" onClick={() => prepararEdicion(h)}>✏️</button>
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => eliminar(h.id_produccion)}>🗑️</button>
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