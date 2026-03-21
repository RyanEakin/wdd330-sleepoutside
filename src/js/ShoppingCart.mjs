import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const qty = item.quantity || 1;
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <button class="quantity-btn quantity-decrease" data-id="${item.Id}" aria-label="Decrease quantity">-</button>
    <span class="quantity-value">${qty}</span>
    <button class="quantity-btn quantity-increase" data-id="${item.Id}" aria-label="Increase quantity">+</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
        this.totalElement = document.querySelector(".cart-total");
    }

    renderCart() {
        const storedCart = getLocalStorage("so-cart");
        const cartItems = Array.isArray(storedCart)
            ? storedCart
            : storedCart
                ? [storedCart]
                : [];

        if (cartItems.length === 0) {
            this.listElement.innerHTML = "<li>Your cart is empty.</li>";
            this.renderTotal(0);
            return;
        }

        renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
        this.initQuantityControls();
        this.renderTotal(this.calculateTotal(cartItems));
    }

    calculateTotal(cartItems) {
        return cartItems.reduce((total, item) => {
            const qty = item.quantity || 1;
            const price = Number(item.FinalPrice) || 0;
            return total + (price * qty);
        }, 0);
    }

    renderTotal(total) {
        if (!this.totalElement) return;
        this.totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    initQuantityControls() {
        this.listElement.querySelectorAll(".quantity-decrease").forEach((btn) => {
            btn.addEventListener("click", () => this.updateItemQuantity(btn.dataset.id, -1));
        });
        this.listElement.querySelectorAll(".quantity-increase").forEach((btn) => {
            btn.addEventListener("click", () => this.updateItemQuantity(btn.dataset.id, 1));
        });
    }

    updateItemQuantity(id, delta) {
        const storedCart = getLocalStorage("so-cart");
        let cartItems = Array.isArray(storedCart)
            ? storedCart
            : storedCart
                ? [storedCart]
                : [];

        const index = cartItems.findIndex((item) => item.Id === id);
        if (index === -1) return;

        cartItems[index].quantity = (cartItems[index].quantity || 1) + delta;

        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }

        setLocalStorage("so-cart", cartItems);
        this.renderCart();
    }
}
