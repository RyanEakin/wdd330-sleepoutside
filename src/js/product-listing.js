import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter, qs } from "./utils.mjs";

const genre = getParam("category");
const dataSource = new ProductData();
const targetElement = qs(".product-list");

qs(".productType").innerHTML = `${genre} products`;

LoadHeaderFooter(); // dynamically loads the header and footer

const productList = new ProductData(genre);
const productEntries = new ProductList(genre, dataSource, targetElement);
productEntries.init();
