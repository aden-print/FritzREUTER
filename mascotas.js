function abrirModal(opcion) {
  const modal = document.getElementById("modalMascotas");
  const info = document.getElementById("modalInfo");

  let contenido = "";

  switch (opcion) {
    case "funeral":
      contenido = `
        <h2>Funeral para Perros</h2>
        <p>Incluye servicio de recogida, ceremonia y acompañamiento especial.</p>
        <button onclick="alert('Has adquirido: Funeral para perros')">Adquirir</button>
      `;
      break;
    case "urnas":
      contenido = `
        <h2>Urnas Personalizadas</h2>
        <p>Elige entre una variedad de urnas con grabados únicos.</p>
        <button onclick="alert('Has adquirido: Urna personalizada')">Comprar</button>
      `;
      break;
    case "recordatorios":
      contenido = `
        <h2>Recordatorios Digitales</h2>
        <p>Crea un perfil digital para recordar a tu mascota con fotos y mensajes.</p>
        <button onclick="alert('Has adquirido: Recordatorio digital')">Crear</button>
      `;
      break;
  }

  info.innerHTML = contenido;
  modal.style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalMascotas").style.display = "none";
}

// Cerrar modal clic fuera
window.onclick = function(event) {
  const modal = document.getElementById("modalMascotas");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
