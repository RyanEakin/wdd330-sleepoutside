import { LoadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs"

LoadHeaderFooter(); // dynamically loads the header and footer

const cart = new ShoppingCart(".product-list");
cart.renderCartContents();  