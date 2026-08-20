console.log('Hello from app.js! Your JavaScript is connected and running!');

// We use document.getElementById() to get a reference to an element by its unique ID in HTML file
// We store these references in 'const' variables because the elements themselves won't change.
const totalDisplayElement = document.getElementById("total-display");
const addItemButton = document.getElementById("add-item-btn");

// 'let' variables change, 'const' do not
const itemPrice = 15;
let totalCost = 0;

// function to record effect of a click (adds itemPrice to totalCost)
const handleButtonClick = function() {
    totalCost += itemPrice;
    let message = `Current total: $${totalCost}`;

    // 'if' 'else' function to change message + color based on totalCost
    if(totalCost >= 60) {
        message += ' (Over budget!)';
        totalDisplayElement.style.color = 'red';
    } else {
        totalDisplayElement.style.color = 'black';
    }

    totalDisplayElement.textContent = message;

    console.log(`Item added! Total cost: ${totalCost}`);
};


document.addEventListener('DOMContentLoaded', function(){
    // --- Part 3: Make the Button Clickable (Event Listener) ---
    // This part ensures our JavaScript code runs only AFTER the HTML is fully loaded and parsed.
    // The 'DOMContentLoaded' event is perfect for this. It fires when the HTML document is ready.

    console.log(`DOM fully loaded and parsed, App is ready for interaction`);
    // Attach an event listener to variable addItemButton
    // When addItemButton receives a 'click' event, the 'handleButtonClick' function will execute.
    addItemButton.addEventListener('click', handleButtonClick);

    totalDisplayElement.textContent = `Welcome! Click the button below to start counting.`;
});