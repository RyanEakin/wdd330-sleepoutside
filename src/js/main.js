import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter, updateCartItemCount } from "./utils.mjs";


// Asynchronous wrapper for cart item subscript to work
async function initPage() {
  const category = "tents";
  const targetElement = document.querySelector(".product-list");
  
  await LoadHeaderFooter(); // dynamically loads the header and footer
  
  const productList = new ProductData(category);
  const productEntries = new ProductList(category, productList, targetElement);
  productEntries.init();
  
  updateCartItemCount()
}

initPage();