console.log('Hello from app.js! Your JavaScript is connected and running!');
// --- Part 1: Select HTML Elements ----
// We use document.getElementById() to get a reference to an element by its unique ID.
// We store these references in 'const' variables because the elements themselves won't change.
const totalDisplayElement = document.getElementById("total-display");
const addItemButton = document.getElementById("add-item-btn");

// 'let' variables change, 'const' do not
const itemPrice = 15;
let totalCost = 0;
// console.log(`The item price is ${itemPrice}. Your total cost is currently ${totalCost}.`);

// function to record effect of a click
const handleButtonClick = function() {
    totalCost += 1;
    // Template strings (literal) to easily combine our variables and text into one message
    let message = `Hello! You have clicked the button ${totalCost} time(s).`;

    // 'if' 'else' function to change message + color based on totalCost
    if(totalCost >= 5) {
        // We can even change the style of an HTML element directly with JavaScript!
        // Change text color
        message += ' WOW, you are a super clicker!';
        totalDisplayElement.style.color = 'purple';
    } else {
        totalDisplayElement.style.color = '#333';
    }
    // Update the text content of our paragraph element on the page.
    // This is how JavaScript makes changes visible on the web page!
    totalDisplayElement.textContent = message;

    console.log(`Button Clicked! Current click count: ${totalCost}`);
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