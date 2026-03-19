import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
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
            return;
        }

        renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
    }
}
