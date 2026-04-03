import { LoadHeaderFooter, setLocalStorage, getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";

function cartItemTemplate(item) {
    const itemDelete = `<button class="cart-card_delete" id="${item.Id}">X</button>`;
    let li_type = `<li class="cart-card divider">`

    if(window.location.pathname === "/checkout/index.html"){
        li_type = `<li class="checkout-card divider">`
    }

    const newItem = `${li_type}
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  ${itemDelete}
</li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
    }

    renderCartContents() {
        const cartItems = getLocalStorage("so-cart");
        // selects the product-details list from the localstorage so-cart and places it into cartItems

        // Checks if cartItems exists before trying to render [this fixed the error that would have occured if we didn't check for cartItems existence]
        if (cartItems && cartItems.length > 0) {
            const htmlItems = cartItems.map((item) => cartItemTemplate(item));
            qs(this.listElement).innerHTML = htmlItems.join("");
            // this joins every entry from htmlItems into the listElement selected

            qs(this.listElement).addEventListener("click", (e) => {
                const btn = e.target.closest('.cart-card_delete');
                // adds an event listener to btn's with the cart-card_delete class
                if (!btn || !qs(this.listElement).contains(btn)) return;
                // checks if the element that has been acquired indeed has btn, if not return

                const prodId = btn.id;
                // console.log(prodId)

                this.removeItemById(prodId, btn);

            })

            // Calls the total function
            this.displayCartTotal(cartItems);
        }
        else {
            const emptyFooter = qs(".cart-footer")
            emptyFooter.classList.remove("hide"); // shows the cart footer visually

            const emptyTotal = qs(".cart-total"); // selects the object within the cart footer that shows the final price of the cart
            emptyTotal.innerHTML = "your cart is empty";
        }
    }

    removeItemById(id, btn) {
        const cartItems = getLocalStorage("so-cart") || []; // collects product cart from local storage

        let idx = cartItems.findIndex(i => String(i.Id) === String(id)); // finds first instance of product id and it's index value

        // console.log(idx)

        if (idx !== -1) { // if idx did not return an error (-1) then:
            cartItems.splice(idx, 1); // cut the item from the index point
            const dump = btn.closest('.cart-card'); // this selects the parent element of the button [the li element of the card]
            if (dump) dump.remove(); // this removes the product card that was selected [closest to the current button]

            setLocalStorage("so-cart", cartItems); // saves changes to cart
            this.renderCartContents(); // re-renders cart contents
            LoadHeaderFooter(); // re-renders the header and footer so that items in cart number update dynamically
        }


    }

    displayCartTotal(cartItems) {
        // there was no need for an if statement here due to the fact that this wouldn't render if renderShopContents function notes cartItems existence

        const footer = qs(".cart-footer"); //selects the footer of the cart which is below the product listings
        const totalElement = qs(".cart-total"); // selects the object within the cart footer that shows the final price of the cart

        if(footer){
            footer.classList.remove("hide"); // shows the cart footer visually
        }
        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        // this sums up the final price of the cart listings and their prices into a final price

        if(window.location.pathname === "/cart/index.html"){
            totalElement.innerText = `Total: \$${total.toFixed(2)}`;
        }
        else {
            totalElement.innerText = `Subtotal: \$${total.toFixed(2)}`;
        }
        // this showcases the cart total up to two decimal points to the right

    }

    animateCartIcon() {
        // Target the backpack icon (adjust selector if your HTML differs)
        const cartIcon = qs(".cart > a") || qs(".cart");
        
        if (cartIcon) {
            cartIcon.classList.add("animate-cart");

            // Remove the class after the animation ends (0.5s) to allow re-triggering
            cartIcon.addEventListener("animationend", () => {
                cartIcon.classList.remove("animate-cart");
            }, { once: true });
        }
    }
}