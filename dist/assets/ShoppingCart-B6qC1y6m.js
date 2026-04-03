import{g as n,q as c,s as l,L as d}from"./utils-b2Fh0cpI.js";function m(o){const t=`<button class="cart-card_delete" id="${o.Id}">X</button>`;let a='<li class="cart-card divider">';return window.location.pathname==="/checkout/index.html"&&(a='<li class="checkout-card divider">'),`${a}
  <a href="#" class="cart-card__image">
    <img
      src="${o.Images.PrimarySmall}"
      alt="${o.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${o.Name}</h2>
  </a>
  <p class="cart-card__color">${o.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${o.FinalPrice}</p>
  ${t}
</li>`}class h{constructor(t){this.listElement=t}renderCartContents(){const t=n("so-cart");if(t&&t.length>0){const a=t.map(e=>m(e));c(this.listElement).innerHTML=a.join(""),c(this.listElement).addEventListener("click",e=>{const r=e.target.closest(".cart-card_delete");if(!r||!c(this.listElement).contains(r))return;const s=r.id;this.removeItemById(s,r)}),this.displayCartTotal(t)}else{c(".cart-footer").classList.remove("hide");const e=c(".cart-total");e.innerHTML="your cart is empty"}}removeItemById(t,a){const e=n("so-cart")||[];let r=e.findIndex(s=>String(s.Id)===String(t));if(r!==-1){e.splice(r,1);const s=a.closest(".cart-card");s&&s.remove(),l("so-cart",e),this.renderCartContents(),d()}}displayCartTotal(t){const a=c(".cart-footer"),e=c(".cart-total");a&&a.classList.remove("hide");const r=t.reduce((s,i)=>s+i.FinalPrice,0);window.location.pathname==="/cart/index.html"?e.innerText=`Total: $${r.toFixed(2)}`:e.innerText=`Subtotal: $${r.toFixed(2)}`}animateCartIcon(){const t=c(".cart > a")||c(".cart");t&&(t.classList.add("animate-cart"),t.addEventListener("animationend",()=>{t.classList.remove("animate-cart")},{once:!0}))}}export{h as S};
