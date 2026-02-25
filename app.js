/* =========================================
   CONFIGURACIÓN GENERAL
========================================= */
const DISCOUNT_PER_EXTRA = 1.5;

// 📲 NÚMEROS WHATSAPP POR PROVEEDOR
const WHATSAPP_NUMBERS = {
  BRONXX: "51901738537",
  KAIRO:  "51904443915"
};

/* =========================================
   CUPÓN (1 USO) - DESCUENTO FIJO
========================================= */
const COUPON_DISCOUNT = 2; // 👈 cambia el descuento aquí
const COUPON_STORAGE_KEY = "STREAMING_PE_COUPON";

let appliedCoupon = null; // { code, discount }

/* ---------- Cupón helpers ---------- */
function setCoupon(code = "SP-2026", discount = COUPON_DISCOUNT){
  const data = {
    code: String(code).trim().toUpperCase(),
    discount: Number(discount),
    active: true,
    used: false
  };
  localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(data));
  return data;
}

function generateCoupon(){
  // ✅ tu cupón fijo
  return setCoupon("OEWAA", COUPON_DISCOUNT);
}

function getCoupon(){
  try{
    return JSON.parse(localStorage.getItem(COUPON_STORAGE_KEY));
  }catch{
    return null;
  }
}

function deactivateCoupon(){
  const c = getCoupon();
  if(!c) return;
  c.active = false;
  c.used = true;
  localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(c));
}

function validateAndApplyCoupon(inputCode){
  const c = getCoupon();
  if(!c) return { ok:false, msg:"Cupón no creado." };

  const code = (inputCode || "").trim().toUpperCase();
  if(!code) return { ok:false, msg:"Escribe tu cupón." };

  if(!c.active || c.used) return { ok:false, msg:"Este cupón ya fue usado o está desactivado." };
  if(code !== String(c.code).toUpperCase()) return { ok:false, msg:"Cupón inválido." };

  appliedCoupon = { code: c.code, discount: Number(c.discount || COUPON_DISCOUNT) };
  return { ok:true, msg:`✅ Cupón aplicado: -S/ ${appliedCoupon.discount.toFixed(2)}` };
}

// aplica descuento a un total (mínimo 0)
function applyCouponToTotal(total){
  if(!appliedCoupon) return Number(total || 0);
  return Math.max(0, Number(total || 0) - appliedCoupon.discount);
}

/* =========================================
   COMBO STATE
========================================= */
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
   CUPÓN UI - COMBO (NUEVO)
========================================= */
const couponInputCombo = document.getElementById("couponInputCombo");
const applyCouponCombo = document.getElementById("applyCouponCombo");
const couponMsgCombo   = document.getElementById("couponMsgCombo");

applyCouponCombo?.addEventListener("click", () => {
  const res = validateAndApplyCoupon(couponInputCombo?.value);
  if (couponMsgCombo) couponMsgCombo.textContent = res.msg;
  updateCombo(); // ✅ para que se vea el descuento al toque
});

/* =========================================
   DATOS DE SECCIONES
========================================= */
const sections = {
  streaming: { title: "STREAMING", desc: "Las mejores películas, series y TV en vivo. Garantía total.", accent: "#ff000f" },
  musica:    { title: "MÚSICA", desc: "Disfruta tu música favorita sin anuncios.", accent: "#37ff8b" },
  apps:      { title: "APPS PREMIUM", desc: "Herramientas y apps profesionales.", accent: "#b000ff" },
  web:       { title: "SERVICIOS WEB", desc: "Herramientas digitales y almacenamiento.", accent: "#37ff8b" },
  videojuegos:{ title: "VIDEOJUEGOS", desc: "Diversión ilimitada.", accent: "#37ff8b" },
  windows:   { title: "WINDOWS", desc: "Licencias y software original.", accent: "#0078ff" }
};

/* =========================================
   HELPERS: STOCK
========================================= */
function isOutOfStock(card){
  const badge = card.querySelector(".badge");
  if(!badge) return false;

  if (badge.dataset.stock === "0") return true;
  if (badge.classList.contains("no")) return true;

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
========================================= */
function fixLooseCardsIntoStreaming(){
  const streamingGrid = document.querySelector('[data-grid="streaming"]');
  if (!streamingGrid) return;

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
  grids.forEach(g => g.classList.add("hidden"));

  const target = grids.find(g => (g.dataset.grid || "").toLowerCase() === String(key).toLowerCase());
  if (target) target.classList.remove("hidden");

  if (target){
    target.querySelectorAll(".pCard").forEach(applyStockUI);
  }

  if (searchInput) searchInput.value = "";
}

/* =========================================
   NAVEGACIÓN ENTRE SECCIONES
========================================= */
document.querySelectorAll(".catCard").forEach(card => {
  card.addEventListener("click", () => openSection(card.dataset.go));
});

function openSection(key){
  const data = sections[key];
  if(!data) return;

  homeSection.classList.add("hidden");
  sectionPage.classList.remove("hidden");

  sectionTitle.textContent = data.title;
  sectionDesc.textContent  = data.desc;
  sectionLine.style.background = `linear-gradient(90deg, transparent, ${data.accent}, transparent)`;
  document.documentElement.style.setProperty("--accent", data.accent);

  showGrid(key);
}

backHomeBtn.addEventListener("click", () => {
  sectionPage.classList.add("hidden");
  homeSection.classList.remove("hidden");

  if (searchInput) searchInput.value = "";
  getAllGrids().forEach(g => g.classList.add("hidden"));
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
      card.style.display = name.includes(q) ? "" : "none";
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

  // ✅ si cambias plan y ese item está en combo, actualiza su precio
  const id = card.dataset.id;
  const item = combo.find(x => x.id === id);
  if (item){
    item.price = newPrice;
    updateCombo();
  }
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
   COMBO: ACTUALIZAR (con cupón)
========================================= */
function updateCombo(){
  if (!comboList) return;

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
  const packDiscount = combo.length > 1 ? (combo.length - 1) * DISCOUNT_PER_EXTRA : 0;
  const totalBeforeCoupon = subtotal - packDiscount;

  const total = applyCouponToTotal(totalBeforeCoupon);
  const couponDiscount = appliedCoupon ? Math.max(0, totalBeforeCoupon - total) : 0;

  subTotalEl.textContent   = `S/ ${subtotal.toFixed(2)}`;
  discTotalEl.textContent  = `- S/ ${(packDiscount + couponDiscount).toFixed(2)}`;
  finalTotalEl.textContent = `S/ ${total.toFixed(2)}`;

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
   WHATSAPP: COMBO (incluye cupón)
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
  const packDiscount = combo.length > 1 ? (combo.length - 1) * DISCOUNT_PER_EXTRA : 0;
  const totalBeforeCoupon = subtotal - packDiscount;
  const total = applyCouponToTotal(totalBeforeCoupon);
  const couponDiscount = appliedCoupon ? Math.max(0, totalBeforeCoupon - total) : 0;

  let message = "Hola, quiero este combo:\n\n";
  combo.forEach(item => { message += `${item.name} - S/ ${item.price.toFixed(2)}\n`; });

  message += `\nProveedor: ${provider}`;
  message += `\nDescuento pack: - S/ ${packDiscount.toFixed(2)}`;

  if (appliedCoupon){
    message += `\nCupón (${appliedCoupon.code}): - S/ ${couponDiscount.toFixed(2)}`;
  }

  message += `\nTotal a pagar: S/ ${total.toFixed(2)}`;

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");

  // ✅ 1 uso
  if (appliedCoupon){
    deactivateCoupon();
    appliedCoupon = null;
    if (couponMsgCombo) couponMsgCombo.textContent = "";
    if (couponInputCombo) couponInputCombo.value = "";
    updateCombo();
  }
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

closeDetails.addEventListener("click", () => detailsModal.classList.remove("open"));
detailsModal.addEventListener("click", (e) => { if (e.target === detailsModal) detailsModal.classList.remove("open"); });

/* =========================================
   COMPRA INDIVIDUAL
========================================= */
const providerModal = document.getElementById("providerModal");
const closeProvider = document.getElementById("closeProvider");
const providerSelectSingle = document.getElementById("providerSelectSingle");
const confirmBuyBtn = document.getElementById("confirmBuyBtn");

// Cupón (compra individual)
const couponInputSingle = document.getElementById("couponInputSingle");
const applyCouponSingle = document.getElementById("applyCouponSingle");
const couponMsgSingle   = document.getElementById("couponMsgSingle");

let pendingBuy = null; // { name, price }

function openProviderModalForBuy(name, price){
  pendingBuy = { name, price };

  // ✅ limpia UI
  if (providerSelectSingle) providerSelectSingle.value = "";
  if (couponMsgSingle) couponMsgSingle.textContent = "";
  if (couponInputSingle) couponInputSingle.value = "";

  // ✅ importante: NO arrastrar cupón viejo
  appliedCoupon = null;

  providerModal.classList.add("open");
  providerSelectSingle?.focus();
}

closeProvider?.addEventListener("click", () => {
  providerModal.classList.remove("open");
  pendingBuy = null;
  appliedCoupon = null;
});

providerModal?.addEventListener("click", (e) => {
  if (e.target === providerModal) {
    providerModal.classList.remove("open");
    pendingBuy = null;
    appliedCoupon = null;
  }
});

// ✅ Aplicar cupón en modal individual (ahora sí existe el botón/input)
applyCouponSingle?.addEventListener("click", () => {
  const res = validateAndApplyCoupon(couponInputSingle?.value);
  if (couponMsgSingle) couponMsgSingle.textContent = res.msg;
});

// Confirmar compra individual -> WhatsApp (aplica cupón al precio)
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

  const priceBeforeCoupon = Number(price || 0);
  const finalPrice = applyCouponToTotal(priceBeforeCoupon);
  const couponDiscount = appliedCoupon ? Math.max(0, priceBeforeCoupon - finalPrice) : 0;

  let message = `🛒 *Nueva compra de STREAMING PE*\n\n`;
  message += `📦 Servicio: *${name}*\n`;
  message += `💰 Precio: S/ ${priceBeforeCoupon.toFixed(2)}\n`;

  if (appliedCoupon){
    message += `🏷️ Cupón (${appliedCoupon.code}): - S/ ${couponDiscount.toFixed(2)}\n`;
    message += `✅ Total con cupón: S/ ${finalPrice.toFixed(2)}\n`;
  } else {
    message += `✅ Total: S/ ${priceBeforeCoupon.toFixed(2)}\n`;
  }

  message += `👤 Proveedor elegido: ${provider}\n\n`;
  message += `❓ ¿Está disponible?\n`;
  message += `Gracias 🙌`;

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");

  providerModal.classList.remove("open");
  pendingBuy = null;

  // ✅ 1 uso
  if (appliedCoupon){
    deactivateCoupon();
    appliedCoupon = null;
  }
  updateCombo();
});

// Click comprar en cards
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
  openProviderModalForBuy(name, price);
});

/* =========================================
   INIT
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  fixLooseCardsIntoStreaming();
  document.querySelectorAll(".pCard").forEach(applyStockUI);

  const existing = getCoupon();
  if (!existing || !existing.code || existing.used || !existing.active) {
    generateCoupon(); // OEWAA
  }

  updateCombo();
});

/* =========================
   FAQ acordeón (HOME)
========================= */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".faqQ");
  if (!btn) return;

  const item = btn.closest(".faqItem");
  if (!item) return;

  document.querySelectorAll(".faqItem.open").forEach(x => {
    if (x !== item) x.classList.remove("open");
  });

  item.classList.toggle("open");

  document.querySelectorAll(".faqItem").forEach(it => {
    const plus = it.querySelector(".faqPlus");
    if (!plus) return;
    plus.textContent = it.classList.contains("open") ? "−" : "+";
  });
});
