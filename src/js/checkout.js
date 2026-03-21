import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
const externalServices = new ExternalServices();
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

        const formData = new FormData(form);
        const orderData = {
            orderDate: new Date().toISOString(),
            fname: formData.get("firstName"),
            lname: formData.get("lastName"),
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            cardNumber: formData.get("cardNumber"),
            expiration: formData.get("expDate"),
            code: formData.get("securityCode"),
            items: checkout.list,
            orderTotal: checkout.orderTotal,
            shipping: checkout.shipping,
            tax: checkout.tax,
        };

        try {
            await externalServices.checkout(orderData);
            alert("Order submitted successfully.");
        } catch (error) {
            alert("Unable to submit order. Please try again.");
            console.error(error);
        }
    });
}

initCheckoutFormValidation();
