import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const TAX_RATE = 0.06;
const SHIPPING_FLAT_RATE = 10;

function normalizeCart() {
    const storedCart = getLocalStorage("so-cart");
    return Array.isArray(storedCart) ? storedCart : storedCart ? [storedCart] : [];
}

function calculateSummary(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => {
        const qty = item.quantity || 1;
        const price = Number(item.FinalPrice) || 0;
        return sum + price * qty;
    }, 0);

    const tax = subtotal * TAX_RATE;
    const shipping = subtotal > 0 ? SHIPPING_FLAT_RATE : 0;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
}

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function renderSummary() {
    const cartItems = normalizeCart();
    const { subtotal, tax, shipping, total } = calculateSummary(cartItems);

    document.querySelector("#summary-subtotal").textContent = formatCurrency(subtotal);
    document.querySelector("#summary-tax").textContent = formatCurrency(tax);
    document.querySelector("#summary-shipping").textContent = formatCurrency(shipping);
    document.querySelector("#summary-total").textContent = formatCurrency(total);
}

function initCheckoutFormValidation() {
    const form = document.querySelector("#checkout-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        event.preventDefault();
        alert("Checkout details look good. Order submission would continue on the server.");
    });
}

renderSummary();
initCheckoutFormValidation();
