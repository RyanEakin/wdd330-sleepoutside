import { LoadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

LoadHeaderFooter(); // dynamically loads the header and footer

const check = new CheckoutProcess("so-cart",".cart-summary");
check.init();