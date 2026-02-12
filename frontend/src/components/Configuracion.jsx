import React from 'react';

export default function Configuracion() {
  return (
    <div className="card shadow-sm border-0 p-4">
      <h5>⚙️ Configuración del Sistema</h5>
      <hr />
      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="notif" defaultChecked />
        <label className="form-check-label" htmlFor="notif">Activar notificaciones de partos próximos</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Unidad de Medida (Leche)</label>
        <select className="form-select w-25">
          <option>Litros (Lts)</option>
          <option>Kilogramos (Kg)</option>
        </select>
      </div>
    </div>
  );
}