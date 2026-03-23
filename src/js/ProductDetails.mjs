import { getLocalStorage, setLocalStorage, updateCartItemCount } from "./utils.mjs";


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));
  }

  addProductToCart(product) {
    // Get stored cart, or set as empty array
    let cart = getLocalStorage("so-cart") || [];

    cart.push(product);

    setLocalStorage("so-cart", cart);
    updateCartItemCount() // Update cart item badge count
  }

  // add to cart button event handler
  async addToCartHandler(e) {
    const product = await this.dataSource.findProductById(e.target.dataset.id);
    this.addProductToCart(product);
  }

  renderProductDetails() {
    const p = this.product;
    document.querySelector('main').innerHTML = `
      <section class="product-detail">
        <h3>${p.Brand.Name}</h3>
        <h2 class="divider">${p.NameWithoutBrand}</h2>
        <img class="divider" src="${p?.Image ? p.Image : p.Images.PrimaryLarge}" alt="${p.NameWithoutBrand}" loading="lazy">
        <p class="product-card__price">$${p.FinalPrice}</p>
        <p class="product__color">${p.Colors[0].ColorName}</p>
        <p class="product__description">${p.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${p.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}