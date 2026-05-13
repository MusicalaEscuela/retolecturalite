// =========================================================
// Reto Musicala Lite · js/app.js
// Orquestador principal. Importa y arranca el juego.
// =========================================================

import { initGame } from './game.js';
import { CONFIG } from './config.js';

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function getWhatsappUrl(message) {
  const number = String(CONFIG.whatsappNumber).replace(/\D/g, '');
  const text = encodeURIComponent(message || CONFIG.whatsappDefaultMessage);

  return `https://wa.me/${number}?text=${text}`;
}

document.addEventListener('DOMContentLoaded', () => {
  setupCurrentYear();
  initGame(CONFIG);
});

function setupCurrentYear() {
  const year = new Date().getFullYear();

  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(year);
  });
}
