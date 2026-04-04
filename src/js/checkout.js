import { qs, LoadHeaderFooter, setLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

LoadHeaderFooter(); // dynamically loads the header and footer

const check = new CheckoutProcess("so-cart", ".cart-summary");
check.init();

qs("#checkingOut").addEventListener("click", (e) => {
    e.preventDefault();
    
    const checkForm = document.forms[0]; //grabs form data
    const validForm = checkForm.checkValidity(); // checks and stores the state of being (in)valid
    checkForm.reportValidity();// reports current validity state

    
    if(validForm){
        check.checkout();
        checkForm.submit(); // if it is based upon submit this would not be needed
    }
});
