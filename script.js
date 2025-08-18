document.addEventListener("DOMContentLoaded", () => {

  // ----------------------
  // MODAL DE COMPRA
  // ----------------------
  const modal = document.getElementById("modal-compra");
  const cerrarModal = document.querySelector(".cerrar");
  const btnComprar = document.querySelectorAll(".btn-comprar");
  const productoInput = document.getElementById("producto-seleccionado");
  const formCompra = document.getElementById("form-compra");
  const mensajeExito = document.getElementById("mensaje-exito");
  const btnWhatsapp = document.getElementById("btn-whatsapp");

  btnComprar.forEach(btn => {
    btn.addEventListener("click", e => {
      const producto = e.target.closest(".producto").querySelector("h3").textContent;
      productoInput.value = producto;
      mensajeExito.style.display = "none";
      formCompra.style.display = "block";
      modal.style.display = "flex";
    });
  });

  if(cerrarModal) cerrarModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

  if(formCompra){
    formCompra.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value;
      const direccion = document.getElementById("direccion").value;
      const telefono = document.getElementById("telefono").value;
      const metodo = document.getElementById("metodo").value;
      const producto = productoInput.value;

      btnWhatsapp.href = `https://wa.me/51910082285?text=${encodeURIComponent(
        `Hola, quiero comprar:\nProducto: ${producto}\nNombre: ${nombre}\nDirección: ${direccion}\nTeléfono: ${telefono}\nMétodo de pago: ${metodo}`
      )}`;

      formCompra.style.display = "none";
      mensajeExito.style.display = "block";
      formCompra.reset();
    });
  }

  // ----------------------
  // FUNCIONES AUXILIARES
  // ----------------------
  const getPrecio = art => parseFloat(art.dataset.precio) || 0;
  const getNombre = art => art.querySelector("h3")?.textContent.trim().toLowerCase() || "";

  function ordenarCatalogo(catalogoId, selectId, tipo="precio"){
    const catalogo = document.getElementById(catalogoId);
    const select = document.getElementById(selectId);
    if(!catalogo || !select) return;

    const ordenar = () => {
      const productos = Array.from(catalogo.querySelectorAll(".producto"));
      const modo = select.value;

      productos.sort((a,b) => {
        if(tipo==="precio"){
          if(modo==="asc") return getPrecio(a) - getPrecio(b);
          if(modo==="desc") return getPrecio(b) - getPrecio(a);
          if(modo==="nombre") return getNombre(a).localeCompare(getNombre(b));
        } else if(tipo==="nombre"){
          return getNombre(a).localeCompare(getNombre(b));
        }
        return 0;
      }).forEach(prod => catalogo.appendChild(prod));
    };

    select.addEventListener("change", ordenar);
    ordenar();
  }

  function filtrarCatalogo(catalogoId, filtroId, dataAttr){
    const catalogo = document.getElementById(catalogoId);
    const filtro = document.getElementById(filtroId);
    if(!catalogo || !filtro) return;

    filtro.addEventListener("change", () => {
      const valor = filtro.value;
      catalogo.querySelectorAll(".producto").forEach(prod => {
        prod.style.display = (valor==="todos" || prod.dataset[dataAttr]===valor) ? "" : "none";
      });
    });
  }

  // ----------------------
  // DETECTAR Y EJECUTAR SEGÚN PÁGINA
  // ----------------------
  // Precios y Arreglos Florales
  if(document.getElementById("catalogo-precios")){
    ordenarCatalogo("catalogo-precios","ordenar-precios","precio");
    // Detectar si hay filtro (marca o tipo de flor)
    if(document.getElementById("filtro-marca")) filtrarCatalogo("catalogo-precios","filtro-marca","marca");
    if(document.getElementById("tipo-flor")) filtrarCatalogo("catalogo-precios","tipo-flor","marca");
  }

  // Accesorios
  if(document.getElementById("catalogo") && document.getElementById("ordenar")){
    ordenarCatalogo("catalogo","ordenar","nombre");
  }



});
// Modal de accesorios
const modalAccesorios = document.getElementById("modal-accesorios");
const btnVerMas = document.querySelector("article.producto button.btn-comprar"); 
const cerrarAccesorios = document.querySelector(".cerrar-accesorios");

const listaCarrito = document.getElementById("lista-carrito");
const totalAccesorios = document.getElementById("total-accesorios");

let total = 0;

// Abrir modal de accesorios (cuando sea "Ver más")
btnVerMas.addEventListener("click", function(e) {
  if (e.target.textContent === "Ver más") {
    modalAccesorios.style.display = "block";
  }
});

// Cerrar modal de accesorios
cerrarAccesorios.addEventListener("click", () => {
  modalAccesorios.style.display = "none";
});

// Agregar producto al carrito
document.querySelectorAll(".btn-agregar").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const nombre = item.querySelector("h3").textContent;
    const precio = parseInt(item.querySelector("p").textContent.replace("S/.", ""));

    // Crear item en carrito
    const li = document.createElement("li");
    li.textContent = `${nombre} - S/.${precio}`;
    
    // Botón quitar
    const btnQuitar = document.createElement("button");
    btnQuitar.textContent = "Quitar";
    btnQuitar.style.marginLeft = "10px";
    btnQuitar.addEventListener("click", () => {
      total -= precio;
      totalAccesorios.textContent = total;
      li.remove();
    });

    li.appendChild(btnQuitar);
    listaCarrito.appendChild(li);

    // Sumar total
    total += precio;
    totalAccesorios.textContent = total;
  });
});

// Finalizar compra accesorios
document.getElementById("finalizar-accesorios").addEventListener("click", () => {
  modalAccesorios.style.display = "none";
  document.getElementById("modal-compra").style.display = "block";
});
// Al abrir el formulario de compra
document.addEventListener("DOMContentLoaded", () => {
  const personalizado = localStorage.getItem("seleccionPersonalizada");
  if (personalizado) {
    document.getElementById("producto-seleccionado").value = personalizado;
    localStorage.removeItem("seleccionPersonalizada"); // limpiar después
  }
});
