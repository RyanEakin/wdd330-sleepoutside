import{r as s}from"./utils-D0sg3CpL.js";class l{constructor(a,e,t){this.category=a,this.dataSource=e,this.listElement=t}async init(){const a=await this.dataSource.getData(this.category);this.renderList(a)}renderList(a){s(this.productCardTemplate,this.listElement,a)}productCardTemplate(a){return`
      <li class="product-card">
        <a href="/product_pages/?product=${a.Id}">
          <img src="${a!=null&&a.Image?a.Image:a.Images.PrimaryMedium}" alt="Image of ${a.NameWithoutBrand}" loading="lazy">
          <h3 class="card__brand">${a.Brand.Name}</h3>
          <h2 class="card__name">${a.NameWithoutBrand}</h2>
          <p class="product-card__price">$${a.FinalPrice.toFixed(2)}</p>
        </a>
      </li>
    `}}export{l as P};
