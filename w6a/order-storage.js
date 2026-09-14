// order-storage.js module for storing data in localStorage

// define LOCAL_STORAGE_KEY
const tshirt_orders_data = 'orders';

// saveOrders function to store data in localStorage
// reminder: localStorage only handles strings (stringify time)
export const saveOrders = function(orders) {

    try {
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log(`Data successfully saved to localStorage`);
    } catch (error) {
        console.error(`Error: Data not saved to localStorage - ${error}`);
    };

};

// loadOrders function
// parse turns string back into object (value we need)
export const loadOrders = function() {

    try {
        const dataString = localStorage.getItem(tshirt_orders_data);
        if (dataString) return JSON.parse(dataString);
        return [];
    } catch (error) {
        console.error(`Error: data not loaded from localStorage - ${error}`);
        localStorage.removeItem(tshirt_orders_data);
    };

};