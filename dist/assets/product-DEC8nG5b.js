import{g as s,s as e,a as d}from"./utils-D5god50N.js";function c(t){if(t.ok)return t.json();throw new Error("Bad Response")}class i{constructor(o){this.category=o,this.path=`../json/${this.category}.json`}getData(){return fetch(this.path).then(c).then(o=>o)}async findProductById(o){return(await this.getData()).find(r=>r.Id===o)}}class n{constructor(o,a){this.productId=o,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){const o=s("so-cart")||[];o.push(this.product),e("so-cart",o)}renderProductDetails(){document.querySelector(".productPage").innerHTML=u(this.product)}}function u(t){document.title=`Sleep Outside | ${t.Name}`;const o=`$${t.ListPrice}`;return`
  <section class="product-detail">
      <h3>${t.Brand.Name}</h3>

      <h2 class="divider">${t.NameWithoutBrand}</h2>

      <img class="divider"
        src="${t.Image}"
        alt="${t.NameWithoutBrand}" />

      <p class="product-card__price">${o}</p>

      <p class="product__color">${t.Colors[0].ColorName}</p>

      <p class="product__description">
        ${t.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
      </div>
    </section>
`}const h=new i("tents"),l=d("product"),p=new n(l,h);p.init();
