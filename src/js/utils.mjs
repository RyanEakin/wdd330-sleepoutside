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
//make a new function called renderListWithTemplate and export it.It has 5 arguments:templateFn, parentElement, list, position, and clear.
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  let html = "";
  list.forEach((item) => {
    html += templateFn(item);
  });
  if (clear) {
    parentElement.innerHTML = "";
  }
  if (position === "afterbegin") {
    parentElement.insertAdjacentHTML("afterbegin", html);
  } else {
    parentElement.innerHTML = html;
  }
}   