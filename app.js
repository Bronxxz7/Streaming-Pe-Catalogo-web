/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */
const DISCOUNT_PER_EXTRA = 1.5;
// 📲 NÚMEROS WHATSAPP POR PROVEEDOR
const WHATSAPP_NUMBERS = {
  BRONXX: "51901738537",   // ← TU número (con código país sin +)
  KAIRO:  "51904443915"     // ← Número de tu distribuidor
};


let combo = [];

/* =========================================
   ELEMENTOS
========================================= */
const homeSection   = document.getElementById("home");
const sectionPage   = document.getElementById("sectionPage");
const sectionTitle  = document.getElementById("sectionTitle");
const sectionDesc   = document.getElementById("sectionDesc");
const sectionLine   = document.getElementById("sectionLine");
const searchInput   = document.getElementById("searchInput");

const comboFloat    = document.getElementById("comboFloat");
const comboModal    = document.getElementById("comboModal");
const closeModal    = document.getElementById("closeModal");

const comboList     = document.getElementById("comboList");
const subTotalEl    = document.getElementById("subTotal");
const discTotalEl   = document.getElementById("discTotal");
const finalTotalEl  = document.getElementById("finalTotal");
const providerSelect= document.getElementById("providerSelect");
const whatsappBtn   = document.getElementById("whatsappBtn");

const backHomeBtn   = document.getElementById("backHome");

/* =========================================
   MODAL DETALLES
========================================= */
const detailsModal   = document.getElementById("detailsModal");
const closeDetails   = document.getElementById("closeDetails");
const detailsTitle   = document.getElementById("detailsTitle");
const detailsContent = document.getElementById("detailsContent");

/* =========================================
   DATOS DE SECCIONES
========================================= */
const sections = {
  streaming: {
    title: "STREAMING",
    desc: "Las mejores películas, series y TV en vivo. Garantía total.",
    accent: "#ff000f"
  },
  musica: {
    title: "MÚSICA",
    desc: "Disfruta tu música favorita sin anuncios.",
    accent: "#37ff8b"
  },
  apps: {
    title: "APPS PREMIUM",
    desc: "Herramientas y apps profesionales.",
    accent: "#b000ff"
  },
  web: {
    title: "SERVICIOS WEB",
    desc: "Herramientas digitales y almacenamiento.",
    accent: "#37ff8b"
  },
  videojuegos: {
    title: "VIDEOJUEGOS",
    desc: "Diversión ilimitada.",
    accent: "#37ff8b"
  },
  windows: {
    title: "WINDOWS",
    desc: "Licencias y software original.",
    accent: "#0078ff"
  }
};

/* =========================================
   HELPERS: STOCK
========================================= */
function isOutOfStock(card){
  const badge = card.querySelector(".badge");
  if(!badge) return false;

  // Caso 1: badge con data-stock="0"
  if (badge.dataset.stock === "0") return true;

  // Caso 2: clase .no (tú usas <div class="badge no">❌ SIN STOCK</div>)
  if (badge.classList.contains("no")) return true;

  // Caso 3: texto contiene SIN STOCK / AGOTADO
  const t = (badge.textContent || "").toLowerCase();
  if (t.includes("sin stock") || t.includes("agotado") || t.includes("no disponible")) return true;

  return false;
}

function showNoStock(){
  alert("⛔ No contamos con este producto por el momento.");
}

function applyStockUI(card){
  if(!card) return;

  const out = isOutOfStock(card);
  const buyBtn  = card.querySelector(".buyNowBtn");
  const comboBtn = card.querySelector("[data-combo-add]");

  if (out){
    if (buyBtn){
      buyBtn.classList.add("disabled");
      buyBtn.textContent = "⛔ SIN STOCK";
      buyBtn.disabled = true;
    }
    if (comboBtn){
      comboBtn.disabled = true;
      comboBtn.style.opacity = "0.5";
      comboBtn.style.cursor = "not-allowed";
    }
  } else {
    if (buyBtn){
      buyBtn.classList.remove("disabled");
      buyBtn.textContent = "🟢 Comprar ahora";
      buyBtn.disabled = false;
    }
    if (comboBtn){
      comboBtn.disabled = false;
      comboBtn.style.opacity = "";
      comboBtn.style.cursor = "";
    }
  }
}

/* =========================================
   FIX AUTOMÁTICO: SI HAY CARDS SUELTAS, MÉTELAS A STREAMING
   (por tu HTML actual, tus cards de Streaming quedaron fuera de un data-grid)
========================================= */
function fixLooseCardsIntoStreaming(){
  const streamingGrid = document.querySelector('[data-grid="streaming"]');
  if (!streamingGrid) return;

  // cards que NO estén dentro de un grid data-grid
  const looseCards = [...document.querySelectorAll("#sectionPage .pCard")]
    .filter(card => !card.closest("[data-grid]"));

  looseCards.forEach(card => streamingGrid.appendChild(card));
}

/* =========================================
   GRIDS POR CATEGORÍA
========================================= */
function getAllGrids(){
  return [...document.querySelectorAll("#sectionPage .productsGrid[data-grid]")];
}

function showGrid(key){
  const grids = getAllGrids();

  // oculta todos
  grids.forEach(g => g.classList.add("hidden"));

  // busca el correcto (case-insensitive)
  const target = grids.find(g => (g.dataset.grid || "").toLowerCase() === String(key).toLowerCase());
  if (target) target.classList.remove("hidden");

  // stock UI en el visible
  if (target){
    target.querySelectorAll(".pCard").forEach(applyStockUI);
  }

  // limpia buscador
  if (searchInput) searchInput.value = "";
}


/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */
document.querySelectorAll(".catCard").forEach(card => {
  card.addEventListener("click", () => {
    const target = card.dataset.go; // streaming, musica, apps...
    openSection(target);
  });
});

function openSection(key){
  const data = sections[key];
  if(!data) return;

  homeSection.classList.add("hidden");
  sectionPage.classList.remove("hidden");

  sectionTitle.textContent = data.title;
  sectionDesc.textContent  = data.desc;
  sectionLine.style.background =
    `linear-gradient(90deg, transparent, ${data.accent}, transparent)`;

  document.documentElement.style.setProperty("--accent", data.accent);

  // 👇 muestra SOLO el grid correcto
  showGrid(key);
}

backHomeBtn.addEventListener("click", () => {
  sectionPage.classList.add("hidden");
  homeSection.classList.remove("hidden");

  // limpiar búsqueda
  if (searchInput) searchInput.value = "";

  // ocultar todos los grids
  getAllGrids().forEach(g => g.classList.add("hidden"));

  // restaurar display de todas las cards
  document.querySelectorAll(".pCard").forEach(c => c.style.display = "");
});


/* =========================================
   BUSCADOR: FILTRA SOLO EN EL GRID VISIBLE
========================================= */
if (searchInput){
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();

    const visibleGrid = getAllGrids().find(g => !g.classList.contains("hidden"));
    if (!visibleGrid) return;

    visibleGrid.querySelectorAll(".pCard").forEach(card => {
      const name = (card.dataset.name || "").toLowerCase();
      const show = name.includes(q);
      card.style.display = show ? "" : "none";
    });
  });
}


/* =========================================
   CAMBIO DE PLAN (SELECT)
========================================= */
document.addEventListener("change", (e) => {
  if(!e.target.classList.contains("planSelect")) return;

  const card = e.target.closest(".pCard");
  if(!card) return;

  const newPrice = Number(e.target.value);
  card.dataset.price = newPrice;

  const priceEl = card.querySelector(".pPrice");
  if (priceEl) priceEl.textContent = `S/ ${newPrice.toFixed(2)}`;
});

/* =========================================
   COMBO: AGREGAR
========================================= */
function addToCombo(card){
  if(!card) return;

  if (isOutOfStock(card)) {
    showNoStock();
    return;
  }

  const id    = card.dataset.id;
  const name  = card.dataset.name;
  const price = Number(card.dataset.price);

  if(combo.find(item => item.id === id)) return;

  combo.push({ id, name, price });
  updateCombo();
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-combo-add]");
  if(!btn) return;

  const card = btn.closest(".pCard");
  if(!card) return;

  addToCombo(card);
});

/* =========================================
   COMBO: ACTUALIZAR
========================================= */
function updateCombo(){
  comboList.innerHTML = "";

  combo.forEach(item => {
    const div = document.createElement("div");
    div.className = "comboItem";
    div.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="price">S/ ${item.price.toFixed(2)}</span>
      <button class="removeBtn" data-remove="${item.id}">×</button>
    `;
    comboList.appendChild(div);
  });

  const subtotal = combo.reduce((sum, i) => sum + i.price, 0);
  const discount = combo.length > 1 ? (combo.length - 1) * DISCOUNT_PER_EXTRA : 0;
  const total = subtotal - discount;

  subTotalEl.textContent  = `S/ ${subtotal.toFixed(2)}`;
  discTotalEl.textContent = `- S/ ${discount.toFixed(2)}`;
  finalTotalEl.textContent= `S/ ${total.toFixed(2)}`;

  comboFloat.querySelector(".count").textContent = `${combo.length} items`;
  comboFloat.querySelector(".total").textContent = `S/ ${total.toFixed(2)}`;
}

/* =========================================
   COMBO: ELIMINAR
========================================= */
document.addEventListener("click", (e) => {
  const id = e.target.dataset.remove;
  if(!id) return;

  combo = combo.filter(item => item.id !== id);
  updateCombo();
});

/* =========================================
   MODAL COMBO
========================================= */
comboFloat.addEventListener("click", () => {
  comboModal.classList.add("open");
});

closeModal.addEventListener("click", () => {
  comboModal.classList.remove("open");
});

comboModal.addEventListener("click", (e) => {
  if (e.target === comboModal) comboModal.classList.remove("open");
});

/* =========================================
   WHATSAPP: COMBO
========================================= */
whatsappBtn.addEventListener("click", () => {
  if (combo.length === 0) {
    alert("Agrega al menos un servicio al combo.");
    return;
  }

  const provider = (providerSelect?.value || "").trim();
  const number = WHATSAPP_NUMBERS[provider];

  if (!provider || !number) {
    comboModal.classList.add("open");
    providerSelect?.focus();
    alert("Elige un proveedor (BRONXX o KAIRO) para continuar.");
    return;
  }

  const subtotal = combo.reduce((sum, i) => sum + i.price, 0);
  const discount = combo.length > 1 ? (combo.length - 1) * DISCOUNT_PER_EXTRA : 0;
  const total = subtotal - discount;

  let message = "Hola, quiero este combo:\n\n";

  combo.forEach(item => {
    message += `${item.name} - S/ ${item.price.toFixed(2)}\n`;
  });

  message += `\nProveedor: ${provider}`;
  message += `\nDescuento: - S/ ${discount.toFixed(2)}`;
  message += `\nTotal a pagar: S/ ${total.toFixed(2)}`;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});


/* =========================================
   MODAL DETALLES
========================================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-details]");
  if(!btn) return;

  const card = btn.closest(".pCard");
  if(!card) return;

  const name  = card.dataset.name || "Producto";
  const price = Number(card.dataset.price || 0).toFixed(2);
  const id    = card.dataset.id || "";

  let info = `
    <strong>Precio:</strong> S/ ${price}<br><br>
    <strong>Reglas:</strong><br>
    • Uso personal<br>
    • No cambiar correo/contraseña (según servicio)<br>
    • Soporte por WhatsApp<br><br>
    <strong>Entrega:</strong> inmediata o en minutos.
  `;

  if (id === "st_netflix") {
    info = `
      <strong>Precio:</strong> S/ ${price}<br><br>
      <strong>Incluye:</strong> 1 mes, 1 perfil personal.<br>
      <strong>Reglas:</strong><br>
      • No cambiar correo/contraseña<br>
      • No cerrar sesiones de otros perfiles<br>
      • Soporte por WhatsApp<br><br>
      <strong>Entrega:</strong> inmediata o en minutos.
    `;
  }

  detailsTitle.textContent = name;
  detailsContent.innerHTML = info;
  detailsModal.classList.add("open");
});

closeDetails.addEventListener("click", () => {
  detailsModal.classList.remove("open");
});

detailsModal.addEventListener("click", (e) => {
  if (e.target === detailsModal) detailsModal.classList.remove("open");
});

/* =========================================
   COMPRA INDIVIDUAL
========================================= */
// ==============================
// MODAL PROVEEDOR (COMPRA INDIVIDUAL)
// ==============================
const providerModal = document.getElementById("providerModal");
const closeProvider = document.getElementById("closeProvider");
const providerSelectSingle = document.getElementById("providerSelectSingle");
const confirmBuyBtn = document.getElementById("confirmBuyBtn");

let pendingBuy = null; // aquí guardamos { name, price } del producto seleccionado

function openProviderModalForBuy(name, price){
  pendingBuy = { name, price };

  // reset select
  if (providerSelectSingle) providerSelectSingle.value = "";

  providerModal.classList.add("open");
  providerSelectSingle?.focus();
}

closeProvider?.addEventListener("click", () => {
  providerModal.classList.remove("open");
  pendingBuy = null;
});

providerModal?.addEventListener("click", (e) => {
  if (e.target === providerModal) {
    providerModal.classList.remove("open");
    pendingBuy = null;
  }
});

// Confirmar compra individual -> WhatsApp
confirmBuyBtn?.addEventListener("click", () => {
  if (!pendingBuy) return;

  const provider = (providerSelectSingle.value || "").trim();
  const number = WHATSAPP_NUMBERS[provider];

  if (!provider || !number) {
    alert("Elige un proveedor (BRONXX o KAIRO) para continuar.");
    providerSelectSingle.focus();
    return;
  }

  const { name, price } = pendingBuy;

  let message = `Hola quiero comprar este servicio:\n\n`;
  message += `${name}\n`;
  message += `Precio: S/ ${Number(price).toFixed(2)}\n`;
  message += `Proveedor: ${provider}\n\n`;
  message += `¿Está disponible?`;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  providerModal.classList.remove("open");
  pendingBuy = null;
});


// ==============================
// COMPRA INDIVIDUAL (CLICK)
// ==============================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-buy]");
  if (!btn) return;

  const card = btn.closest(".pCard");
  if (!card) return;

  if (isOutOfStock(card)) {
    showNoStock();
    return;
  } 

  const name = card.dataset.name || "Servicio";
  const price = Number(card.dataset.price || 0);

  // En vez de ir directo a WhatsApp, abrimos modal proveedor
  openProviderModalForBuy(name, price);
});


/* =========================================
   INIT
========================================= */
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".pCard").forEach(applyStockUI);

  updateCombo();
});



// =========================
// FAQ acordeón (HOME)
// =========================
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".faqQ");
  if (!btn) return;

  const item = btn.closest(".faqItem");
  if (!item) return;

  // Cierra los otros (opcional)
  document.querySelectorAll(".faqItem.open").forEach(x => {
    if (x !== item) x.classList.remove("open");
  });

  item.classList.toggle("open");

  // Cambia + / −
  document.querySelectorAll(".faqItem").forEach(it => {
    const plus = it.querySelector(".faqPlus");
    if (!plus) return;
    plus.textContent = it.classList.contains("open") ? "−" : "+";
  });
});
