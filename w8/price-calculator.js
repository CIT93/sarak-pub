// price-calculator.js module to calculate orderData, export to main app.js

// set price for shirt at 15
const shirtPrice = 15;

// calculate price for giftwrap at 2 if true, 0 if false
 const calculateGiftWrapPrice = function(giftWrap) {
     if (giftWrap) return 2;
     return 0;
};

// can replace orderData with data for resilience
export const calculateTotal = function(orderData) {
    const giftWrapPrice = calculateGiftWrapPrice(orderData.giftWrap);
    const totalCalculatedPrice = (orderData.qty * shirtPrice) + giftWrapPrice;
    return {
        totalPrice: totalCalculatedPrice
    };
};


// alternatively?
// totalPrice: (orderData.qty * shirtPrice) + giftWrapPrice