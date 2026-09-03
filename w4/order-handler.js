// order-handler.js module to collect the data and export to main app.js

// grab references
const shirtOrderForm = document.getElementById('order-form');

const quantityInput = shirtOrderForm.querySelector('#qty');
const giftWrapInput = shirtOrderForm.querySelector('#gift-wrap');
const sizeInputRadios = shirtOrderForm.querySelectorAll('input[name="size"]');

// evaluate radio selection; checks if radio option is selected (radio.checked)
// then returns it to variable getSelectedRadio, assigning it that value (radio.value)
// const radio refers to each individual radio option
// radioButtons is the function name (?)
const getSelectedRadio = function(radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) return radio.value;
    };
};

// export collected data back to main app.js w/ object literal
// return assigns the obj lit to variable getOrderInputs
export const getOrderInputs = function() {
    return {
        qty: parseInt(quantityInput.value) || 1,
        size: getSelectedRadio(sizeInputRadios),
        giftWrap: giftWrapInput.checked
    };
};

// clearForm function to reset form, restore defaults
export const clearForm = function() {
    shirtOrderForm.reset();
    quantityInput.value = 1;
    giftWrapInput.checked = false;
    sizeInputRadios[0].checked;
};