AOS.init({
  once: true,
  duration: 900
});

const productsGrid = document.getElementById("productsGrid");
const catalogTitle = document.getElementById("catalogTitle");
const catalogDescription = document.getElementById("catalogDescription");
const categoryCards = document.querySelectorAll(".category-card");
const searchInput = document.getElementById("searchInput");

const cartDrawer = document.getElementById("cartDrawer");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const buyCartBtn = document.getElementById("buyCartBtn");

const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");

let currentCategory = "streaming";
let cart = [];
let selectedPlans = {};

function formatPrice(price) {
  return `S/ ${Number(price).toFixed(2)}`;
}

function findProductById(id) {
  for (const key in catalogData) {
    const category = catalogData[key];
    if (!category || !Array.isArray(category.products)) continue;

    const product = category.products.find(item => item.id === id);
    if (product) return product;
  }
  return null;
}

function getSelectedPlan(product) {
  const selectedIndex = selectedPlans[product.id] ?? 0;
  return product.plans[selectedIndex] || product.plans[0];
}

function renderProducts() {
  const category = catalogData[currentCategory];

  if (!category) {
    productsGrid.innerHTML = `
      <div class="glass" style="padding:24px;border-radius:24px;grid-column:1/-1;">
        <h3>Categoría no encontrada</h3>
        <p style="color:var(--muted);margin-top:10px;">Revisa el data-category del botón y la clave en data.js.</p>
      </div>
    `;
    return;
  }

  const search = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const products = Array.isArray(category.products)
    ? category.products.filter(product =>
        product.name.toLowerCase().includes(search)
      )
    : [];

  if (catalogTitle) catalogTitle.textContent = category.title || "Catálogo";
  if (catalogDescription) catalogDescription.textContent = category.description || "";

  if (!products.length) {
    productsGrid.innerHTML = `
      <div class="glass" style="padding:24px;border-radius:24px;grid-column:1/-1;">
        <h3>No hay productos en esta categoría</h3>
        <p style="color:var(--muted);margin-top:10px;">Agrega productos en data.js o revisa la estructura.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = products.map(product => {
    if (!Array.isArray(product.plans) || !product.plans.length) {
      return `
        <article class="product-card glass" style="padding:24px;">
          <h3>${product.name || "Producto sin nombre"}</h3>
          <p style="color:var(--muted);margin-top:10px;">Este producto no tiene planes configurados.</p>
        </article>
      `;
    }

    if (selectedPlans[product.id] === undefined) {
      selectedPlans[product.id] = 0;
    }

    const currentPlan = product.plans[selectedPlans[product.id]] || product.plans[0];

    const planOptions = product.plans.map((plan, index) => `
      <option value="${index}" ${index === selectedPlans[product.id] ? "selected" : ""}>
        ${plan.name}
      </option>
    `).join("");

    return `
      <article class="product-card glass">
        <div class="product-top">
          <span class="pill combo">
            <i class="fa-solid fa-gift"></i> ${product.badge || "+Combo"}
          </span>

          <div class="plan-select-wrap">
            <select class="plan-select" onchange="changePlan(${product.id}, this.value)">
              ${planOptions}
            </select>
          </div>
        </div>

        <div class="product-logo" id="product-image-${product.id}">
          <img src="${currentPlan.image}" alt="${product.name}">
        </div>

        <h3>${product.name}</h3>

        <div class="price" id="product-price-${product.id}">
          ${formatPrice(currentPlan.price)}
        </div>

        <p class="product-desc" id="product-desc-${product.id}">
          ${currentPlan.description}
        </p>

        <div class="product-actions">
          <div class="stock" id="product-stock-${product.id}">
            <i class="fa-solid fa-square-check"></i>
            ${currentPlan.stock ? "CON STOCK" : "SIN STOCK"}
          </div>

          <div class="product-actions-row">
            <button class="action-btn buy-btn" onclick="buyNow(${product.id})">Comprar</button>
            <button class="action-btn cart-btn" onclick="addToCart(${product.id})">Carrito</button>
            <button class="action-btn info-btn" onclick="showInfo(${product.id})">Info</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function changePlan(productId, planIndex) {
  const product = findProductById(productId);
  if (!product) return;

  selectedPlans[productId] = Number(planIndex);
  const selectedPlan = product.plans[selectedPlans[productId]] || product.plans[0];

  const priceEl = document.getElementById(`product-price-${productId}`);
  const descEl = document.getElementById(`product-desc-${productId}`);
  const stockEl = document.getElementById(`product-stock-${productId}`);
  const imageEl = document.getElementById(`product-image-${productId}`);

  if (priceEl) {
    priceEl.textContent = formatPrice(selectedPlan.price);
  }

  if (descEl) {
    descEl.textContent = selectedPlan.description;
  }

  if (stockEl) {
    stockEl.innerHTML = `
      <i class="fa-solid fa-square-check"></i>
      ${selectedPlan.stock ? "CON STOCK" : "SIN STOCK"}
    `;
  }

  if (imageEl) {
    imageEl.innerHTML = `<img src="${selectedPlan.image}" alt="${product.name}">`;
  }
}

function buyNow(id) {
  const product = findProductById(id);
  if (!product) return;

  const selectedPlan = getSelectedPlan(product);

  const message =
    `Hola, quiero comprar:%0A%0A` +
    `Producto: ${product.name}%0A` +
    `Plan: ${selectedPlan.name}%0A` +
    `Precio: ${formatPrice(selectedPlan.price)}%0A` +
    `Detalle: ${selectedPlan.description}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

function addToCart(id) {
  const product = findProductById(id);
  if (!product) return;

  const selectedPlan = getSelectedPlan(product);

  cart.push({
    productId: product.id,
    name: product.name,
    plan: selectedPlan.name,
    price: selectedPlan.price,
    description: selectedPlan.description,
    image: selectedPlan.image
  });

  updateCart();

  if (cartDrawer) {
    cartDrawer.classList.add("open");
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems || !cartTotal) return;

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-item">
        <strong>Tu carrito está vacío</strong>
        <p>Agrega productos para comprarlos por WhatsApp.</p>
      </div>
    `;
    cartTotal.textContent = "S/ 0.00";
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <strong>${item.name}</strong>
      <p>${item.plan} · ${formatPrice(item.price)}</p>
      <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  cartTotal.textContent = formatPrice(total);
}

function buyCart() {
  if (!cart.length) return;

  const lines = cart.map((item, index) =>
    `${index + 1}. ${item.name} - ${item.plan} - ${formatPrice(item.price)}`
  );

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const message =
    `Hola, quiero comprar estos productos:%0A%0A` +
    `${lines.join("%0A")}` +
    `%0A%0ATotal: ${formatPrice(total)}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

function showInfo(id) {
  const product = findProductById(id);
  if (!product || !modalBody || !modal) return;

  const selectedPlan = getSelectedPlan(product);

  modalBody.innerHTML = `
    <h3>${product.name}</h3>
    <p><strong>Tipo de cuenta:</strong> ${selectedPlan.name}</p>
    <p><strong>Precio:</strong> ${formatPrice(selectedPlan.price)}</p>
    <p><strong>Descripción:</strong> ${selectedPlan.description}</p>
    <p><strong>Incluye:</strong></p>
    <ul>
      ${(selectedPlan.details || []).map(item => `<li>${item}</li>`).join("")}
    </ul>

    <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="buyNow(${product.id})">
        <i class="fa-brands fa-whatsapp"></i> Comprar ahora
      </button>
      <button class="btn btn-secondary" onclick="addToCart(${product.id})">
        <i class="fa-solid fa-cart-shopping"></i> Agregar al carrito
      </button>
    </div>
  `;

  modal.classList.add("active");
}

if (categoryCards.length) {
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;

      categoryCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      currentCategory = category;
      renderProducts();

      const catalogSection = document.getElementById("catalogo");
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

if (openCart && cartDrawer) {
  openCart.addEventListener("click", () => cartDrawer.classList.add("open"));
}

if (closeCart && cartDrawer) {
  closeCart.addEventListener("click", () => cartDrawer.classList.remove("open"));
}

if (buyCartBtn) {
  buyCartBtn.addEventListener("click", buyCart);
}

if (modalClose && modal) {
  modalClose.addEventListener("click", () => modal.classList.remove("active"));
}

if (modalOverlay && modal) {
  modalOverlay.addEventListener("click", () => modal.classList.remove("active"));
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const correo = document.getElementById("correo")?.value.trim() || "";
    const mensaje = document.getElementById("mensaje")?.value.trim() || "";

    if (!nombre || !telefono || !correo || !mensaje) {
      alert("Completa todos los campos");
      return;
    }

    const texto =
      `Hola, quiero hacer una consulta:%0A%0A` +
      `Nombre: ${nombre}%0A` +
      `WhatsApp: ${telefono}%0A` +
      `Correo: ${correo}%0A` +
      `Mensaje: ${mensaje}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank");
  });
}

updateCart();
renderProducts();

window.changePlan = changePlan;
window.buyNow = buyNow;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.showInfo = showInfo;