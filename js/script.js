// Quote calculator defaults
let rooms = 3;
let area = 2500;
let frequency = 1;
let quote = 265;

const estimatedValueEl = document.querySelector(".estimated-price");
const roomCountEl = document.querySelector(".room-counts");
const incrementBtn = document.querySelector("#btn-p");
const decrementBtn = document.querySelector("#btn-n");
const rangeSlider = document.querySelector(".range-slider");
const rangeValue = document.querySelector(".range-value");
const freqBtns = document.querySelectorAll(".freq-btn");

function displayQuote() {
  if (!estimatedValueEl) return;
  estimatedValueEl.textContent = "Rs. " + quote;
}

function calculateQuote() {
  const pricePerSQFT = 0.08;
  const basePrice = area * pricePerSQFT;
  const roomCharge = rooms * 20;

  let discount = 0;
  if (frequency === 7) discount = 0.1;
  else if (frequency === 15) discount = 0.05;
  else if (frequency === 30) discount = 0.03;

  let total = basePrice + roomCharge;
  total = total - total * discount;
  quote = Math.round(total);
  displayQuote();
  return quote;
}

// Room count controls
if (roomCountEl && incrementBtn && decrementBtn) {
  rooms = parseInt(roomCountEl.value, 10) || 3;

  incrementBtn.addEventListener("click", (e) => {
    e.preventDefault();
    rooms = Math.min(100, rooms + 1);
    roomCountEl.value = rooms;
    calculateQuote();
  });

  decrementBtn.addEventListener("click", (e) => {
    e.preventDefault();
    rooms = Math.max(1, rooms - 1);
    roomCountEl.value = rooms;
    calculateQuote();
  });
}

// Area slider
if (rangeSlider && rangeValue) {
  area = parseInt(rangeSlider.value, 10) || 2500;
  rangeValue.textContent = area + " sqft";

  rangeSlider.addEventListener("input", () => {
    area = parseInt(rangeSlider.value, 10) || 2500;
    rangeValue.textContent = area + " sqft";
    calculateQuote();
  });
}

// Frequency selection
if (freqBtns.length) {
  freqBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      frequency = parseInt(btn.dataset.value, 10) || 1;
      calculateQuote();
    });
  });
}

displayQuote();
if (estimatedValueEl) calculateQuote();

// Theme Toggle
const togglerBtn = document.querySelector(".theme-toggler");
const themeStorageKey = "site-theme";

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-theme", isLight);

  if (!togglerBtn) return;
  const icon = togglerBtn.querySelector("i");
  if (icon) {
    icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  togglerBtn.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
}

if (togglerBtn) {
  const savedTheme = localStorage.getItem(themeStorageKey);
  const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
  applyTheme(initialTheme);

  togglerBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}
