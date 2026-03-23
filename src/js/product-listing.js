import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { LoadHeaderFooter, getParam } from "./utils.mjs";


// Load page elements first
LoadHeaderFooter();

const category = getParam('category');
// first create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

// TODO: put in correct place later
const titleCase = (str) => str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
document.querySelector('title').textContent = `Top Products: ${titleCase(category)}`