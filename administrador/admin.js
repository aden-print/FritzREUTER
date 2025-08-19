// ----------------------
// Verificación de acceso
// ----------------------
const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
if (!usuario || usuario.rol !== "admin") {
  alert("Acceso no autorizado");
  window.location.href = "../login.html";
}

// ----------------------
// Función de cerrar sesión
// ----------------------
function cerrarSesion() {
  localStorage.removeItem("usuarioLogeado");
  window.location.href = "../login.html";
}

// ----------------------
// Datos por defecto
// ----------------------
const productosPorDefecto = [
  { id: 1, nombre: "Juego de Asas", precio: 215, categoria: "Accesorios", stock: 10 },
  { id: 2, nombre: "Placa de Ataúd", precio: 236.45, categoria: "Accesorios", stock: 10 },
  { id: 3, nombre: "Juego de Manijas", precio: 251, categoria: "Accesorios", stock: 10 },
  { id: 4, nombre: "Cerraduras", precio: 29.13, categoria: "Accesorios", stock: 10 },
  { id: 5, nombre: "Cruz de Madera", precio: 120, categoria: "Accesorios", stock: 10 },
  { id: 6, nombre: "Urna de Mármol", precio: 180, categoria: "Accesorios", stock: 10 },
  { id: 7, nombre: "Cojín Funerario", precio: 95, categoria: "Accesorios", stock: 10 },
  { id: 8, nombre: "Crucifijo Metálico", precio: 150, categoria: "Accesorios", stock: 10 },
  { id: 9, nombre: "Velero Doble", precio: 80, categoria: "Accesorios", stock: 10 },
  { id: 10, nombre: "Urna de Cristal", precio: 310, categoria: "Accesorios", stock: 10 },
  { id: 11, nombre: "Lámpara de Velación", precio: 70, categoria: "Accesorios", stock: 10 },
  { id: 12, nombre: "Cinta con Dedicatoria", precio: 60, categoria: "Accesorios", stock: 10 },

  { id: 101, nombre: "Ataúd Emporium Calibre 18", precio: 5814.57, categoria: "Ataúdes", stock: 5 },
  { id: 102, nombre: "Ataúd Plateado Slim", precio: 3277.30, categoria: "Ataúdes", stock: 5 },
  { id: 103, nombre: "Ataúd Emporium Deluxe", precio: 4200.00, categoria: "Ataúdes", stock: 5 },
  { id: 104, nombre: "Ataúd Plateado Básico", precio: 2100.50, categoria: "Ataúdes", stock: 5 },
  { id: 105, nombre: "Ataúd Emporium Elegance", precio: 3500.00, categoria: "Ataúdes", stock: 5 },
  { id: 106, nombre: "Ataúd Plateado Premium", precio: 2800.00, categoria: "Ataúdes", stock: 5 },
  { id: 107, nombre: "Ataúd Emporium Royal", precio: 6000.00, categoria: "Ataúdes", stock: 5 },
  { id: 108, nombre: "Ataúd Plateado Económico", precio: 2500.00, categoria: "Ataúdes", stock: 5 },
  { id: 109, nombre: "Ataúd Emporium Clásico", precio: 4800.00, categoria: "Ataúdes", stock: 5 },

  { id: 201, nombre: "Rosas Blancas Elegantes", precio: 120, categoria: "Arreglos Florales", stock: 15 },
  { id: 202, nombre: "Lirios y Rosas", precio: 150, categoria: "Arreglos Florales", stock: 15 },
  { id: 203, nombre: "Orquídeas Selectas", precio: 200, categoria: "Arreglos Florales", stock: 15 },
  { id: 204, nombre: "Rosas Rojas Premium", precio: 180, categoria: "Arreglos Florales", stock: 15 },
  { id: 205, nombre: "Lirios Blancos", precio: 140, categoria: "Arreglos Florales", stock: 15 },
  { id: 206, nombre: "Orquídeas Rosadas", precio: 220, categoria: "Arreglos Florales", stock: 15 }
];

const usuariosPorDefecto = [
  { id: 1, nombre: "Admin", email: "admin@correo.com", rol: "admin" },
  { id: 2, nombre: "Usuario Demo", email: "demo@correo.com", rol: "cliente" },
];

const pedidosPorDefecto = [
  { id: 1, cliente: "Usuario Demo", producto: "Collar artesanal", cantidad: 1, total: 25, estado: "Pendiente" },
];

// ----------------------
// Inicializar datos
// ----------------------
function inicializarProductos() {
  if (!localStorage.getItem("productos")) {
    if (window.productos && Array.isArray(window.productos) && window.productos.length > 0) {
      localStorage.setItem("productos", JSON.stringify(window.productos));
    } else {
      localStorage.setItem("productos", JSON.stringify(productosPorDefecto));
    }
  }
}

function inicializarUsuarios() {
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(usuariosPorDefecto));
  }
}

function inicializarPedidos() {
  if (!localStorage.getItem("pedidos")) {
    localStorage.setItem("pedidos", JSON.stringify(pedidosPorDefecto));
  }
}

// ----------------------
// Actualizar contadores
// ----------------------
function actualizarContadores() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  const productosCount = document.getElementById("total-productos") || document.getElementById("productos-count");
  const usuariosCount = document.getElementById("total-usuarios") || document.getElementById("usuarios-count");
  const pedidosCount = document.getElementById("total-pedidos") || document.getElementById("pedidos-count");

  if (productosCount) productosCount.textContent = productos.length;
  if (usuariosCount) usuariosCount.textContent = usuarios.length;
  if (pedidosCount) pedidosCount.textContent = pedidos.length;
}

// ----------------------
// DOMContentLoaded
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Botón cerrar sesión
  const btnCerrar = document.getElementById("btn-cerrar-sesion");
  const btnLogout = document.getElementById("btn-logout");
  if (btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);
  if (btnLogout) btnLogout.addEventListener("click", cerrarSesion);

  // Menú hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".admin-sidebar");
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // Inicializar datos
  inicializarProductos();
  inicializarUsuarios();
  inicializarPedidos();

  // Actualizar dashboard
  actualizarContadores();

  // 👥 Usuarios
  if (window.location.pathname.includes("usuarios.html")) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const tablaUsuarios = document.getElementById("tabla-usuarios");

    if (tablaUsuarios) {
      if (usuarios.length === 0) {
        tablaUsuarios.innerHTML = `<tr><td colspan="5">No hay usuarios registrados</td></tr>`;
      } else {
        usuarios.forEach((user, index) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.rol}</td>
            <td>
              <button class="btn-secundario btn-editar" data-index="${index}">Editar</button>
              <button class="btn-principal btn-eliminar" data-index="${index}">Eliminar</button>
            </td>`;
          tablaUsuarios.appendChild(tr);
        });

        // Eventos Editar
        document.querySelectorAll(".btn-editar").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios[index];

            const nuevoNombre = prompt("Editar nombre:", usuario.nombre);
            const nuevoEmail = prompt("Editar email:", usuario.email);
            const nuevoRol = prompt("Editar rol:", usuario.rol);

            if (nuevoNombre && nuevoEmail && nuevoRol) {
              usuarios[index] = { nombre: nuevoNombre, email: nuevoEmail, rol: nuevoRol };
              localStorage.setItem("usuarios", JSON.stringify(usuarios));
              location.reload();
            }
          });
        });

        // Eventos Eliminar
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            if (confirm("¿Seguro que deseas eliminar este usuario?")) {
              usuarios.splice(index, 1);
              localStorage.setItem("usuarios", JSON.stringify(usuarios));
              location.reload();
            }
          });
        });
      }
    }
  }

  // 📦 Productos
  if (window.location.pathname.includes("productos.html")) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const tablaProductos = document.getElementById("tabla-productos");

    if (tablaProductos) {
      if (productos.length === 0) {
        tablaProductos.innerHTML = `<tr><td colspan="6">No hay productos registrados</td></tr>`;
      } else {
        productos.forEach((prod, index) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${prod.nombre}</td>
            <td>S/ ${prod.precio}</td>
            <td>${prod.categoria}</td>
            <td>${prod.stock}</td>
            <td>
              <button class="btn-secundario btn-editar" data-index="${index}">Editar</button>
              <button class="btn-principal btn-eliminar" data-index="${index}">Eliminar</button>
            </td>`;
          tablaProductos.appendChild(tr);
        });

        // Editar producto
        document.querySelectorAll(".btn-editar").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const productos = JSON.parse(localStorage.getItem("productos")) || [];
            const prod = productos[index];

            const nuevoNombre = prompt("Editar nombre:", prod.nombre);
            const nuevoPrecio = prompt("Editar precio:", prod.precio);
            const nuevaCategoria = prompt("Editar categoría:", prod.categoria);
            const nuevoStock = prompt("Editar stock:", prod.stock);

            if (nuevoNombre && nuevoPrecio && nuevaCategoria && nuevoStock) {
              productos[index] = { 
                nombre: nuevoNombre, 
                precio: parseFloat(nuevoPrecio), 
                categoria: nuevaCategoria, 
                stock: parseInt(nuevoStock) 
              };
              localStorage.setItem("productos", JSON.stringify(productos));
              location.reload();
            }
          });
        });

        // Eliminar producto
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            let productos = JSON.parse(localStorage.getItem("productos")) || [];

            if (confirm("¿Seguro que deseas eliminar este producto?")) {
              productos.splice(index, 1);
              localStorage.setItem("productos", JSON.stringify(productos));
              location.reload();
            }
          });
        });
      }
    }
  }

  // 🛒 Pedidos
  if (window.location.pathname.includes("pedidos.html")) {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const tablaPedidos = document.getElementById("tabla-pedidos");

    if (tablaPedidos) {
      if (pedidos.length === 0) {
        tablaPedidos.innerHTML = `<tr><td colspan="7">No hay pedidos registrados</td></tr>`;
      } else {
        pedidos.forEach((pedido, index) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.producto}</td>
            <td>${pedido.cantidad}</td>
            <td>S/ ${pedido.total}</td>
            <td>
              <select data-index="${index}" class="estado-select">
                <option ${pedido.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                <option ${pedido.estado === "Completado" ? "selected" : ""}>Completado</option>
                <option ${pedido.estado === "Cancelado" ? "selected" : ""}>Cancelado</option>
              </select>
            </td>
            <td>
              <button class="btn-secundario btn-ver" data-index="${index}">Ver</button>
              <button class="btn-principal btn-eliminar" data-index="${index}">Eliminar</button>
            </td>`;
          tablaPedidos.appendChild(tr);
        });

        // Cambiar estado
        document.querySelectorAll(".estado-select").forEach(select => {
          select.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
            pedidos[index].estado = e.target.value;
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
          });
        });

        // Eliminar pedido
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

            if (confirm("¿Seguro que deseas eliminar este pedido?")) {
              pedidos.splice(index, 1);
              localStorage.setItem("pedidos", JSON.stringify(pedidos));
              location.reload();
            }
          });
        });

        // Ver pedido
        document.querySelectorAll(".btn-ver").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
            const pedido = pedidos[index];
            alert(`Cliente: ${pedido.cliente}\nProducto: ${pedido.producto}\nCantidad: ${pedido.cantidad}\nTotal: S/ ${pedido.total}\nEstado: ${pedido.estado}`);
          });
        });
      }
    }
  }
});
// 📌 Agregar nuevo producto desde el formulario
const formAgregar = document.getElementById("form-agregar-producto");
if (formAgregar) {
  formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const categoria = document.getElementById("categoria").value;
    const stock = parseInt(document.getElementById("stock").value);
    const imagenInput = document.getElementById("imagen");

    // Manejo de imagen (guardar como Base64 en localStorage)
    const reader = new FileReader();
    reader.onload = function(event) {
      const imagen = event.target.result;

      // Recuperar productos existentes
      let productos = JSON.parse(localStorage.getItem("productos")) || [];

      // Crear nuevo producto
      const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        categoria,
        stock,
        imagen
      };

      // Guardar en localStorage
      productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(productos));

      alert("✅ Producto agregado correctamente");
      formAgregar.reset();
      location.reload(); // refresca la tabla en admin
    };

    if (imagenInput.files.length > 0) {
      reader.readAsDataURL(imagenInput.files[0]);
    } else {
      alert("Por favor selecciona una imagen");
    }
  });
}
