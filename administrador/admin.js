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
// Botones de logout (verificación segura)
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnCerrar = document.getElementById("btn-cerrar-sesion");
  const btnLogout = document.getElementById("btn-logout");

  if (btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);
  if (btnLogout) btnLogout.addEventListener("click", cerrarSesion);

  // ----------------------
  // Botón hamburguesa
  // ----------------------
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".admin-sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // ----------------------
  // Dashboard (contadores)
  // ----------------------
  if (document.getElementById("total-usuarios")) {
    document.getElementById("total-usuarios").textContent =
      JSON.parse(localStorage.getItem("usuarios"))?.length || 0;
  }

  if (document.getElementById("total-productos")) {
    document.getElementById("total-productos").textContent =
      JSON.parse(localStorage.getItem("productos"))?.length || 0;
  }

  if (document.getElementById("total-pedidos")) {
    document.getElementById("total-pedidos").textContent =
      JSON.parse(localStorage.getItem("pedidos"))?.length || 0;
  }

  // ----------------------
  // Gestión de Usuarios
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
  // Gestión de Productos
  // ----------------------
  if (window.location.pathname.includes("productos.html")) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [
      { nombre: "Ataúd de Madera", precio: 1200, categoria: "Funeraria", stock: 5 },
      { nombre: "Urna Clásica", precio: 300, categoria: "Cremación", stock: 12 },
    ];

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
            <td>$${prod.precio}</td>
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
  // Gestión de Pedidos
  // ----------------------
  if (window.location.pathname.includes("pedidos.html")) {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [
      { cliente: "Juan Pérez", producto: "Ataúd de Madera", cantidad: 1, total: 1200, estado: "Pendiente" },
      { cliente: "María López", producto: "Urna Clásica", cantidad: 2, total: 600, estado: "Completado" }
    ];

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
            <td>$${pedido.total}</td>
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
  // Configuración del sistema
  // ----------------------
  if (window.location.pathname.includes("configuracion.html")) {
    const form = document.getElementById("form-configuracion");
    const config = JSON.parse(localStorage.getItem("configuracion")) || {};

    if (form) {
      // Rellenar campos
      document.getElementById("nombre-empresa").value = config.nombreEmpresa || "";
      document.getElementById("email-contacto").value = config.emailContacto || "";
      document.getElementById("telefono-contacto").value = config.telefonoContacto || "";
      document.getElementById("direccion").value = config.direccion || "";
      document.getElementById("moneda").value = config.moneda || "PEN";

      // Guardar cambios
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
