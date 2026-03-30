import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.tax = 0;
    this.shipping = 0;
    this.itemTotal = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();

    // Recalculate totals when zip is entered
    document.querySelector('#zip').addEventListener('blur', () => {
      if (document.querySelector('#zip').value) {
        this.calculateOrderTotal()
      }
    });
  }

  calculateItemSummary() {
    const itemCount = document.querySelector('#item-count');
    const subtotalEl = document.querySelector('#subtotal');

    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    if (itemCount) itemCount.textContent = this.list.length;
    if (subtotalEl) subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector('#tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('#order-total').textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const services = new ExternalServices();
    const orderData = formDataToJSON(form);

    orderData.orderDate = new Date().toISOString();
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.tax = this.tax.toFixed(2);
    orderData.shipping = this.shipping;
    orderData.items = packageItems(this.list);

    try {
      const response = await services.checkout(orderData);
      console.log('Order success:', response);

      // Clear cart and redirect
      setLocalStorage(this.key, []);
      window.location.href = '/checkout/success.html';

    } catch (err) {
      console.error('Order failed:', err);
      const message = err.message?.message || err.message || 'An error occurred. Please try again.';
      alertMessage(typeof message === 'string' ? message : JSON.stringify(message));
    }
  }
}