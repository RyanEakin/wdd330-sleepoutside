import { getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";

function cartItemTemplate(item) {
    const itemDelete = `<button class="cart-card_delete" >❌</button>`;
    
    const newItem = `<li class="cart-card divider">
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

            qs(this.listElement).addEventListener("click", (e)=> {
                const btn = e.target.closest('.cart-card_delete'); 
                // adds an event listener to btn's with the cart-card_delete class
                if (!btn || !qs(this.listElement).contains(btn)) return;
                // checks if the element that has been acquired indeed has btn, if not return

                qs(".cart-card").remove();
                this.removeItemById(id);

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

removeItemById(id) {
  const cartItems = getLocalStorage("so-cart") || [];
  const newItems = cartItems.filter(i => String(i.Id) !== String(id));
  setLocalStorage("so-cart", newItems); // however you save
  this.renderCartContents();
}

    displayCartTotal(cartItems) {
        // there was no need for an if statement here due to the fact that this wouldn't render if renderShopContents function notes cartItems existence

        const footer = qs(".cart-footer"); //selects the footer of the cart which is below the product listings
        const totalElement = qs(".cart-total"); // selects the object within the cart footer that shows the final price of the cart

        footer.classList.remove("hide"); // shows the cart footer visually

        const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        // this sums up the final price of the cart listings and their prices into a final price

        totalElement.innerText = `Total: \$${total.toFixed(2)}`;
        // this showcases the cart total up to two decimal points to the right

    }
}