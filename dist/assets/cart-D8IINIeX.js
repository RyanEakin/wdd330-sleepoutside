import{a as n,L as l}from"./utils-DeJoPDFN.js";function i(a){return`<li class="cart-card divider">
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
</li>`}class m{constructor(t){this.listElement=t}renderCartContents(){const t=n("so-cart");if(t&&t.length>0){const r=t.map(e=>i(e));qs(this.listElement).innerHTML=r.join(""),this.displayCartTotal(t)}else{qs(".cart-footer").classList.remove("hide");const e=qs(".cart-total");e.innerHTML="your cart is empty"}}displayCartTotal(t){const r=document.qs(".cart-footer"),e=document.qs(".cart-total");r.classList.remove("hide");const o=t.reduce((s,c)=>s+c.FinalPrice,0);e.innerText=`Total: $${o.toFixed(2)}`}}l();const d=new m(".product-list");d.renderCartContents();
