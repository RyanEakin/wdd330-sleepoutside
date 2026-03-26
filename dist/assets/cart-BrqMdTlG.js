import{g as n,q as e,L as i}from"./utils-dNnnFvAX.js";function m(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Images.PrimarySmall}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}class d{constructor(t){this.listElement=t}renderCartContents(){const t=n("so-cart");if(t&&t.length>0){const o=t.map(r=>m(r));e(this.listElement).innerHTML=o.join(""),this.displayCartTotal(t)}else{e(".cart-footer").classList.remove("hide");const r=e(".cart-total");r.innerHTML="your cart is empty"}}displayCartTotal(t){const o=e(".cart-footer"),r=e(".cart-total");o.classList.remove("hide");const s=t.reduce((c,l)=>c+l.FinalPrice,0);r.innerText=`Total: $${s.toFixed(2)}`}}i();const p=new d(".product-list");p.renderCartContents();
