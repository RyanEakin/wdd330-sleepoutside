import{g as l}from"./utils-D5god50N.js";/* empty css              */function n(){const t=l("so-cart");if(t){const a=t.map(e=>s(e));document.querySelector(".product-list").innerHTML=a.join(""),i(t)}}function s(t){return`<li class="cart-card divider">
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
</li>`}function i(t){const a=document.querySelector(".cart-footer"),e=document.querySelector(".cart-total");if(t&&t.length>0){a.classList.remove("hide");const r=t.reduce((c,o)=>c+o.FinalPrice,0);e.innerText=`Total: $${r.toFixed(2)}`}else a.classList.add("hide")}n();
