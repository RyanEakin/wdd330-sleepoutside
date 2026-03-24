// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  if (localStorage.getItem(key) !== null && localStorage.getItem(key) !== '') {
    // this if statement works to prevent any error where the key's value is empty
    return JSON.parse(localStorage.getItem(key));
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 *  Returns a specified url parameter.
 * 
 * @param {String} param   The parameter value to be returned.
 * @returns {String|null}  The parameter value if it exists, null if not.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
    // if clear is true then clear the parentElement

  }
  const htmlStrings = list.map(templateFn)
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (callback) { // if there is a callback function (true), then run this code
    callback(data); // this executes the function in 'callback' parameter with the parameter of data

  }
  parentElement.innerHTML = `${template}`; // this adds the  template to the selected element in the webpage
}

export async function loadTemplate(fPath) {
  const templateFile = await fetch(fPath); // this collects the file contents from the path
  const templateHTML = await templateFile.text(); // this makes the contents into a string
  return templateHTML;
}

export async function LoadHeaderFooter() {// had to change to async so below awaits would work... should've seen that coming.
  // 1. load the header and footer templates
  const headerTemplate = await loadTemplate('../partials/header.html');
  const footerTemplate = await loadTemplate('../partials/footer.html');

  // 2. grab the header and footer placeholder elements out of the Document Object Model
  const face = document.getElementById('head'); // header
  const boot = document.getElementById('foot'); // footer

  // 3. render the header and footer
  renderWithTemplate(headerTemplate, face); // renders header at selected header element ID
  renderWithTemplate(footerTemplate, boot); // renders footer at selected footer element ID

  await updateCartItemCount();
  if (!window.location.pathname.includes("product_listing")) initBreadcrumb();
}

/**
 *  Checks whether there are any items in the cart and
 *    toggles the `show` class to the element to show
 *    the count if there is more than 1 item. Otherwise
 *    it will hide the counter element.
 * 
 *  Used by all pages which is why it's in utils.
 */
export async function updateCartItemCount() {
  const cart = getLocalStorage("so-cart") || [];
  const itemCount = document.getElementById("cart-item-count");

  //                 .toggle(token: string, force?: boolean)
  itemCount.classList.toggle('show', cart.length > 0);

  if (cart.length > 0) {
    itemCount.textContent = cart.length;
  }
}

/**
 *  Initializes the breadcrumb navigation for the site.
 * 
 *  All pages other than the `Home` page will have this
 *    navigator. This will set the nav element, build
 *    the breadcrumb path and display it to the user
 * 
 *  ////////////////////////////////////////////////////
 *  //#TODO:
 *  //This function had been used and developed in tandem
 *  //  with the w03 homepage API changes to the category
 *  //  and product listings.
 *  ////////////////////////////////////////////////////
 */
export function initBreadcrumb(options = {}) {
  // Capitalize for product listign
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  const category = getParam('category');
  const categoryLabel = options.label ?? (category ? category : null);
  const HIERARCHY = ["", "product_listing", "product_pages"];
  const LABELS = {
    "":                { label: "Home",     href: "/" },
    "product_listing": { label: categoryLabel && options.count? `${capitalize(categoryLabel)} (${options.count} items)` : "Listing", href: `/product_listing/?category=${category}` },
    "product_pages":   { label: categoryLabel ?? "Product", href: "/product_pages/" },
    "cart":            { label: "Cart",     href: "/cart/" },
    "checkout":        { label: "Checkout", href: "/checkout/" },
  };

  // If the header isn't loaded then return
  const headerEl = document.querySelector('header');
  if (!headerEl) return;

  // Splits the 'URL' to get the current page
  const current = window.location.pathname.split("/").filter(p => p.length > 0)[0] ?? ""; // nullish coalescing operator
  console.log(`current: ${current}`)
  // Return if we're at the home page
  if (!current || current === 'index.html') return;

  // Adding the breadcrumbs after the `header` element, before the `main` element
  headerEl.insertAdjacentHTML('afterend', '<nav id="breadcrumb" class="breadcrumb-container" aria-label="breadcrumb"></nav>')
  const container = document.querySelector('.breadcrumb-container');

  // Finds the position of the current page in the array.
  const hierarchyIndex = HIERARCHY.indexOf(current);
  // If the current page is found
  const crumbs = hierarchyIndex >= 0
    // Slice's hierarchy up to current page, maps each key to its label object
    ? HIERARCHY.slice(0, hierarchyIndex + 1).map(key => LABELS[key])
    // Not in hierarchy (cart/checkout pages), just show home and current page
    : [LABELS[""], LABELS[current]].filter(l => l !== undefined);

  // For each crumb, we're adding a link to the `previous` page, the last displays the current page
  container.innerHTML = crumbs.map((c, i) => i < crumbs.length - 1
    ? `<a class="breadcrumb item" href="${c.href}">${c.label}</a>`
    : `<span class="breadcrumb item">${c.label}</span>`
  ).join(" &#10095; ");
}