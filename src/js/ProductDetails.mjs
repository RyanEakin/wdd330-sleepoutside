import { getLocalStorage, setLocalStorage, updateCartItemCount, alertMessage } from "./utils.mjs";


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
        const existingItem = cart.find(item => item.Id === this.product.Id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...this.product, quantity: 1 });
        }

        setLocalStorage("so-cart", cart);
        updateCartItemCount();
        // Set timeout for message to disappear after adding to cart
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`, false, true);
    }

    renderProductDetails() {
        document.querySelector(".productPage").innerHTML = productTemplate(this.product);
        // apparently needed to add the dot so that it recognized it as a class. also made sure to add changes to the dom via ".innerHTML"
    }

}

function productTemplate(product) {
    //console.log(product.Brand.Name); // used to see what values were present
    document.title = `Sleep Outside | ${product.Name}`; // changes title to tent name

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

    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3> 
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
        
        <div class="price-container">
            ${discountIndicator}
            <p class="product-card__price">$${finalPrice}</p>
            ${strikePrice}
        </div>

        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
}