import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.itemCount = 0;
    }

    init() {
        const stored = getLocalStorage(this.key);
        this.list = Array.isArray(stored) ? stored : stored ? [stored] : [];
        this.calculateItemSubTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((sum, item) => {
            const qty = item.quantity || 1;
            const price = Number(item.FinalPrice) || 0;
            return sum + price * qty;
        }, 0);

        this.itemCount = this.list.reduce((count, item) => count + (item.quantity || 1), 0);

        this.renderItemCount();
        this.renderValue("#summary-subtotal", this.itemTotal);
        this.renderValue("#summary-tax", 0);
        this.renderValue("#summary-shipping", 0);
        this.renderValue("#summary-total", this.itemTotal);
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.renderValue("#summary-tax", this.tax);
        this.renderValue("#summary-shipping", this.shipping);
        this.renderValue("#summary-total", this.orderTotal);
    }

    renderValue(selector, value) {
        const root = document.querySelector(this.outputSelector);
        if (!root) return;

        const element = root.querySelector(selector);
        if (!element) return;

        element.textContent = `$${value.toFixed(2)}`;
    }

    renderItemCount() {
        const root = document.querySelector(this.outputSelector);
        if (!root) return;

        const countElement = root.querySelector("#summary-item-count");
        if (!countElement) return;

        countElement.textContent = `${this.itemCount}`;
    }
}
