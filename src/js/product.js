import { alertMessage, getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const commentsStorageKey = "so-comments";
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
    <section class="product-comments">
      <h3>Customer Comments</h3>
      <form id="comment-form" class="comment-form">
        <label for="comment-name">Name</label>
        <input id="comment-name" name="name" type="text" required />

        <label for="comment-text">Comment</label>
        <textarea id="comment-text" name="comment" rows="3" required></textarea>

        <button type="submit">Add Comment</button>
      </form>
      <ul id="comments-list" class="comments-list"></ul>
    </section>
  `;

  document.getElementById("addToCart").addEventListener("click", addToCartHandler);
  document.getElementById("comment-form").addEventListener("submit", handleCommentSubmit);

  renderComments(product.Id);
}

function getCommentsByProductId(id) {
  const stored = getLocalStorage(commentsStorageKey) || {};
  return stored[id] || [];
}

function saveComment(productIdValue, comment) {
  const stored = getLocalStorage(commentsStorageKey) || {};
  const currentComments = stored[productIdValue] || [];

  stored[productIdValue] = [comment, ...currentComments];
  setLocalStorage(commentsStorageKey, stored);
}

function renderComments(id) {
  const commentsList = document.querySelector("#comments-list");
  if (!commentsList) return;

  const comments = getCommentsByProductId(id);
  if (!comments.length) {
    commentsList.innerHTML = "<li class=\"comment-empty\">No comments yet. Be the first to comment.</li>";
    return;
  }

  commentsList.innerHTML = comments
    .map(
      (comment) => `
      <li class="comment-item">
        <p class="comment-meta">${comment.name} · ${new Date(comment.date).toLocaleDateString()}</p>
        <p>${comment.text}</p>
      </li>
    `
    )
    .join("");
}

function handleCommentSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const valid = form.checkValidity();
  form.reportValidity();
  if (!valid || !productId) return;

  const formData = new FormData(form);
  const comment = {
    name: String(formData.get("name") || "").trim(),
    text: String(formData.get("comment") || "").trim(),
    date: new Date().toISOString(),
  };

  if (!comment.name || !comment.text) return;

  saveComment(productId, comment);
  renderComments(productId);
  form.reset();
  alertMessage("Comment added successfully.", false);
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
  alertMessage(`${product.NameWithoutBrand} was added to your cart.`, false);
}

initProductPage();
