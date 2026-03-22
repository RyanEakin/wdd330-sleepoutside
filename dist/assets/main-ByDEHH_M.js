import{r as s,l as i,u as c}from"./utils-D0sg3CpL.js";/* empty css              */import{P as n}from"./ProductData-Dx0C3TkS.js";class o{constructor(t,e,r){this.category=t,this.dataSource=e,this.listElement=r}async init(){const t=await this.dataSource.getData();this.renderList(t)}renderList(t){s(this.productCardTemplate,this.listElement,t)}productCardTemplate(t){return`
      <li class="product-card">
        <a href="product_pages/?product=${t.Id}">
          <img src="${t.Image}" alt="Image of ${t.NameWithoutBrand}">
          <h3 class="card__brand">${t.Brand.Name}</h3>
          <h2 class="card__name">${t.NameWithoutBrand}</h2>
          <p class="product-card__price">$${t.FinalPrice.toFixed(2)}</p>
        </a>
      </li>
    `}}async function d(){await i();const a=document.querySelector("#product-list"),t=new n("tents");new o("tents",t,a).init(),c()}d();
