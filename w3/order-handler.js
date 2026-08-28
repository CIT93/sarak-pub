// order-handler.js module to collect the data and export to main app.js

// get form id
const shirtOrderForm = document.getElementById('order-form');

// get quantity input (number)
const quantityInput = shirtOrderForm.querySelector('#qty');

// get gift wrap input (check)
const giftWrapInput = shirtOrderForm.querySelector('#gift-wrap');

// get size input (radiooooo) (multiple inputs, use query all)
const sizeInputRadios = shirtOrderForm.querySelectorAll('input[name="size"]');

// evaluate radio selection; checks if radio option is selected (radio.checked)
// then returns it to variable getSelectedRadio, assigning it that value (radio.value)
// const radio refers to each individual radio option
// radioButtons is the function name (?)
const getSelectedRadio = function(radioButtons) {
    for (const radio of radioButtons) {
        if (radio.checked) {
            // console.log(`Radio ${radio.value} is deemed ${radio.checked}`);
            return radio.value;
        };
    };
};


// export collected data back to main app.js w/ object literal
// return assigns the obj lit to variable getOrderInputs
// qty: parseInt = number, || sets default fallback value
// size: gets value of getSelectedRadio by running function radioButtons on sizeInputRadios
// giftWrap: checks if input is [un]selected
export const getOrderInputs = function() {
    return {
        qty: parseInt(quantityInput.value) || 1,
        size: getSelectedRadio(sizeInputRadios),
        giftWrap: giftWrapInput.checked
    };
};

