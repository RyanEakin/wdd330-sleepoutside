import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}


export default class CheckoutProcess {
    constructor(key,outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        const cart = new ShoppingCart(".product-list");
        cart.renderCartContents();
        //this code portion is so that I can have a fancy list within the checkout


        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal(this.list); //calculates subtotal value
        
        this.taxShipTotal(); // calculates the tax, shipping, and total prices
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0); // lifted from ShoppingCart
    }


    taxShipTotal() {
        this.tax = this.itemTotal * .06; // multiplies current subtotal by 6%
        this.shipping = 10 * (this.list.length * 2); // multiplies the length of the product list by 2 + the inital 10
        this.orderTotal = this.itemTotal + this.tax + this.shipping; // gets the total price

        this.displayOrderTotals();
    }

    displayOrderTotals(){
        const tax = qs(`${this.outputSelector} #tax`);
        tax.innerText = `$${this.tax.toFixed(2)}`;
        // this two line block first, gets the element needed for tax via qs and the class and id tags;
        // then it collects the information that was placed within this.const from the constructor
        //  and then it adds its value to the text of the element selected

        const ship = qs(`${this.outputSelector} #ship`);
        ship.innerText = `$${this.shipping.toFixed(2)}`;

        const total = qs(`${this.outputSelector} #orderTotal`);
        total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    packageItems(items){
        const htmlItems = items.map((item) => {
                //console.log(items)
                return { 
                    // this acts like a filter only returning THESE values
                    //  as a new element within the new array
                    id: item.Id,
                    price: item.FinalPrice,
                    name: item.Name,
                    quantity: 1,
                };
        });
        return htmlItems;
    }
    async checkout(){

        const fElement = document.forms["checkout-form"];
        const list = formToJSON(fElement);

        list.orderDate = new Date().toISOString();
        list.orderTotal = this.orderTotal.toFixed(2);
        list.tax = this.tax.toFixed(2);
        list.shipping = this.shipping;
        list.items = this.packageItems(this.list);
        console.log(list);

    try {
      const response = await services.checkout(list);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
    }