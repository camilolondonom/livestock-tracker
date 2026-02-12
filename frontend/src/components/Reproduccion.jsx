import React, { useState, useEffect } from 'react';

export default function Reproduccion({ user }) {
  const [animales, setAnimales] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [form, setForm] = useState({
    idAnimal: '',
    tipoEvento: 'Celo',
    fecha: new Date().toISOString().split('T')[0],
    observaciones: '',
    idUsuario: user?.idUsuario || null
  });

  // 1. Cargar Datos (Animales para el select e Historial para la tabla)
  const cargarDatos = async () => {
    try {
      const [resA, resH] = await Promise.all([
        fetch('http://localhost:8080/api/reproduccion/aptos'),
        fetch('http://localhost:8080/api/reproduccion/historial')
      ]);
      const dataA = await resA.json();
      const dataH = await resH.json();
      setAnimales(dataA);
      setHistorial(dataH);
    } catch (err) {
      console.error("Error al sincronizar con el servidor:", err);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  // 2. Guardar el evento en la BD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/reproduccion/evento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Evento reproductivo guardado con éxito");
        setForm({ ...form, idAnimal: '', observaciones: '' }); // Limpiar campos clave
        cargarDatos(); // Refrescar la tabla
      }
    } catch (err) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="row g-4">
      {/* FORMULARIO DE REGISTRO */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-danger fw-bold mb-3">🧬 Nueva Novedad</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="small fw-bold">Vaca</label>
              <select className="form-select" value={form.idAnimal} 
                onChange={e => setForm({...form, idAnimal: e.target.value})} required>
                <option value="">Seleccione un animal...</option>
                {animales.map(a => (
                  <option key={a.id} value={a.id}>{a.chapeta} - {a.nombre}</option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="small fw-bold">Fecha</label>
              <input type="date" className="form-control" value={form.fecha}
                onChange={e => setForm({...form, fecha: e.target.value})} required />
            </div>

            <div className="mb-2">
              <label className="small fw-bold">Evento</label>
              <select className="form-select" value={form.tipoEvento}
                onChange={e => setForm({...form, tipoEvento: e.target.value})}>
                <option value="Parto">Parto</option>
                <option value="Celo">Celo</option>
                <option value="Inseminacion">Inseminación</option>
                <option value="Palpacion">Palpación/Confirmación</option>
                <option value="Secado">Secado</option>
                <option value="Aborto">Aborto</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="small fw-bold">Observaciones</label>
              <textarea className="form-control" rows="2" placeholder="Ej: Inseminada con toro Holstein..."
                value={form.observaciones} onChange={e => setForm({...form, observaciones: e.target.value})}></textarea>
            </div>

            <button className="btn btn-danger w-100 fw-bold shadow-sm">GUARDAR EVENTO</button>
          </form>
        </div>
      </div>

      {/* TABLA DE HISTORIAL */}
      <div className="col-md-8">
        <div className="card shadow-sm border-0 p-4">
          <h5 className="text-secondary fw-bold mb-3">Historial Reproductivo</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Vaca (ID)</th>
                  <th>Fecha</th>
                  <th>Evento</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {historial.length > 0 ? historial.map((h) => (
                  <tr key={h.idEvento}>
                    <td className="fw-bold text-danger">Animal #{h.idAnimal}</td>
                    <td>{h.fecha}</td>
                    <td>
                      <span className={`badge ${h.tipoEvento === 'Parto' ? 'bg-success' : 'bg-info text-dark'}`}>
                        {h.tipoEvento}
                      </span>
                    </td>
                    <td className="small">{h.observaciones}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center text-muted">No hay eventos registrados aún</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}