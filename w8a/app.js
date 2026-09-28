console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

// Week 7.1: Now supports deleting entries from the table.


// Declare a 'const' array to hold all submitted carbon footprint entries in memory.
// We use 'const' because the 'carbonFootprintEntries' variable will always refer
// to the same array, even though the array's contents will change (items added).
const carbonFootprintEntries = [];   // Empty Array Literal - Global variable

// References the main carbon footprint form.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// References the Clear Form button.
const clearFormButton = document.getElementById('clearFormButton');

// Get reference to Clear All Data button
const clearAllDataButton = document.getElementById('clearAllDataButton');

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false;
let clearAllTimeoutId = null;   // error fixed: changed const to let, so value can be reassigned later

// New function for resetClearAllButton
// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function() {
    // Clears any pending confirmation timeout.
    console.log(clearAllTimeoutId);
    // If a timeout is active (meaning the button is in a confirming state), clear it.
    if (clearAllTimeoutId) {
        clearTimeout(clearAllTimeoutId);
    }
    // Reset the confirmation state
    isConfirmingClearAll = false;
    // Restore original button text and remove any special styling class.
    clearAllDataButton.textContent = `Clear All Saved Data`;
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllDataButton.classList.add('danger-button');
};

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function() {
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    // add to any function that updates DOM
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
};


// Handles form submission and collects the household member count.
const handleFormSubmit = function(event) {
    event.preventDefault();
    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };

    // Add the new entry to our 'carbonFootprintEntries' array.
    // Log the full array!
    carbonFootprintEntries.push(newEntry);
    console.log(carbonFootprintEntries);

    // Save the entire 'carbonFootprintEntries' array to localStorage using our storage module.
    storage.saveEntries(carbonFootprintEntries);

    resultsDisplay.displayResults(calculatedResults);
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    resetAllUIStates();
};

// New function to perform the actual clearing of all saved data.
const performClearAllData = function() {
    // Setting length to 0 efficiently clears the array while keeping its const reference.
    carbonFootprintEntries.length = 0;
    console.log("In-memory array cleared:", carbonFootprintEntries);
    storage.clearAllEntries();
    // Re-render table (will show "No entries")
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    // Clear the form inputs
    formHandler.clearForm();
    // Hide the results section
    resultsDisplay.hideResults();
    resetAllUIStates();
};

// Handles clearing and resetting the form fields.
const handleClearForm = function() {
    formHandler.clearForm();
    resultsDisplay.hideResults();
    console.log('Clear button clicked');
    resetAllUIStates();
};

// Handles the "Delete" action for a specific entry.
const handleDeleteEntry = function(id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7`);
    // 1. Find the index of the entry to delete in our in-memory array.
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry) {
        return entry.id === id;
    });
    
    if (indexToDelete !== -1) {
        // 2. Remove the entry from the in-memory array using splice().
        carbonFootprintEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);
        // 3. Save the modified (smaller) array back to localStorage.
        storage.saveEntries(carbonFootprintEntries);
        // 4. Re-render the table to reflect the deletion.
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        // 5. If the table is now empty, hide the results section and clear the form.
        if (carbonFootprintEntries.length === 0) {
            resultsDisplay.hideResults();
            formHandler.clearForm();
        }
        // Reset states even if entry not found (e.g., error case)
        resetAllUIStates();
    } else {
        console.log(`Did not find index`);
        resetAllUIStates();
    }

};

// Handles the "Edit" button click for a specific entry.
const handleEditEntry = function(id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7`);
    
    resetAllUIStates();
};



// Initializes the application and attaches event listeners.
const init = function() {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
    resultsDisplay.hideResults();
    // On startup, attempt to load any previously saved entries from localStorage.
    const loadedEntries = storage.loadEntries();
    if (loadedEntries.length > 0) {
        // If data was loaded, add all entries from loadedEntries into our main
        // carbonFootprintEntries array using the spread operator (...).
        carbonFootprintEntries.push(...loadedEntries);
        console.log(`Entries loaded from localStorage`);
    } else {
        console.log(`No entries found in localStorage Starting fresh`);
    }

    // test handleEntry function
    // handleDeleteEntry("1790297635991");

    // Render the table immediately on page load with any loaded data.
    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    // init function - Event listener for "Clear All Data"
    clearAllDataButton.addEventListener('click', function(event) {
        event.stopPropagation();

        if (isConfirmingClearAll) {
            performClearAllData();
        } else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = `Are you sure? Click again`;
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeoutId = setTimeout(function() {
                resetClearAllButton();
                console.log(`Clear All confirmation timed out`);
            }, 3000);
        }
    });

    // Global click listener to reset the "Clear All Data" button state
    // if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event) {
        // console.log(event.target);
        if (isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        }
    });


};

// Waits for the DOM to load before initializing the application.
document.addEventListener('DOMContentLoaded', init);