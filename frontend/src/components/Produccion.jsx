import React, { useState, useEffect } from 'react';

export default function Produccion({ user }) {
  const [animales, setAnimales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({
    chapeta: '',
    fecha: '',
    lecheManana: '', // Coincide con Java
    lecheTarde: '',  // Coincide con Java
    idUsuario: user?.idUsuario || null // Vinculamos el registro al usuario actual
  });

  const cargarDatos = async () => {
    try {
      const [resAnimales, resProduccion] = await Promise.all([
        fetch('http://localhost:8080/api/animales'),
        fetch('http://localhost:8080/api/produccion')
      ]);
      const dataA = await resAnimales.json();
      const dataP = await resProduccion.json();
      setAnimales(dataA);
      setHistorial(dataP);
    } catch (err) {
      console.error("Error conectando con el servidor:", err);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/produccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        alert("¡Producción de la vaca " + form.chapeta + " guardada!");
        setForm({ ...form, chapeta: '', lecheManana: '', lecheTarde: '' }); 
        cargarDatos(); 
      }
    } catch (err) {
      alert("Error al conectar con el backend");
    }
  };

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-warning fw-bold mb-3">🥛 Registro de Ordeño</h5>
          <form onSubmit={handleGuardar}>
            <label className="small fw-bold">Vaca (Chapeta)</label>
            <select className="form-select mb-2" value={form.chapeta} required
                    onChange={e => setForm({...form, chapeta: e.target.value})}>
              <option value="">Seleccionar...</option>
              {animales.map(a => <option key={a.id} value={a.chapeta}>{a.chapeta} - {a.nombre}</option>)}
            </select>

            <label className="small fw-bold">Fecha</label>
            <input type="date" className="form-control mb-2" value={form.fecha} required
                   onChange={e => setForm({...form, fecha: e.target.value})} />

            <div className="row mb-3">
              <div className="col">
                <label className="small fw-bold">Mañana (Lts)</label>
                <input type="number" step="0.01" className="form-control" value={form.lecheManana} required
                       onChange={e => setForm({...form, lecheManana: e.target.value})} />
              </div>
              <div className="col">
                <label className="small fw-bold">Tarde (Lts)</label>
                <input type="number" step="0.01" className="form-control" value={form.lecheTarde} required
                       onChange={e => setForm({...form, lecheTarde: e.target.value})} />
              </div>
            </div>
            <button className="btn btn-warning w-100 fw-bold shadow-sm">GUARDAR</button>
          </form>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-secondary fw-bold mb-3">Control de Producción</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Vaca</th>
                  <th>Fecha</th>
                  <th>Mañana</th>
                  <th>Tarde</th>
                  <th className="bg-primary">Total</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => (
                  <tr key={h.id_produccion}>
                    <td className="fw-bold">{h.chapeta}</td>
                    <td>{h.fecha}</td>
                    <td>{h.lecheManana} L</td>
                    <td>{h.lecheTarde} L</td>
                    <td className="fw-bold text-primary">
                      {(parseFloat(h.lecheManana) + parseFloat(h.lecheTarde)).toFixed(2)} L
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