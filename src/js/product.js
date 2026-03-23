import { loadHeaderFooter, updateCartItemCount, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


async function init() {
  // Load page elements first
  await loadHeaderFooter();

  const category = getParam('product');
  // first create an instance of the ProductData class.
  const dataSource = new ProductData();
  // then get the element you want the product list to render in
  const listElement = document.querySelector('.product-list');
  // then create an instance of the ProductDetails class and send it the correct information.
  const myList = new ProductDetails(category, dataSource, listElement);
  // finally call the init method to show the products
  myList.init();

  updateCartItemCount()
}

init();