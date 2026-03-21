import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category") || "tents";
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector("[data-category-title]");
const categoryLabel = category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

if (titleElement) {
    titleElement.textContent = `Top Products: ${categoryLabel}`;
}

document.title = `Sleep Outside | ${categoryLabel}`;

const myList = new ProductList(category, dataSource, listElement);
myList.init();
