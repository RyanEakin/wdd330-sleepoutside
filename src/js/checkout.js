import { LoadHeaderFooter, updateCartItemCount } from "./utils.mjs";


// Asynchronous wrapper for cart item subscript to work
async function initPage() {
  await LoadHeaderFooter(); // dynamically loads the header and footer
  updateCartItemCount();
}

initPage();