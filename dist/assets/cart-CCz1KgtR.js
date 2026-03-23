import{l as c,u as e,g as o}from"./utils-D0sg3CpL.js";/* empty css              */function s(){const t=o("so-cart").map(r=>n(r));document.querySelector(".product-list").innerHTML=t.join("")}function n(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}async function l(){await c(),s(),e()}l();
