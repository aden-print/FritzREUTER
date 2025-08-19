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

  if (btnComprar) {
    btnComprar.forEach(btn => {
      btn.addEventListener("click", e => {
        const producto = e.target.closest(".producto").querySelector("h3").textContent;
        productoInput.value = producto;
        mensajeExito.style.display = "none";
        formCompra.style.display = "block";
        modal.style.display = "flex";
      });
    });
  }

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
  if(document.getElementById("catalogo-precios")){
    ordenarCatalogo("catalogo-precios","ordenar-precios","precio");
    if(document.getElementById("filtro-marca")) filtrarCatalogo("catalogo-precios","filtro-marca","marca");
    if(document.getElementById("tipo-flor")) filtrarCatalogo("catalogo-precios","tipo-flor","marca");
  }

  if(document.getElementById("catalogo") && document.getElementById("ordenar")){
    ordenarCatalogo("catalogo","ordenar","nombre");
  }

  // ----------------------
  // MODAL ACCESORIOS
  // ----------------------
  const modalAccesorios = document.getElementById("modal-accesorios");
  const btnVerMas = document.querySelector("article.producto button.btn-comprar"); 
  const cerrarAccesorios = document.querySelector(".cerrar-accesorios");

  const listaCarrito = document.getElementById("lista-carrito");
  const totalAccesorios = document.getElementById("total-accesorios");

  let total = 0;

  if (btnVerMas) {
    btnVerMas.addEventListener("click", function(e) {
      if (e.target.textContent === "Ver más") {
        modalAccesorios.style.display = "block";
      }
    });
  }

  if (cerrarAccesorios) {
    cerrarAccesorios.addEventListener("click", () => {
      modalAccesorios.style.display = "none";
    });
  }

  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const nombre = item.querySelector("h3").textContent;
      const precio = parseInt(item.querySelector("p").textContent.replace("S/.", ""));

      const li = document.createElement("li");
      li.textContent = `${nombre} - S/.${precio}`;
      
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

      total += precio;
      totalAccesorios.textContent = total;
    });
  });

  const finalizarAccesorios = document.getElementById("finalizar-accesorios");
  if (finalizarAccesorios) {
    finalizarAccesorios.addEventListener("click", () => {
      modalAccesorios.style.display = "none";
      document.getElementById("modal-compra").style.display = "block";
    });
  }

  // ----------------------
  // LOGIN
  // ----------------------
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Cuenta admin fija
      if (email === "admin@fritz.com" && password === "admin123") {
        localStorage.setItem("usuarioLogeado", JSON.stringify({ email, rol: "admin" }));
        window.location.href = "administrador/admin.html";
        return;
      }

      // Buscar en usuarios registrados
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (usuario) {
        localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
        alert("✅ Bienvenido " + usuario.nombre);
        window.location.href = "index.html";
      } else {
        alert("❌ Credenciales incorrectas");
      }
    });
  }

});

//registro

// ----------------------
// REGISTRO
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre   = document.getElementById("nombre").value.trim();
      const email    = document.getElementById("email-registro").value.trim();
      const password = document.getElementById("password-registro").value.trim();
      const confirmar= document.getElementById("confirmar").value.trim();

      if (!nombre || !email || !password || !confirmar) {
        alert("⚠️ Completa todos los campos");
        return;
      }

      if (password !== confirmar) {
        alert("⚠️ Las contraseñas no coinciden");
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const existe = usuarios.find(u => u.email === email);
      if (existe) {
        alert("❌ Este correo ya está registrado");
        return;
      }

      const nuevoUsuario = { nombre, email, password, rol: "usuario" };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Si existe el modal de éxito, lo mostramos; si no, redirigimos con alert.
      const modalExito = document.getElementById("modal-exito");
      if (modalExito) {
        modalExito.style.display = "flex";
        const irLogin = document.getElementById("ir-login");
        if (irLogin) {
          irLogin.addEventListener("click", () => window.location.href = "login.html");
        }
      } else {
        alert("✅ Registro exitoso. Ahora puedes iniciar sesión");
        window.location.href = "login.html";
      }
    });
  }
});
function renderCatalogo() {
  // OJO: ya no limpiamos con innerHTML = ""
  // Dejamos los productos estáticos y solo agregamos los nuevos
  const arreglos = productos.filter(p => p.categoria.toLowerCase() === "arreglos");

  if (arreglos.length === 0) return;

  arreglos.forEach(prod => {
    const card = document.createElement("article");
    card.classList.add("producto");
    card.setAttribute("data-marca", prod.categoria.toLowerCase());
    card.setAttribute("data-precio", prod.precio);
    card.setAttribute("data-nombre", prod.nombre);

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>S/.${prod.precio}</p>
      <button class="btn-comprar">Comprar</button>
    `;

    contenedor.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogo-arreglo");
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  function renderCatalogo() {
    // mantenemos productos estáticos y solo añadimos nuevos
    const arreglos = productos.filter(p => p.categoria.toLowerCase() === "arreglos");
    if (arreglos.length === 0) return;

    arreglos.forEach(prod => {
      const card = document.createElement("article");
      card.classList.add("producto");
      card.setAttribute("data-marca", prod.categoria.toLowerCase());
      card.setAttribute("data-precio", prod.precio);
      card.setAttribute("data-nombre", prod.nombre);

      card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>S/.${prod.precio}</p>
        <button class="btn-comprar">Comprar</button>
      `;

      contenedor.appendChild(card);
    });
  }

  renderCatalogo(); // 👈 aquí se ejecuta
});
