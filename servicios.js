document.addEventListener("DOMContentLoaded", () => {
  // ----------------------
  // ELEMENTOS DEL MODAL
  // ----------------------
  const modal = document.getElementById("modal-plan");
  const cerrarModal = modal.querySelector(".cerrar-plan"); 
  const listaServicios = document.getElementById("lista-servicios");
  const tituloPlan = document.getElementById("titulo-plan");
  const nuevoServicioInput = document.getElementById("nuevo-servicio");
  const btnAgregar = document.getElementById("agregar-servicio");
  const formPlan = document.getElementById("form-plan");
  const mensajeExito = document.getElementById("mensaje-exito");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const btnPagar = document.getElementById("btn-pagar");

  let serviciosActuales = [];

  // ----------------------
  // ABRIR MODAL DESDE BOTONES DE SERVICIOS
  // ----------------------
  document.querySelectorAll(".btn-personalizar").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".card");
      const plan = card.dataset.plan;

      tituloPlan.textContent = `Personalizar ${plan}`;
      serviciosActuales = Array.from(card.querySelectorAll("ul li")).map(li => li.textContent);

      renderizarServicios();
      nuevoServicioInput.value = "";
      formPlan.style.display = "block";
      mensajeExito.style.display = "none";
      modal.style.display = "flex";
    });
  });

  // ----------------------
  // ABRIR MODAL DESDE PLAN PERSONALIZADO (personalizar.html)
  // ----------------------
  const params = new URLSearchParams(window.location.search);
  if (params.get("plan") === "Personalizado") {
    const seleccion = JSON.parse(localStorage.getItem("seleccionPersonalizada")) || {};

    tituloPlan.textContent = "Plan Personalizado";
    serviciosActuales = [
      `Ataúd: ${seleccion.ataud || "No seleccionado"}`,
      `Carro: ${seleccion.carro || "No seleccionado"}`,
      `Arreglo Floral: ${seleccion.floral || "No seleccionado"}`
    ];

    renderizarServicios();
    nuevoServicioInput.value = "";
    formPlan.style.display = "block";
    mensajeExito.style.display = "none";
    modal.style.display = "flex";
  }

  // ----------------------
  // CERRAR MODAL
  // ----------------------
  if (cerrarModal) {
    cerrarModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ----------------------
  // RENDERIZAR LISTA DE SERVICIOS
  // ----------------------
  function renderizarServicios() {
    listaServicios.innerHTML = "";
    serviciosActuales.forEach((servicio, index) => {
      const li = document.createElement("li");
      li.textContent = servicio;

      const btnQuitar = document.createElement("button");
      btnQuitar.textContent = "❌";
      btnQuitar.classList.add("btn-quitar");
      btnQuitar.addEventListener("click", () => {
        serviciosActuales.splice(index, 1);
        renderizarServicios();
      });

      li.appendChild(btnQuitar);
      listaServicios.appendChild(li);
    });
  }

  // ----------------------
  // AGREGAR SERVICIO NUEVO
  // ----------------------
  btnAgregar.addEventListener("click", () => {
    const nuevo = nuevoServicioInput.value.trim();
    if (nuevo) {
      serviciosActuales.push(nuevo);
      renderizarServicios();
      nuevoServicioInput.value = "";
    }
  });

  // ----------------------
  // ENVIAR DATOS POR WHATSAPP
  // ----------------------
  formPlan.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const metodo = document.getElementById("metodo").value;
    const plan = tituloPlan.textContent.replace("Personalizar ", "");

    const mensaje = `Hola, quiero contratar:\nPlan: ${plan}\nServicios: ${serviciosActuales.join(", ")}\nNombre: ${nombre}\nTeléfono: ${telefono}\nMétodo de pago: ${metodo}`;

    btnWhatsapp.href = `https://wa.me/51910082285?text=${encodeURIComponent(mensaje)}`;

    formPlan.style.display = "none";
    mensajeExito.style.display = "block";
    formPlan.reset();

    // Si usas bootstrap para modal de pago
    if (btnPagar) {
      const modalPago = new bootstrap.Modal(document.getElementById("modalPago"));
      modalPago.show();
    }
  });

});
