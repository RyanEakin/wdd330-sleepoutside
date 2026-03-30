import { LoadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

LoadHeaderFooter(); // dynamically loads the header and footer

const key = 'so-cart';
const checkout = new CheckoutProcess(key, '#order-summary')
checkout.init()

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const checkStatus = myForm.checkValidity();
  myForm.reportValidity();

  if (checkStatus) {
    checkout.checkout(myForm);
  }
});
