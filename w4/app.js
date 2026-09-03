console.log('Hello from app.js! Your JavaScript is connected and running!');

// connect module order-handler.js
import * as orderForm from "./order-handler.js";

// reference to form id
const shirtOrderForm = document.getElementById('order-form');

// reference to order summary
const shirtOrderSummary = document.getElementById('order-summary');

// handleOrderSubmit function: import data from module, message changes
// remember: ${variable} is undefined; you need ${orderData.variable} instead
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderData = orderForm.getOrderInputs();
    console.log(orderData);
    console.log(`Quantity: ${orderData.qty}. Size: ${orderData.size}. Gift wrap: ${orderData.giftWrap}`);
    shirtOrderSummary.textContent = `Your current order is ${orderData.qty} ${orderData.size} T-Shirt`;

    if (orderData.qty <= 1) {
        shirtOrderSummary.textContent += '.';
    } else if (orderData.qty === 8272026) {
        shirtOrderSummary.textContent += 's. (We offer a special discount for this exact number of shirts!)';
    } else {
        shirtOrderSummary.textContent += 's.';
    };

    if (orderData.giftWrap === true) {
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
