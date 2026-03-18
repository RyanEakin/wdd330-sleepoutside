import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = "tents";
const targetElement = document.querySelector(".product-list");

const productList = new ProductData(category);
const productEntries = new ProductList(category, productList, targetElement);
productEntries.init();