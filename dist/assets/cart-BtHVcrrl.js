import { L as s, g as l } from "./utils-Dl1KdOr1.js";
s();
function n() {
  const t = l("so-cart");
  if (t) {
    const a = t.map((e) => i(e));
    (document.querySelector(".product-list").innerHTML = a.join("")), d(t);
  }
}
function i(t) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`;
}
function d(t) {
  const a = document.querySelector(".cart-footer"),
    e = document.querySelector(".cart-total");
  if (t && t.length > 0) {
    a.classList.remove("hide");
    const r = t.reduce((c, o) => c + o.FinalPrice, 0);
    e.innerText = `Total: $${r.toFixed(2)}`;
  } else a.classList.add("hide");
}
n();
