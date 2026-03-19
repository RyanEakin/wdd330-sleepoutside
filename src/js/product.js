import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const category = "tents";

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id, category);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
