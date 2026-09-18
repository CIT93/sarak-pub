// order-storage.js module for storing data in localStorage

// define LOCAL_STORAGE_KEY
const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

// saveOrders function to store data in localStorage
// reminder: localStorage only handles strings (stringify time)
export const saveOrders = function(orders) {

    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
        console.log(`Data successfully saved to localStorage`);
    } catch (error) {
        console.error(`Error: Data not saved to localStorage - ${error}`);
    };

};

// loadOrders function
// parse turns string back into object (value we need)
export const loadOrders = function() {

    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) return JSON.parse(dataString);
        return [];
    } catch (error) {
        console.error(`Error: data not loaded from localStorage - ${error}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

};


// clearAllOrders to delete order history
export const clearAllOrders = function() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log(`All orders cleared from localStorage under key: ${LOCAL_STORAGE_KEY}`);
};