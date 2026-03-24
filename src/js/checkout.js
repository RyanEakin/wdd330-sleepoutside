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

    form.addEventListener("submit", async (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        event.preventDefault();

        const zipCodeInput = document.querySelector("#zip");
        if (zipCodeInput?.value.trim()) {
            checkout.calculateOrderTotal();
        }

        try {
            await checkout.checkout(form);
            alert("Order submitted successfully.");
        } catch (error) {
            alert("Unable to submit order. Please try again.");
            console.error(error);
        }
    });
}

initCheckoutFormValidation();
