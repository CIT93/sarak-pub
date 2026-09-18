// get references to main section, table, tbody, msg, btn
const orderHistorySection = document.getElementById('order-history-section');

const orderTable = orderHistorySection.querySelector('#order-table');
const orderTableBody = orderHistorySection.querySelector('#order-table-body');
const orderHistoryMessage = orderHistorySection.querySelector('#orderHistoryMessage');
const clearOrderHistoryButton = orderHistorySection.querySelector('#clear-btn');

// formatDateForDisplay function
// show date as MTH DD, YYYY
const formatDateForDisplay = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

// giftWrapMessage function yanked from results-display.js
// displays giftWrap value as yes/no instead of true/false
const giftWrapMessage = function(giftWrap) {
    if (giftWrap) return 'Yes';
    return 'No';
};

// renderOrders function to render table rows
// empties table; prevent duplicates
// changes displays; e.g. no orders in localStorage, don't display table
// for each order, create row (<tr>) and add cells (<td>)
// appendChild adds new row to end of table parent
export const renderOrders = function(orders) {

    orderTableBody.innerHTML = ``;

    if (orders.length === 0) {
        orderTable.style.display = 'none';
        orderHistoryMessage.style.display = 'block';
        clearOrderHistoryButton.style.display = 'none';
        return;
    } else {
        orderTable.style.display = 'table';
        orderHistoryMessage.style.display = 'none';
        clearOrderHistoryButton.style.display = 'block';
    };

    for(const order of orders) {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDateForDisplay(order.timestamp)}</td>
            <td>${order.qty.toFixed(0)}</td>
            <td>${order.size}</td>
            <td>${giftWrapMessage(order.giftWrap)}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
            <td>TBA</td>
        `;

        orderTableBody.appendChild(row);

    };

};




