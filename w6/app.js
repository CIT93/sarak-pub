console.log('Hello from app.js! Your JavaScript is connected and running!');

// connect modules
import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
// import * as resultsDisplay from "./results-display.js";
import * as orderStorage from "./order-storage.js";
import * as orderList from "./order-list.js";

// entry array literal
const orders = [];

// reference to form id
const shirtOrderForm = document.getElementById('order-form');

// reference to clear form button
const clearFormButton = shirtOrderForm.querySelector('#clear-form-button');

// handleOrderSubmit function: import data from module, message changes
// remember: ${variable} is undefined; you need ${orderData.variable} instead
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderData = orderForm.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(orderData);
    const newOrder = {
        ...orderData,
        ...calculatedPrice,
        timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    console.log(orders);
    orderStorage.saveOrders(orders);
    // resultsDisplay.displayOrder(newOrder);
    orderList.renderOrders(orders);
};

// handleClearForm function to reset form
const handleClearForm = function() {
    orderForm.clearForm();
    // resultsDisplay.hideResults();
};

// init function: listens for submit, then calls handleOrderSubmit function
const init = function() {
    console.log(`App initialized for init function!`);

    const loadedOrders = orderStorage.loadOrders();
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        console.log(`Orders loaded from localStorage`);
        orderList.renderOrders(orders);
    } else {
        console.log(`No orders found in localStorage; starting fresh`);
    };

    shirtOrderForm.addEventListener('submit', handleOrderSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
};

// waits for the DOM, then calls init function
document.addEventListener ('DOMContentLoaded', init);
