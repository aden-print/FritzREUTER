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
// Productos por defecto
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

// ----------------------
// Inicializar productos
// ----------------------
function inicializarProductos() {
  const productosGuardados = JSON.parse(localStorage.getItem("productos"));
  if (!productosGuardados || productosGuardados.length === 0) {
    localStorage.setItem("productos", JSON.stringify(productosPorDefecto));
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
// Agregar producto dinámicamente
// ----------------------
function agregarProducto(nuevoProducto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productos));
  actualizarContadores();
}

// ----------------------
// DOMContentLoaded
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnCerrar = document.getElementById("btn-cerrar-sesion");
  const btnLogout = document.getElementById("btn-logout");

  if (btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);
  if (btnLogout) btnLogout.addEventListener("click", cerrarSesion);

  // Botón hamburguesa
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".admin-sidebar");
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // Inicializar productos solo si no existen
  inicializarProductos();

  // Actualizar dashboard
  actualizarContadores();

  // ----------------------
  // Usuarios
  // ----------------------
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
            <td>${user.nombre || "Sin nombre"}</td>
            <td>${user.email}</td>
            <td>${user.rol}</td>
            <td>
              <button class="btn-secundario">Editar</button>
              <button class="btn-principal">Eliminar</button>
            </td>
          `;
          tablaUsuarios.appendChild(tr);
        });
      }
    }
  }

  // ----------------------
  // Productos
  // ----------------------
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
              <button class="btn-secundario">Editar</button>
              <button class="btn-principal">Eliminar</button>
            </td>
          `;
          tablaProductos.appendChild(tr);
        });
      }
    }
  }

  // ----------------------
  // Pedidos
  // ----------------------
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
              <select>
                <option ${pedido.estado === "Pendiente" ? "selected" : ""}>Pendiente</option>
                <option ${pedido.estado === "Completado" ? "selected" : ""}>Completado</option>
                <option ${pedido.estado === "Cancelado" ? "selected" : ""}>Cancelado</option>
              </select>
            </td>
            <td>
              <button class="btn-secundario">Ver</button>
              <button class="btn-principal">Eliminar</button>
            </td>
          `;
          tablaPedidos.appendChild(tr);
        });
      }
    }
  }

  // ----------------------
  // Configuración
  // ----------------------
  if (window.location.pathname.includes("configuracion.html")) {
    const form = document.getElementById("form-configuracion");
    const config = JSON.parse(localStorage.getItem("configuracion")) || {};

    if (form) {
      document.getElementById("nombre-empresa").value = config.nombreEmpresa || "";
      document.getElementById("email-contacto").value = config.emailContacto || "";
      document.getElementById("telefono-contacto").value = config.telefonoContacto || "";
      document.getElementById("direccion").value = config.direccion || "";
      document.getElementById("moneda").value = config.moneda || "PEN";

      form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nuevaConfig = {
          nombreEmpresa: document.getElementById("nombre-empresa").value,
          emailContacto: document.getElementById("email-contacto").value,
          telefonoContacto: document.getElementById("telefono-contacto").value,
          direccion: document.getElementById("direccion").value,
          moneda: document.getElementById("moneda").value,
        };

        localStorage.setItem("configuracion", JSON.stringify(nuevaConfig));
        alert("Configuración guardada correctamente ✅");
      });
    }
  }
});
