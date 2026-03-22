import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter, qs } from "./utils.mjs";

const category = getParam(category);
const targetElement = qs(".product-list");

LoadHeaderFooter(); // dynamically loads the header and footer

const productList = new ProductData(category);
const productEntries = new ProductList(category, productList, targetElement);
productEntries.init();
