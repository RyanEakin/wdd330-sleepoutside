import{g as r,s as i,u as d,L as o,a as n}from"./utils-b2Fh0cpI.js";import{E as u}from"./ExternalServices-BSXgLSyf.js";class l{constructor(e,a){this.productId=e,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const e=r("so-cart")||[];e.push(this.product),i("so-cart",e),d();const a=document.querySelector(".cart");a&&(a.classList.add("animate-backpack"),a.addEventListener("animationend",()=>{a.classList.remove("animate-backpack")},{once:!0}))}renderProductDetails(){document.querySelector(".productPage").innerHTML=p(this.product)}}function p(t){document.title=`Sleep Outside | ${t.Name}`;const e=t.SuggestedRetailPrice,a=t.ListPrice;let c="";e>a&&(c=`<span class="discount-badge">-${Math.round((e-a)/e*100)}%</span>`);const s=e>a?`<span class="original-price">$${e}</span>`:"";return`<section class="product-detail">
        <h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.NameWithoutBrand}</h2>
        <img class="divider" src="${t.Image}" alt="${t.NameWithoutBrand}" />
        
        <div class="price-container">
            ${c}
            <p class="product-card__price">$${a}</p>
            ${s}
        </div>

        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">${t.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
        </div>
    </section>`}o();const m=new u,h=n("product"),$=new l(h,m);$.init();
