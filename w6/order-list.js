// get reference to tbody
const orderTableBody = document.getElementById('order-table-body');

// formatDateForDisplay function to show date as MTH DD, YYYY
const formatDateForDisplay = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

// giftWrapMessage function yanked from results-display.js
const giftWrapMessage = function(giftWrap) {
    if (giftWrap) return 'Yes';
    return 'No';
};

// renderOrders function to render table rows
export const renderOrders = function(orders) {

    orderTableBody.innerHTML = ``;

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




