import{g as r,s as c,u as o,L as i,a as n}from"./utils-CK7JlfG8.js";import{P as u}from"./ProductData-sjAax25O.js";class l{constructor(a,s){this.productId=a,this.product={},this.dataSource=s}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const a=r("so-cart")||[];a.push(this.product),c("so-cart",a),o()}renderProductDetails(){document.querySelector(".productPage").innerHTML=p(this.product)}}function p(t){document.title=`Sleep Outside | ${t.Name}`;const a=t.SuggestedRetailPrice,s=t.ListPrice;let e="";a>s&&(e=`<span class="discount-badge">-${Math.round((a-s)/a*100)}%</span>`);const d=a>s?`<span class="original-price">$${a}</span>`:"";return`<section class="product-detail">
        <h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.NameWithoutBrand}</h2>
        <img class="divider" src="${t.Image}" alt="${t.NameWithoutBrand}" />
        
        <div class="price-container">
            ${e}
            <p class="product-card__price">$${s}</p>
            ${d}
        </div>

        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">${t.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
        </div>
    </section>`}i();const m=new u,h=n("product"),P=new l(h,m);P.init();
