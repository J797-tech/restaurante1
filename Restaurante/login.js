/* ------------------ Usuarios para login simulado ------------------ */
const USERS = [
  { id: 1, email: "admin@deliciasverdes.com", password: "admin123", role: "administrador" },
  { id: 2, email: "cocinero@deliciasverdes.com", password: "cocina123", role: "cocinero" },
  { id: 3, email: "mesero@deliciasverdes.com", password: "mesero123", role: "mesero" },
  { id: 4, email: "cliente@deliciasverdes.com", password: "cliente123", role: "cliente" }
];

let currentUser = null;

/* ------------------ Funciones de login simulado ------------------ */
function login(email, password) {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    alert(`Bienvenido, ${user.role}`);
    // Mostrar interfaz según rol
    applyRoleAccess(user.role);
    return true;
  } else {
    alert("Credenciales incorrectas");
    return false;
  }
}

function logout() {
  currentUser = null;
  alert("Sesión cerrada");
  // Restaurar interfaz a estado no autenticado
  resetRoleAccess();
}

// Exponer funciones globalmente para pruebas
window.login = login;
window.logout = logout;

/* ------------------ Control de acceso por rol ------------------ */
function applyRoleAccess(role) {
  // Guardar rol en localStorage para persistencia
  localStorage.setItem("currentUserRole", role);

  // Mostrar botón logout si existe
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.style.display = "inline-block";

  // Ocultar modal login si está abierto
  const loginModalEl = document.getElementById("loginModal");
  if (loginModalEl) {
    const modal = bootstrap.Modal.getInstance(loginModalEl);
    if (modal) modal.hide();
  }

  // Adaptar visibilidad de elementos según rol
  if (role === "administrador") {
    showAdminFeatures();
  } else if (role === "cocinero") {
    showCookFeatures();
  } else if (role === "mesero" || role === "cliente") {
    showClientFeatures();
  }
}

function resetRoleAccess() {
  localStorage.removeItem("currentUserRole");

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.style.display = "none";

  // Recargar página para restaurar estado no autenticado
  location.reload();
}

// Funciones para mostrar/ocultar elementos según rol (ejemplo para gestion_platos.html)
function showAdminFeatures() {
  const categoryManagement = document.getElementById("categoryManagement");
  if (categoryManagement) categoryManagement.style.display = "flex";

  const actionsHeader = document.getElementById("actionsHeader");
  if (actionsHeader) actionsHeader.style.display = "table-cell";

  document.querySelectorAll(".actions-cell").forEach(cell => {
    cell.style.display = "table-cell";
  });
}

function showCookFeatures() {
  const categoryManagement = document.getElementById("categoryManagement");
  if (categoryManagement) categoryManagement.style.display = "none";

  const actionsHeader = document.getElementById("actionsHeader");
  if (actionsHeader) actionsHeader.style.display = "table-cell";

  document.querySelectorAll(".actions-cell").forEach(cell => {
    cell.style.display = "table-cell";
  });
}

function showClientFeatures() {
  const categoryManagement = document.getElementById("categoryManagement");
  if (categoryManagement) categoryManagement.style.display = "none";

  const actionsHeader = document.getElementById("actionsHeader");
  if (actionsHeader) actionsHeader.style.display = "none";

  document.querySelectorAll(".actions-cell").forEach(cell => {
    cell.style.display = "none";
  });
}

// Al cargar la página, aplicar rol guardado si existe
document.addEventListener("DOMContentLoaded", () => {
  const savedRole = localStorage.getItem("currentUserRole");
  if (savedRole) {
    applyRoleAccess(savedRole);
  }
});
