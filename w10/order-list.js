// variable to store and pass callbacks (ex. onDelete, onEdit)
let moduleCallbacks = {};

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

// event delegation: listen for clicks within element (tbody) then fires function
// event is the click; target is what user clicked
orderTableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    // 3. Determine which button was clicked and fire off the right function if it exists
    if (target.classList.contains('delete-btn') && moduleCallbacks.onDelete) moduleCallbacks.onDelete(id);
    else if (target.classList.contains('edit-btn') && moduleCallbacks.onEdit) moduleCallbacks.onEdit(id);
});


// renderOrders function to render table rows
// orderList.renderOrders in app.js passes (orders, {...}); orders=orders, {...}=callbacks
// empties table/prevent duplicates; changes displays
// for each order, create row (<tr>) and add cells (<td>)
// appendChild adds new row to end of table parent
export const renderOrders = function(orders, callbacks) {
    // Save the callbacks for later
    moduleCallbacks = callbacks;

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
            <td>
                <button class="edit-btn" data-id="${order.id}">Edit</button>
                <button class="delete-btn" data-id="${order.id}">Delete</button>
            </td>
        `;

        orderTableBody.appendChild(row);
    };

};




