// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
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
 *  Checks whether there are any items in the cart and
 *    toggles the `show` class to the element to show
 *    the count if there is more than 1 item. Otherwise
 *    it will hide the counter element.
 * 
 *  Used by all pages which is why it's in utils.
 */
export function updateCartItemCount() {
  const cart = getLocalStorage("so-cart");
  const itemCount = document.getElementById("cart-item-count");

  //                 .toggle(token: string, force?: boolean)
  itemCount.classList.toggle('show', cart.length > 0);

  if (cart.length > 0) {
    itemCount.textContent = cart.length;
  }
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
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Similar to renderListWithTemplate, the parent element inserts the template as HTML
function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

/**
 *  Fetches the requested url, returning the requested data as a String.
 * 
 * @param {String} path  The url to fetch from.
 * @returns {String}     The content response of the fetched url as a String.
 */
async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    const template = await res.text();

    return template;
  } catch (e) {
    console.error(`Error in loadTemplate: ${e}`);
  }
}

// Loads the header and footer content for the page elements
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html')
  const footerTemplate = await loadTemplate('../partials/footer.html')
  const headerElement = document.getElementById('main-header')
  const footerElement = document.getElementById('main-footer')

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)
}