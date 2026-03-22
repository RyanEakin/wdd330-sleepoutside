import { LoadHeaderFooter, updateCartItemCount } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


// Asynchronous wrapper for cart item subscript to work
async function initPage() {
  await LoadHeaderFooter();
  
  const cart = new ShoppingCart(".product-list");
  cart.renderCartContents();
  
  updateCartItemCount();
}

initPage();