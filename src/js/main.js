import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartItemCount } from "./utils.mjs";

async function init() {
  // Load page elements first
  await loadHeaderFooter(); // Top level await are not supported in some environments, so it's wrapped in a function
  
  const productListElement = document.querySelector("#product-list");
  const dataSource = new ProductData("tents");
  const tentsList = new ProductList("tents", dataSource, productListElement);
  
  tentsList.init();
  
  updateCartItemCount()
}

init();