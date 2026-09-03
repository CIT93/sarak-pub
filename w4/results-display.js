// results-display.js module to display data

// grab references
const orderSummaryContainer = document.getElementById('order-summary');

const totalPriceDisplay = orderSummaryContainer.querySelector('#display-total');
const qtyDisplay = orderSummaryContainer.querySelector('#display-qty');
const sizeDisplay = orderSummaryContainer.querySelector('#display-size');
const giftWrapDisplay = orderSummaryContainer.querySelector('#display-gift');

// determine yes/no if giftWrap is true/false
const giftWrapMessage = function(giftWrap) {
    if (giftWrap) return 'Yes';
    return 'No';
};

// show order summary data
export const displayResults = function(results) {
    totalPriceDisplay.textContent = `${results.totalPrice.toFixed(2)}`;
    qtyDisplay.textContent = `${results.qty.toFixed(0)}`;
    sizeDisplay.textContent = `${results.size}`;
    giftWrapDisplay.textContent = giftWrapMessage(results.giftWrap);

    orderSummaryContainer.style.display = 'block';
};

// hide/reset order summary data
export const hideResults = function() {
    totalPriceDisplay.textContent = ``;
    qtyDisplay.textContent = ``;
    sizeDisplay.textContent = ``;
    giftWrapDisplay.textContent = ``;

    orderSummaryContainer.style.display = 'none';
};