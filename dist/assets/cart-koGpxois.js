import{g as n,q as c,s as d,L as l}from"./utils-vlf1gbn4.js";function m(s){const t=`<button class="cart-card_delete" id="${s.Id}">X</button>`;return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${s.Images.PrimarySmall}"
      alt="${s.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${s.Name}</h2>
  </a>
  <p class="cart-card__color">${s.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${s.FinalPrice}</p>
  ${t}
</li>`}class p{constructor(t){this.listElement=t}renderCartContents(){const t=n("so-cart");if(t&&t.length>0){const o=t.map(e=>m(e));c(this.listElement).innerHTML=o.join(""),c(this.listElement).addEventListener("click",e=>{const a=e.target.closest(".cart-card_delete");if(!a||!c(this.listElement).contains(a))return;const r=a.id;this.removeItemById(r,a)}),this.displayCartTotal(t)}else{c(".cart-footer").classList.remove("hide");const e=c(".cart-total");e.innerHTML="your cart is empty"}}removeItemById(t,o){const e=n("so-cart")||[];let a=e.findIndex(r=>String(r.Id)===String(t));if(a!==-1){e.splice(a,1);const r=o.closest(".cart-card");r&&r.remove(),d("so-cart",e),this.renderCartContents(),l()}}displayCartTotal(t){const o=c(".cart-footer"),e=c(".cart-total");o.classList.remove("hide");const a=t.reduce((r,i)=>r+i.FinalPrice,0);e.innerText=`Total: $${a.toFixed(2)}`}}l();const h=new p(".product-list");h.renderCartContents();
