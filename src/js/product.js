import { getParam, LoadHeaderFooter, updateCartItemCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";


// Asynchronous wrapper for cart item subscript to work
async function initPage() {
  await LoadHeaderFooter();
  
  // Gets product code from URLParam
  const category = getParam('product');
  // first create an instance of the ProductData class.
  const dataSource = new ProductData();
  // then create an instance of the ProductDetails class and send it the correct information.
  const myList = new ProductDetails(category, dataSource);
  // finally call the init method to show the products
  myList.init();
  
  updateCartItemCount();
}

initPage();