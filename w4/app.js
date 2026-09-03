console.log('Hello from app.js! Your JavaScript is connected and running!');

// connect module order-handler.js
import * as orderForm from "./order-handler.js";

// reference to form id
const shirtOrderForm = document.getElementById('order-form');

// reference to order summary
const shirtOrderSummary = document.getElementById('order-summary');

// handleOrderSubmit function: import data from module, message changes
// remember: ${variable} is undefined; you need ${orderFormData.variable} instead
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderFormData = orderForm.getOrderInputs();
    console.log(orderFormData);
    console.log(`Quantity is ${orderFormData.qty}.`);
    console.log(`Size is ${orderFormData.size}.`);
    console.log(`Gift wrap is ${orderFormData.giftWrap}.`);
    shirtOrderSummary.textContent = `Your current order is ${orderFormData.qty} ${orderFormData.size} T-Shirt`;

    if (orderFormData.qty <= 1) {
        shirtOrderSummary.textContent += '.';
    } else if (orderFormData.qty === 8272026) {
        shirtOrderSummary.textContent += 's. (We offer a special discount for this exact number of shirts!)';
    } else {
        shirtOrderSummary.textContent += 's.';
    };

    if (orderFormData.giftWrap === true) {
        shirtOrderSummary.textContent += ' Gift wrap added!';
    };

};

// init function: listens for submit, then calls handleOrderSubmit function
const init = function() {
    console.log(`App initialized for init function!`);
    shirtOrderForm.addEventListener('submit', handleOrderSubmit);
};

// waits for the DOM, then calls init function
document.addEventListener ('DOMContentLoaded', init);
