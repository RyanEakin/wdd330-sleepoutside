import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter, qs } from "./utils.mjs";

const genre = getParam("category");
const targetElement = qs(".product-list");

qs(".productType").innerHTML = `${genre} products`;

LoadHeaderFooter(); // dynamically loads the header and footer

const productList = new ProductData(genre);
const productEntries = new ProductList(genre, productList, targetElement);
productEntries.init();
