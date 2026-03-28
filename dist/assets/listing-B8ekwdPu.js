import{r as c,a as o,q as r,L as n}from"./utils-vlf1gbn4.js";import{P as d}from"./ProductData-sjAax25O.js";function m(t){return`<li class="product-card">
    <a href="../product_pages/?product=${t.Id}">
      <img src="${t.Images.PrimaryMedium}" alt="Image of ${t.NameWithoutBrand}">
      <h2 class="card__brand">${t.Brand.Name}</h2>
      <h3 class="card__name">${t.NameWithoutBrand}</h3>
      <p class="product-card__price">$${t.ListPrice}</p> 
    </a>
  </li>`}class l{constructor(a,s,i){this.category=a,this.dataSource=s,this.listElement=i}async init(){const a=await this.dataSource.getData(this.category);this.renderList(a)}renderList(a){c(m,this.listElement,a)}}const e=o("category"),h=new d,u=r(".product-list");r(".productType").innerHTML=`Top Products: ${e}`;n();const p=new l(e,h,u);p.init();
