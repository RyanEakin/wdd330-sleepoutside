import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, LoadHeaderFooter, qs } from "./utils.mjs";

const genre = getParam("category");
const dataSource = new ExternalServices();
const targetElement = qs(".product-list");

qs(".productType").innerHTML = `Top Products: ${genre}`;

LoadHeaderFooter(); // dynamically loads the header and footer

const productEntries = new ProductList(genre, dataSource, targetElement);
productEntries.init();
