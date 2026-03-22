import{g as o,s as c,u as r,l as s,a as i}from"./utils-D0sg3CpL.js";/* empty css              */import{P as e}from"./ProductData-Dx0C3TkS.js";class n{constructor(t,a){this.productId=t,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCartHandler.bind(this))}addProductToCart(t){let a=o("so-cart")||[];a.push(t),c("so-cart",a),r()}async addToCartHandler(t){const a=await this.dataSource.findProductById(t.target.dataset.id);this.addProductToCart(a)}renderProductDetails(){const t=this.product;document.querySelector("main").innerHTML=`
      <section class="product-detail">
        <h3>${t.Brand.Name}</h3>
        <h2 class="divider">${t.NameWithoutBrand}</h2>
        <img class="divider" src="${t.Image}" alt="${t.NameWithoutBrand}">
        <p class="product-card__price">$${t.FinalPrice}</p>
        <p class="product__color">${t.Colors[0].ColorName}</p>
        <p class="product__description">${t.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
        </div>
      </section>
    `}}async function u(){await s();const d=new e("tents"),t=i("product");new n(t,d).init(),r()}u();
