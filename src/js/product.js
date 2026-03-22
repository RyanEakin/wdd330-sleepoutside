import { getParam, loadHeaderFooter, updateCartItemCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


async function init() {
  // Load page elements first
  await loadHeaderFooter();
  
  const dataSource = new ProductData("tents");
  const productId = getParam("product");
  
  const product = new ProductDetails(productId, dataSource);
  product.init();
  
  updateCartItemCount()
}

init();