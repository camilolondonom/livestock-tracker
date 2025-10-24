// ===========================
// Archivo: main.js
// ===========================

// Mostrar alerta de confirmación al enviar formularios
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      const confirmed = confirm('¿Estás seguro de guardar los cambios?');
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });
});

// Mostrar mensaje de éxito simulado al guardar
function mostrarMensajeExito(texto = 'Cambios guardados correctamente') {
  const mensaje = document.createElement('div');
  mensaje.textContent = texto;
  mensaje.style.backgroundColor = '#e8d62e';
  mensaje.style.padding = '1rem';
  mensaje.style.margin = '1rem auto';
  mensaje.style.borderRadius = '8px';
  mensaje.style.textAlign = 'center';
  mensaje.style.color = '#3d4d29';
  mensaje.style.fontWeight = 'bold';
  document.body.prepend(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}
