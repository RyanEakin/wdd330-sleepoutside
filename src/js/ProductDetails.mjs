import ProductData from "./ProductData.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId; // specific item value
        this.product = {};
        this.dataSource = dataSource; // category
    }
    async init() {

        this.product = await this.dataSource.findProductById(this.productId); //this looks for the specific product and returns its ID
        //console.log(this.product); //used to display contents of the product object for referencing keys
        this.renderProductDetails();
        // this.renderProductDetails is used because this is WITHIN the class and not outside of it. this = className

        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {// the parameter above is no longer needed due to the product being within the same class
        // Get stored cart, or set as empty array
        const cart = getLocalStorage("so-cart") || [];

        cart.push(this.product); //changed this to this.product due to it not working WITHOUT this change

        setLocalStorage("so-cart", cart);
    }

    renderProductDetails() {
        document.querySelector(".productPage").innerHTML = productTemplate(this.product);
        // apparently needed to add the dot so that it recognized it as a class. also made sure to add changes to the dom via ".innerHTML"
    }

}

function productTemplate(product) {
    //console.log(product.Brand.Name); // used to see what values were present
    document.title = `Sleep Outside | ${product.Name}`; // changes title to tent name
    const productPrice = `\$${product.ListPrice}`

    //decided to use template literals due to them being easier and also more intuitive then using CreateElement() over and over... also more concise
    return `<section class="product-detail"><h3>${product.Brand.Name}</h3><h2 class="divider">${product.NameWithoutBrand}</h2><img class="divider"src="${product.Image}"alt="${product.NameWithoutBrand}" /><p class="product-card__price">${productPrice}</p><p class="product__color">${product.Colors[0].ColorName}</p><p class="product__description">${product.DescriptionHtmlSimple}</p><div class="product-detail__add"><button id="addToCart" data-id="${product.Id}">Add to Cart</button></div></section>`
}