import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Check if cartItems is null
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Show the footer and calculate total
    document.querySelector(".cart-footer").classList.remove("hide");
    calculateTotal(cartItems);
  } else {
    // If cart is empty, it will display a message or hide the footer
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function calculateTotal(cartItems) {
  // I use reduce to sum up the FinalPrice of all items
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  
  // Update the HTML with the formatted total
  document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();