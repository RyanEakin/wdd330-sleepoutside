import { renderListWithTemplate, initBreadcrumb } from "./utils.mjs";

// category param for breadcrumb functionality
function productCardTemplate(product, category) {
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}&category=${category}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}" loading="lazy">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">\$${product.ListPrice}</p> 
    </a>
  </li>`

    /* this code creates the template for the tent cards... we currently are missing two images for the other tents
      used and escape cahracter '\' so that the '$' can be shown and used for the tempalte literal
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
        const prodList = await this.dataSource.getData(this.category); // grabs list of json entries and maps to an array
        this.renderList(prodList);
        initBreadcrumb({label: this.category, count: prodList.length})
    }

    renderList(productList) {
        renderListWithTemplate(
            (product) => productCardTemplate(product, this.category),
            this.listElement,
            productList
        );
        // this uses the function from utils to get the template cards generated
    }
}
