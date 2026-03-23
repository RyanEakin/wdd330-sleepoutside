import { LoadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


LoadHeaderFooter();

const cart = new ShoppingCart(".product-list");
cart.renderCartContents();
