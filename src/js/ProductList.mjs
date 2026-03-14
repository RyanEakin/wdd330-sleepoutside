import { renderListWithTemplate } from "./utils.mjs";

/*The purpose of this script is to generate a list of product cards in HTML from an array*/
/*Add a class called ProductList and export this class as default. Start with the constructor*/
/*there are more than one category of products that will need to be independently listed. To make the ProductList class
as flexible and reusable as possible, the constructor should receive the parameters: category, dataSource,
and the HTML element (listElement) as an output target*/
function productCardTemplate(product, productUrl = "#") {
    return `
      <li class="product-card">
        <a href="${productUrl}">
          <img src="${product.Image.replace("../", "/")}" alt="${product.NameWithoutBrand}" />
          <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
        </a>
      </li>
    `;
}

const productPageMap = {
    "880RR": "/product_pages/marmot-ajax-3.html",
    "989CG": "/product_pages/northface-talus-4.html",
    "985PR": "/product_pages/northface-alpine-3.html",
    "344YJ": "/product_pages/cedar-ridge-rimrock-2.html",
};

function resolveProductUrl(product) {
    return productPageMap[product.Id] || "#";
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    /*Next, add a method called renderList(). This method will be responsible for generating the HTML for the product cards
    and inserting them into the listElement */
    async renderList(products = null, options = {}) {
        const {
            listElement = this.listElement,
            template = productCardTemplate,
            linkResolver = resolveProductUrl,
            position = "replace",
            insertMode,
            clear = false,
        } = options;

        const items = products ?? await this.dataSource.getData();

        const renderPosition = (insertMode ?? position) === "afterbegin" ? "afterbegin" : "replace";
        const templateFn = (product) => template(product, linkResolver(product));

        renderListWithTemplate(templateFn, listElement, items, renderPosition, clear);

        return items;
    }
}   