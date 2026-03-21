import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const productId = getParam("product") || document.getElementById("addToCart")?.dataset.id;
const category = getParam("category") || "tents";

function renderProduct(product) {
  const productDetail = document.querySelector(".product-detail");

  if (!productDetail) {
    return;
  }

  const color = product.Colors?.[0]?.ColorName || "";
  const image = product.Images?.PrimaryLarge || product.Images?.PrimaryMedium || "";

  document.title = `Sleep Outside | ${product.Name}`;
  productDetail.innerHTML = `
    <h3>${product.Brand?.Name || ""}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${image}" alt="${product.NameWithoutBrand}" />
    <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
    <p class="product__color">${color}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}" data-category="${product.Category || category}">Add to Cart</button>
    </div>
  `;

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

async function initProductPage() {
  if (!productId) {
    return;
  }

  const product = await dataSource.findProductById(productId);
  renderProduct(product);
}

function addProductToCart(product) {
  const stored = getLocalStorage("so-cart");
  const cart = Array.isArray(stored) ? stored : stored ? [stored] : [];
  const existing = cart.find((item) => item.Id === product.Id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

initProductPage();
