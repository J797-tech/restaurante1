/* ==========================
       Datos de ejemplo de productos
       En producción: solicitar /api/products y renderizar
       ========================== */
      const PRODUCTS = [
        {
          id: 1,
          title: "Tarta de fresa (porción)",
          category: "Repostería",
          price: 7.5,
          desc: "Porción de tarta con crema y fresas",
          img: "https://th.bing.com/th/id/OIP.GKWvbsfRvoTGCWYFO9FK7wHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        },
        {
          id: 2,
          title: "Helado artesano (500ml)",
          category: "Heladería",
          price: 6.0,
          desc: "Sabor vainilla premium",
          img: "https://th.bing.com/th/id/OIP.rFc1KpEQyuB5eLQQtkycRwHaE7?w=246&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        },
        {
          id: 3,
          title: "Pan campesino (unidad)",
          category: "Panadería",
          price: 2.25,
          desc: "Pan recién horneado",
          img: "https://th.bing.com/th/id/OIP.TrdecwYPbp3jSQtflsMq7QHaE8?w=276&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        },
        {
          id: 4,
          title: "Box ejecutivo (almuerzo)",
          category: "Ejecutivos",
          price: 12.0,
          desc: "Plato gourmet para llevar",
          img: "https://sapiencia.gov.co/wp-content/uploads/2020/08/almuerzos-ejecutivo.jpg",
        },
        {
          id: 5,
          title: "Macarons (6 unidades)",
          category: "Repostería",
          price: 9.0,
          desc: "Surtido de macarons",
          img: "https://lovefoodfeed.com/wp-content/uploads/2023/01/Macarons-px-1200-01-1.jpg",
        },
        {
          id: 6,
          title: "Tarta de queso pequeña",
          category: "Gourmet",
          price: 18.0,
          desc: "Cheesecake estilo artesanal",
          img: "https://www.hola.com/horizon/original_aspect_ratio/91ead5f5ccb6-interior-tartas-age-z.jpg",
        },
        {
          id: 7,
          title: "Croissant almendrado",
          category: "Panadería",
          price: 3.5,
          desc: "Hojaldre con relleno de almendra",
          img: "https://img-global.cpcdn.com/recipes/0c72628a8c60375c/680x482cq70/hojaldre-relleno-de-chocolate-y-cubierto-de-almendra-y-azucar-foto-principal.jpg",
        },
        {
          id: 8,
          title: "Sorbete de limón (vaso)",
          category: "Heladería",
          price: 4.0,
          desc: "Ligero y refrescante",
          img: "https://queapetito.com/wp-content/uploads/2018/07/Sorbete-de-Lim%C3%B3n.jpg",
        },
        {
          id: 9,
          title: "Café gourmet (para llevar)",
          category: "Gourmet",
          price: 2.8,
          desc: "Café de origen, molido al momento",
          img: "https://s1.eestatic.com/2022/03/14/actualidad/657194829_222676211_1706x960.jpg",
        },
      ];

      // Datos de ejemplo de pedidos (simulados para cliente)
      const SAMPLE_ORDERS = [
        {
          id: 1001,
          date: "2024-01-15",
          time: "14:30",
          status: "Completado",
          total: 25.75,
          pickupTime: "15:00",
          pickupLocation: "Sucursal Centro",
          items: [
            { id: 1, title: "Tarta de fresa (porción)", qty: 2, price: 7.5 },
            { id: 2, title: "Helado artesano (500ml)", qty: 1, price: 6.0 },
            { id: 9, title: "Café gourmet (para llevar)", qty: 1, price: 2.8 }
          ]
        },
        {
          id: 1002,
          date: "2024-01-10",
          time: "12:15",
          status: "Completado",
          total: 18.25,
          pickupTime: "12:45",
          pickupLocation: "Sucursal Centro",
          items: [
            { id: 3, title: "Pan campesino (unidad)", qty: 3, price: 2.25 },
            { id: 5, title: "Macarons (6 unidades)", qty: 1, price: 9.0 },
            { id: 7, title: "Croissant almendrado", qty: 1, price: 3.5 }
          ]
        },
        {
          id: 1003,
          date: "2024-01-08",
          time: "18:45",
          status: "Cancelado",
          total: 12.0,
          pickupTime: "19:15",
          pickupLocation: "Sucursal Norte",
          items: [
            { id: 4, title: "Box ejecutivo (almuerzo)", qty: 1, price: 12.0 }
          ]
        }
      ];

      // Variables de estado
      let cart = JSON.parse(localStorage.getItem("dv_cart") || "[]");
      let categories = [];
      let filteredProducts = PRODUCTS.slice();

      /* ------------------ Helpers ------------------ */
      const currency = (v) => "$" + Number(v).toFixed(2);

      function saveCart() {
        localStorage.setItem("dv_cart", JSON.stringify(cart));
      }

      function updateCartCount() {
        const count = cart.reduce((s, i) => s + i.qty, 0);
        document.getElementById("cartCount").innerText = count;
        document.getElementById("cartCount").style.display =
          count > 0 ? "inline-block" : "none";
      }

      /* ------------------ Render categorías ------------------ */
      function renderCategories() {
        // extraer categorías únicas
        categories = [...new Set(PRODUCTS.map((p) => p.category))];
        const container = document.getElementById("categoriaList");
        container.innerHTML = "";

        // botón "Todos"
        const all = document.createElement("button");
        all.className = "btn category-btn text-start";
        all.innerText = "Todos";
        all.onclick = () => {
          document
            .querySelectorAll(".category-btn")
            .forEach((b) => b.classList.remove("active"));
          all.classList.add("active");
          filteredProducts = PRODUCTS.slice();
          renderProducts();
        };
        all.classList.add("active");
        container.appendChild(all);

        categories.forEach((cat) => {
          const btn = document.createElement("button");
          btn.className = "btn category-btn text-start";
          btn.innerText = cat;
          btn.onclick = () => {
            document
              .querySelectorAll(".category-btn")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            filteredProducts = PRODUCTS.filter((p) => p.category === cat);
            renderProducts();
          };
          container.appendChild(btn);
        });
      }

      /* ------------------ Render productos ------------------ */
      function renderProducts() {
        const grid = document.getElementById("productsGrid");
        grid.innerHTML = "";

        // Si no hay productos mostrar mensaje
        if (filteredProducts.length === 0) {
          grid.innerHTML =
            '<div class="col-12"><div class="alert alert-info">No hay productos que coincidan.</div></div>';
          return;
        }

        filteredProducts.forEach((p) => {
          const col = document.createElement("div");
          col.className = "col-sm-6 col-md-3";

          col.innerHTML = `
  <div class="p-3 product-card h-100 d-flex flex-column">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <span class="badge-category">${p.category}</span>
      <small class="text-muted">${currency(p.price)}</small>
    </div>
    <div class="mb-3" style="flex:1">
      <!-- Imagen del producto -->
      <img src="${p.img}" alt="${
            p.title
          }" class="img-fluid rounded" style="height:200px; object-fit:cover; width:100%">
      <p class="mt-2 mb-0 text-muted" style="font-size:0.9rem">${p.desc}</p>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-sm w-100" data-id="${p.id}" onclick="addToCart(${
            p.id
          })" style="background:var(--verde-medio); color:white">Agregar</button>
      <button class="btn btn-outline-secondary btn-sm" onclick="showQuick(${
        p.id
      })">Detalles</button>
    </div>
  </div>
`;

          grid.appendChild(col);
        });
      }

      /* ------------------ Carrito: funciones ------------------ */
      function addToCart(productId) {
        const prod = PRODUCTS.find((p) => p.id === productId);
        if (!prod) return;

        const existing = cart.find((i) => i.id === productId);
        if (existing) existing.qty += 1;
        else
          cart.push({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            qty: 1,
          });

        saveCart();
        renderCart();
        updateCartCount();

        // Abrir offcanvas automáticamente (opcional)
        const off = new bootstrap.Offcanvas(
          document.getElementById("cartOffcanvas")
        );
        off.show();
      }

      function renderCart() {
        const container = document.getElementById("cartItems");
        container.innerHTML = "";

        if (cart.length === 0) {
          container.innerHTML =
            '<div class="text-center text-muted">Tu carrito está vacío</div>';
        }

        cart.forEach((item) => {
          const el = document.createElement("div");
          el.className = "d-flex align-items-center gap-2 mb-2";
          el.innerHTML = `
          <div style="flex:1">
            <div style="font-weight:700">${item.title}</div>
            <div class="text-muted small">${currency(item.price)} x ${
            item.qty
          }</div>
          </div>
          <div class="d-flex gap-1 align-items-center">
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${
              item.id
            }, -1)"><i class="bi bi-dash"></i></button>
            <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${
              item.id
            }, 1)"><i class="bi bi-plus"></i></button>
            <button class="btn btn-sm btn-light" onclick="removeFromCart(${
              item.id
            })"><i class="bi bi-trash"></i></button>
          </div>
        `;
          container.appendChild(el);
        });

        // Total
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        document.getElementById("cartTotal").innerText = currency(total);
      }

      function changeQty(id, delta) {
        const item = cart.find((i) => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
      }

      function removeFromCart(id) {
        cart = cart.filter((i) => i.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
      }

      document.getElementById("clearCart").addEventListener("click", () => {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
      });

      // Abrir modal de checkout
      document.getElementById("checkoutBtn").addEventListener("click", () => {
        const myOff = bootstrap.Offcanvas.getInstance(
          document.getElementById("cartOffcanvas")
        );
        if (myOff) myOff.hide();
        const mdl = new bootstrap.Modal(
          document.getElementById("checkoutModal")
        );
        mdl.show();
      });

      document
        .getElementById("reserveFromCart")
        .addEventListener("click", () => {
          const myOff = bootstrap.Offcanvas.getInstance(
            document.getElementById("cartOffcanvas")
          );
          if (myOff) myOff.hide();
          const mdl = new bootstrap.Modal(
            document.getElementById("reserveModal")
          );
          mdl.show();
        });

      /* ------------------ Formularios: envío (simulado) ------------------ */
      document
        .getElementById("reserveForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          const payload = {
            name: document.getElementById("resName").value,
            datetime: document.getElementById("resDatetime").value,
            people: document.getElementById("resPeople").value,
            contact: document.getElementById("resContact").value,
          };

          // TODO: BACKEND -> POST /api/reservations
          console.info("Reservar (simulado):", payload);
          alert(
            "Reserva enviada (simulado). En producción se enviaría a /api/reservations"
          );
          bootstrap.Modal.getInstance(
            document.getElementById("reserveModal")
          ).hide();
        });

      document
        .getElementById("orderForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
          }

          const order = {
            customer: document.getElementById("orderName").value,
            contact: document.getElementById("orderContact").value,
            pickup_time: document.getElementById("orderPickupTime").value,
            notes: document.getElementById("orderNotes").value,
            items: cart,
          };

          // Ejemplo de fetch (descomentar y cambiar la URL cuando tengas backend)
          /*
      const res = await fetch('/api/orders', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(order)
      });
      */

          console.info("Orden enviada (simulado):", order);
          alert(
            "Pedido creado (simulado). En producción se enviaría a /api/orders"
          );
          cart = [];
          saveCart();
          renderCart();
          updateCartCount();
          bootstrap.Modal.getInstance(
            document.getElementById("checkoutModal")
          ).hide();
        });

      /* ------------------ Login simulado ------------------ */
      document
        .getElementById("loginForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          const email = document.getElementById("loginEmail").value;
          const pass = document.getElementById("loginPassword").value;

      // Usar función login del login.js
      const success = login(email, pass);
      if (!success) {
        alert("Credenciales incorrectas");
        return;
      }
      bootstrap.Modal.getInstance(
        document.getElementById("loginModal")
      ).hide();

      // Actualizar interfaz según rol
      const user = getCurrentUser();
      if (user) {
        updateUIForRole(user.role);
        if (user.role === "administrador") {
          window.location.href = "gestion_usuarios.html";
        } else if (user.role === "cocinero") {
          window.location.href = "gestion_platos.html";
        } else if (user.role === "mesero") {
          window.location.href = "gestion_pedidos.html";
        } else {
          // Cliente u otro rol, permanecer en la página principal
          // Aquí podrías mostrar vista cliente o historial de pedidos
        }
      }

      // Función para actualizar la interfaz según el rol
      function updateUIForRole(role) {
        const loginBtn = document.getElementById("loginBtn");
        const logoutBtn = document.getElementById("logoutBtn");
        const userNameDisplay = document.getElementById("userNameDisplay");

        if (role) {
          if (loginBtn) loginBtn.style.display = "none";
          if (logoutBtn) logoutBtn.style.display = "inline-block";
          if (userNameDisplay) {
            userNameDisplay.textContent = "Rol: " + role;
            userNameDisplay.style.display = "inline-block";
          }
        } else {
          if (loginBtn) loginBtn.style.display = "inline-block";
          if (logoutBtn) logoutBtn.style.display = "none";
          if (userNameDisplay) userNameDisplay.style.display = "none";
        }
      }
        });

      /* ------------------ Búsqueda, orden, filtros ------------------ */
      document.getElementById("searchInput").addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase().trim();
        filteredProducts = PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q)
        );
        renderProducts();
      });

      document.getElementById("applyPrice").addEventListener("click", () => {
        const min = parseFloat(document.getElementById("minPrice").value || 0);
        const max = parseFloat(
          document.getElementById("maxPrice").value || Infinity
        );
        filteredProducts = PRODUCTS.filter(
          (p) => p.price >= min && p.price <= max
        );
        renderProducts();
      });

      document.getElementById("sortSelect").addEventListener("change", (e) => {
        const v = e.target.value;
        if (v === "price-asc")
          filteredProducts.sort((a, b) => a.price - b.price);
        else if (v === "price-desc")
          filteredProducts.sort((a, b) => b.price - a.price);
        else filteredProducts = filteredProducts.slice();
        renderProducts();
      });

      /* ------------------ Detalle rápido ------------------ */
      function showQuick(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;

  // Rellenar datos
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = currency(p.price);
  document.getElementById("modalImg").src = p.img;

  // Mostrar modal centrado
  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}



      /* ------------------ Mobile Menu Toggle ------------------ */
      function initMobileMenu() {
        const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-dropdown"]');
        const menu = document.getElementById('navbar-dropdown');

        if (toggleBtn && menu) {
          toggleBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);

            // Toggle menu visibility
            if (isExpanded) {
              menu.classList.add('hidden');
              menu.classList.remove('flex');
            } else {
              menu.classList.remove('hidden');
              menu.classList.add('flex');
            }
          });

          // Close menu when clicking outside
          document.addEventListener('click', function(event) {
            if (!toggleBtn.contains(event.target) && !menu.contains(event.target)) {
              menu.classList.add('hidden');
              menu.classList.remove('flex');
              toggleBtn.setAttribute('aria-expanded', 'false');
            }
          });

          // Close menu when clicking on a link
          const menuLinks = menu.querySelectorAll('a');
          menuLinks.forEach(link => {
            link.addEventListener('click', function() {
              menu.classList.add('hidden');
              menu.classList.remove('flex');
              toggleBtn.setAttribute('aria-expanded', 'false');
            });
          });
        }
      }

      /* ------------------ Inicialización ------------------ */
      function init() {
        renderCategories();
        renderProducts();
        renderCart();
        updateCartCount();
        initMobileMenu();
      }

      // Hacer disponible en el scope global algunas funciones para uso en handlers inline
      window.addToCart = addToCart;
      window.changeQty = changeQty;
      window.removeFromCart = removeFromCart;
      window.showQuick = showQuick;

      init();
