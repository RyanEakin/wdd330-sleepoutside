import{r as n,a as o,q as r,L as d}from"./utils-b2Fh0cpI.js";import{E as l}from"./ExternalServices-BwBjQ_cY.js";function m(a){const t=a.SuggestedRetailPrice,e=a.ListPrice;let s="";t>e&&(s=`<span class="discount-badge">-${Math.round((t-e)/t*100)}%</span>`);const c=t>e?`<span class="original-price">$${t}</span>`:"";return`<li class="product-card">
    <a href="../product_pages/?product=${a.Id}">
      <img src="${a.Images.PrimaryMedium}" alt="Image of ${a.NameWithoutBrand}">
      <h2 class="card__brand">${a.Brand.Name}</h2>
      <h3 class="card__name">${a.NameWithoutBrand}</h3>
      <div class="price-container">
      ${s}
      <p class="product-card__price">$${a.ListPrice}</p> 
      ${c}
      <div>
    </a>
  </li>`}class p{constructor(t,e,s){this.category=t,this.dataSource=e,this.listElement=s}async init(){const t=await this.dataSource.getData(this.category);this.renderList(t)}renderList(t){n(m,this.listElement,t)}}const i=o("category"),u=new l,h=r(".product-list");r(".productType").innerHTML=`Top Products: ${i}`;d();const g=new p(i,u,h);g.init();
