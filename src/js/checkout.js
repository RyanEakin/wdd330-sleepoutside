import { loadHeaderFooter, updateCartItemCount } from "./utils.mjs";

// Initialize functions
async function init() {
  // Load page elements first
  await loadHeaderFooter();
  updateCartItemCount()
}

init();