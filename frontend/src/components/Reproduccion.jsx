import React, { useState, useEffect } from 'react';

export default function Reproduccion({ user }) {
  const [animales, setAnimales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({
    idAnimal: '',
    tipoEvento: 'Celo',
    fecha: new Date().toISOString().split('T')[0],
    observaciones: '',
    idUsuario: user?.idUsuario || user?.id || 1
  });

  const cargarDatos = async () => {
    try {
      const [resA, resH] = await Promise.all([
        fetch('http://localhost:8080/api/reproduccion/aptos'),
        fetch('http://localhost:8080/api/reproduccion/historial')
      ]);
      if (resA.ok && resH.ok) {
        const dataA = await resA.json();
        const dataH = await resH.json();
        setAnimales(dataA);
        setHistorial(dataH);
      }
    } catch (err) {
      console.error("Error al cargar:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const calcularProyeccion = (fechaServicio, meses) => {
    if (!fechaServicio) return "";
    const fecha = new Date(fechaServicio);
    fecha.setMonth(fecha.getMonth() + meses);
    return fecha.toLocaleDateString('es-ES', { 
      day: '2-digit', month: '2-digit', year: 'numeric' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/reproduccion/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, idAnimal: parseInt(form.idAnimal) })
      });
      if (res.ok) {
        alert("✅ Evento registrado");
        setForm({ ...form, idAnimal: '', observaciones: '' });
        cargarDatos();
      }
    } catch (err) {
      alert("❌ Error de red");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        {/* PANEL FORMULARIO */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 border-top border-4 border-danger">
            <h5 className="text-danger fw-bold mb-3">Registrar Evento</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="small fw-bold">Vaca (Chapeta)</label>
                <select 
                  className="form-select" 
                  value={form.idAnimal} 
                  onChange={(e) => setForm({ ...form, idAnimal: e.target.value })} 
                  required
                >
                  <option value="">Seleccione...</option>
                  {animales.map((a) => (
                    <option key={a.id} value={a.id}>{a.chapeta} - {a.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="small fw-bold">Fecha</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={form.fecha} 
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="small fw-bold">Tipo</label>
                <select 
                  className="form-select" 
                  value={form.tipoEvento} 
                  onChange={(e) => setForm({ ...form, tipoEvento: e.target.value })}
                >
                  <option value="Celo">Celo</option>
                  <option value="Inseminacion">Inseminación</option>
                  <option value="Monta Natural">Monta Natural</option>
                  <option value="Parto">Parto</option>
                  <option value="Palpacion">Palpación</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="small fw-bold">Observaciones</label>
                <textarea 
                  className="form-control" 
                  value={form.observaciones} 
                  onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
                ></textarea>
              </div>
              <button className="btn btn-danger w-100 fw-bold">GUARDAR</button>
            </form>
          </div>
        </div>

        {/* PANEL TABLA */}
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <h5 className="text-secondary fw-bold mb-3">Historial y Proyecciones</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Chapeta</th>
                    <th>Fecha</th>
                    <th>Evento</th>
                    <th>Proyecciones</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h) => {
                    const esServicio = h.tipoEvento === 'Inseminacion' || h.tipoEvento === 'Monta Natural';
                    const vaca = animales.find((a) => a.id === h.idAnimal);
                    return (
                      <tr key={h.idEvento}>
                        <td className="fw-bold text-danger">
                          {vaca ? vaca.chapeta : `ID: ${h.idAnimal}`}
                        </td>
                        <td className="small">{h.fecha}</td>
                        <td>
                          <span className={`badge ${esServicio ? 'bg-primary' : 'bg-info text-dark'}`}>
                            {h.tipoEvento}
                          </span>
                        </td>
                        <td>
                          {esServicio ? (
                            <div className="p-2 bg-light border-start border-3 border-danger shadow-sm small">
                              <div><strong>Secado:</strong> {calcularProyeccion(h.fecha, 7)}</div>
                              <div className="text-success"><strong>Parto:</strong> {calcularProyeccion(h.fecha, 9)}</div>
                            </div>
                          ) : (
                            <span className="text-muted small">---</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}