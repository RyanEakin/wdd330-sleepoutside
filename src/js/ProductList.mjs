import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {

    // Discount feature
    const msrp = product.SuggestedRetailPrice;
    const finalPrice = product.ListPrice;

    let discountIndicator = "";

    if (msrp > finalPrice) {
        const discountPercent = Math.round(((msrp - finalPrice) / msrp) * 100);
        // Create the HTML for the badge
        discountIndicator = `<span class="discount-badge">-${discountPercent}%</span>`;
    }

    // Format prices for display
    const strikePrice = msrp > finalPrice ? `<span class="original-price">$${msrp}</span>` : "";


    return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <div class="price-container">
      ${discountIndicator}
      <p class="product-card__price">\$${product.ListPrice}</p> 
      ${strikePrice}
      <div>
    </a>
  </li>`

    /* this code creates the template for the tent cards... we currently are missing two images for the other tents
      and we used an escape character '\' so that the '$' can be shown and used for the template literal
    */
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement; //collects selected HTML element... must use querySelector()
    }
    async init() {
        // sends a promise, await will resolve it.
        const prodList = await this.dataSource.getData(this.category); // grabs list of API json entries and maps to an array
        //console.log(prodList)
        this.renderList(prodList);
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
        // this uses the function from utils to get the template cards generated
    }
}