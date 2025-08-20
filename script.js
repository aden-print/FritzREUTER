document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // MODAL DE COMPRA
  // ======================
  const modal = document.getElementById("modal-compra");
  const cerrarModal = document.querySelector(".cerrar");
  const productoSeleccionado = document.getElementById("producto-seleccionado");
  const formCompra = document.getElementById("form-compra");
  const mensajeExito = document.getElementById("mensaje-exito");
  const btnWhatsapp = document.getElementById("btn-whatsapp");

  // ✅ Delegación de eventos en contenedor (funciona con productos dinámicos)
  const contenedorProductos = document.getElementById("lista-productos") || document;
  contenedorProductos.addEventListener("click", e => {
    if (e.target.classList.contains("btn-comprar")) {
      const producto = e.target.closest(".producto");
      const nombre = producto.dataset.nombre || producto.querySelector("h3").textContent;
      const precio = producto.dataset.precio || producto.querySelector("p").textContent.replace("S/.", "").trim();

      productoSeleccionado.value = `${nombre} - S/.${precio}`;
      mensajeExito.style.display = "none";
      formCompra.style.display = "block";
      modal.style.display = "flex";
    }
  });

  // Botón cerrar modal
  if (cerrarModal) {
    cerrarModal.addEventListener("click", () => {
      modal.style.display = "none";
      formCompra.reset();
    });
  }
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      formCompra.reset();
    }
  });

  if (formCompra) {
    formCompra.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const direccion = document.getElementById("direccion").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const metodo = document.getElementById("metodo").value;
      const producto = productoSeleccionado.value;

      const ahora = new Date();
      const fecha = ahora.toLocaleDateString("es-PE");
      const hora = ahora.toLocaleTimeString("es-PE");

      const mensaje =
`*Nuevo pedido*
------------------------------
Fecha: ${fecha}
Hora: ${hora}
Nombre: ${nombre}
Producto: ${producto}
Dirección: ${direccion}
Teléfono: ${telefono}
Método de pago: ${metodo}
------------------------------
Por favor confirmar disponibilidad.`;

      btnWhatsapp.href = `https://wa.me/51910082285?text=${encodeURIComponent(mensaje)}`;

      formCompra.style.display = "none";
      mensajeExito.style.display = "block";
      setTimeout(() => formCompra.reset(), 500);
    });
  }

  // ======================
  // FUNCIONES AUXILIARES
  // ======================
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

  // Detectar página
  if(document.getElementById("catalogo-precios")){
    ordenarCatalogo("catalogo-precios","ordenar-precios","precio");
    if(document.getElementById("filtro-marca")) filtrarCatalogo("catalogo-precios","filtro-marca","marca");
    if(document.getElementById("tipo-flor")) filtrarCatalogo("catalogo-precios","tipo-flor","marca");
  }
  if(document.getElementById("catalogo") && document.getElementById("ordenar")){
    ordenarCatalogo("catalogo","ordenar","nombre");
  }
  if(document.getElementById("catalogo-accesorios") && document.getElementById("ordenar-accesorios")){
    ordenarCatalogo("catalogo-accesorios","ordenar-accesorios","precio");
  }

  // ======================
  // MODAL ACCESORIOS
  // ======================
  const modalAccesorios = document.getElementById("modal-accesorios");
  const cerrarAccesorios = document.querySelector(".cerrar-accesorios");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalAccesorios = document.getElementById("total-accesorios");
  const finalizarAccesorios = document.getElementById("finalizar-accesorios");
  let total = 0;

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

  if (finalizarAccesorios) {
    finalizarAccesorios.addEventListener("click", () => {
      modalAccesorios.style.display = "none";
      modal.style.display = "flex";
    });
  }

  // ======================
  // LOGIN
  // ======================
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "admin@fritz.com" && password === "admin123") {
        localStorage.setItem("usuarioLogeado", JSON.stringify({ email, rol: "admin" }));
        window.location.href = "administrador/admin.html";
        return;
      }

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

  // ======================
  // REGISTRO
  // ======================
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
      if (usuarios.find(u => u.email === email)) {
        alert("❌ Este correo ya está registrado");
        return;
      }

      usuarios.push({ nombre, email, password, rol: "usuario" });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

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

  // ======================
  // RENDER CATALOGO DESDE LOCALSTORAGE
  // ======================
  const contenedor = document.getElementById("catalogo-arreglo");
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  if (contenedor) {
    const arreglos = productos.filter(p => p.categoria.toLowerCase() === "arreglos");
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

  // ======================
  // SLIDER AUTOMÁTICO
  // ======================
  const slides = document.querySelector(".slides");
  const images = document.querySelectorAll(".slides img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (slides && images.length > 0) {
    let index = 0;
    let autoPlay;
    function showSlide(i) {
      if (i >= images.length) index = 0;
      else if (i < 0) index = images.length - 1;
      else index = i;
      slides.style.transform = `translateX(${-index * 100}%)`;
    }
    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }
    function resetInterval() {
      clearInterval(autoPlay);
      autoPlay = setInterval(nextSlide, 3200);
    }
    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
    resetInterval();
  }

  // ======================
  // SCROLL ANIMADO
  // ======================
  const enlaces = document.querySelectorAll(".btn-scroll");
  enlaces.forEach(enlace => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("href");
      const destino = document.querySelector(id);
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});
