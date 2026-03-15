import { getLocalStorage } from './utils.mjs';

function updateCartCount() {
  const cart = getLocalStorage("so-cart");
  document.getElementById("cart-item-count").textContent = cart.length;
}

updateCartCount();