import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();

const zipCodeInput = document.querySelector("#zip");
if (zipCodeInput) {
    const updateOrderTotals = () => {
        if (zipCodeInput.value.trim()) {
            checkout.calculateOrderTotal();
        }
    };

    zipCodeInput.addEventListener("input", updateOrderTotals);
    zipCodeInput.addEventListener("change", updateOrderTotals);
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

initCheckoutFormValidation();
