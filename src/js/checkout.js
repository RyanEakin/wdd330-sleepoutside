import { alertMessage, loadHeaderFooter } from "./utils.mjs";
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
    const myForm = document.querySelector("#checkout-form");
    if (!myForm) return;

    myForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const chk_status = myForm.checkValidity();
        myForm.reportValidity();
        if (!chk_status) return;

        const zipCodeInput = document.querySelector("#zip");
        if (zipCodeInput?.value.trim()) {
            checkout.calculateOrderTotal();
        }

        try {
            await checkout.checkout(myForm);
            window.location.assign("/checkout/success.html");
        } catch (error) {
            const message = error?.message?.message || error?.message || "Unable to submit order. Please try again.";
            alertMessage(message);
            console.error(error);
        }
    });
}

initCheckoutFormValidation();
