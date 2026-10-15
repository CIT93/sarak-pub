console.log('Hello from app.js! Your JavaScript is connected and running!');

// connect modules
// no resultsDisplay module = no access to resultsDisplay functions
import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
// import * as resultsDisplay from "./results-display.js";
import * as orderStorage from "./order-storage.js";
import * as orderList from "./order-list.js";

// entry array literal
const orders = [];

// reference to form ids
const shirtOrderForm = document.getElementById('order-form');
const hiddenOrderId = shirtOrderForm.querySelector('#order-id');

// reference to clear form button
const clearFormButton = shirtOrderForm.querySelector('#clear-form-button');

// reference to clear order history button
const clearOrderHistoryButton = document.getElementById('clear-btn');

// handleOrderSubmit function (place order btn)
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderData = orderForm.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(orderData);

    const orderToSave = {
        ...orderData,
        ...calculatedPrice,
    };

    if (hiddenOrderId.value) {
        const indexOfObject = orders.findIndex(function(order) {
            return order.id === hiddenOrderId.value;
        });
        if (indexOfObject !== -1) {
            orderToSave.timestamp = orders[indexOfObject].timestamp;
            orderToSave.id = orders[indexOfObject].id;
            orders[indexOfObject] = orderToSave;
        } else {
            console.warn(`Order ${hiddenOrderId.value} not found; adding as new order instead`);
            orderToSave.timestamp = new Date().toISOString();
            orderToSave.id = Date.now().toString();
            orders.push(orderToSave);
        }
    } else {
        orderToSave.timestamp = new Date().toISOString();
        orderToSave.id = Date.now().toString();
        orders.push(orderToSave);
    }

    console.log(orders);
    orderStorage.saveOrders(orders);
    // resultsDisplay.displayOrder(orderToSave);
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });

    orderForm.clearForm();
};

// handleClearForm function (clear form btn)
const handleClearForm = function() {
    orderForm.clearForm();
    // resultsDisplay.hideResults();
};

// handleClearOrderHistory function (clear order hist btn)
// empties orders array, removes localStorage data, rerenders table
const handleClearOrderHistory = function() {
    orders.length = 0;
    orderStorage.clearAllOrders();
    orderList.renderOrders(orders, {
        onDelete: handleDelete,
        onEdit: handleEdit
    });
    orderForm.clearForm();
};

// handleDelete function (table delete btn)
const handleDelete = function(id) {
    console.log(`App.js: Requesting delete for order`, id);

    const indexToDelete = orders.findIndex(function(order) {
        return order.id === id;
    });
    if (indexToDelete !== -1) {
        orders.splice(indexToDelete, 1);
        orderStorage.saveOrders(orders);
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
        console.log(`Successfully deleted order`, id);
    } else {
        console.log(`handleDelete: Index not found; no deletion occurred`);
    }

    orderForm.clearForm();
};

// handleEdit function (table edit btn)
const handleEdit = function(id) {
    console.log(`App.js: Requesting edit for order`, id);

    const orderToEdit = orders.find(function(order) {
        return order.id === id;
    });

    if (orderToEdit) {
        orderForm.populateFormForEdit(orderToEdit);
        console.log(`Editing order`, id);
    } else {
        console.log(`handleEdit: Order not found; no edit available`);
    }
};

// init function: includes eventListeners to trigger other functions
const init = function() {
    console.log(`App initialized for init function!`);

    const loadedOrders = orderStorage.loadOrders();
    if (loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        console.log(`Orders loaded from localStorage`);
        orderList.renderOrders(orders, {
            onDelete: handleDelete,
            onEdit: handleEdit
        });
    } else {
        console.log(`No orders found in localStorage; starting fresh`);
    };

    shirtOrderForm.addEventListener('submit', handleOrderSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    clearOrderHistoryButton.addEventListener('click', handleClearOrderHistory);
};

// waits for the DOM, then calls init function
document.addEventListener ('DOMContentLoaded', init);
