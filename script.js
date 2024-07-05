// Get necessary elements
const toggleCheckbox = document.getElementById('toggleCalculator');
const title = document.getElementById('title');
const calculatorborder = document.getElementById('calculatorContainer');
const calculatorbody = document.getElementById('calBody');
const buttons = document.querySelectorAll('button');
const buttonRight1 = document.getElementById('right1');
const buttonRight2 = document.getElementById('right2');
const buttonRight3 = document.getElementById('right3');
const buttonRight4 = document.getElementById('right4');
const buttonRight5 = document.getElementById('right5');
const resultDisplay1 = document.getElementById('resultDisplay');
const body = document.body;

// Define styles for light mode
const lightModeStyles = {
    body: {
        backgroundColor: 'white',
        color: 'black'
    },
    calculator: {
        backgroundColor: '#F1F2F3',
        borderColor: 'black'
    },
    buttons: {
        backgroundColor: '#E4E5E7',
        color: 'black'
    },
    rightButtons: {
        backgroundColor: '#4B5EFC',
        color: 'white'
    },
    resultDisplay1: {
        color: 'black'
    }
};

// Define styles for dark mode
const darkModeStyles = {
    body: {
        backgroundColor: 'black',
        color: 'white'
    },
    calculator: {
        backgroundColor: 'black',
        borderColor: 'white'
    },
    buttons: {
        backgroundColor: '#2E2F38',
        color: 'white'
    },
    rightButtons: {
        backgroundColor: '#4B5EFC',
        color: 'white'
    },
    resultDisplay1: {
        color: 'white'
    }
};

// Function to apply styles based on mode
function applyStyles(mode) {
    const styles = mode === 'light' ? lightModeStyles : darkModeStyles;

    body.style.backgroundColor = styles.body.backgroundColor;
    title.style.color = styles.body.color;
    calculatorborder.style.backgroundColor = styles.calculator.backgroundColor;
    calculatorborder.style.borderColor = styles.calculator.borderColor;
    calculatorbody.style.backgroundColor = styles.calculator.backgroundColor;
    
    buttons.forEach(button => {
        button.style.backgroundColor = styles.buttons.backgroundColor;
        button.style.color = styles.buttons.color;
    });
    
    buttonRight1.style.backgroundColor = styles.rightButtons.backgroundColor;
    buttonRight1.style.color = styles.rightButtons.color;
    buttonRight2.style.backgroundColor = styles.rightButtons.backgroundColor;
    buttonRight2.style.color = styles.rightButtons.color;
    buttonRight3.style.backgroundColor = styles.rightButtons.backgroundColor;
    buttonRight3.style.color = styles.rightButtons.color;
    buttonRight4.style.backgroundColor = styles.rightButtons.backgroundColor;
    buttonRight4.style.color = styles.rightButtons.color;
    buttonRight5.style.backgroundColor = styles.rightButtons.backgroundColor;
    buttonRight5.style.color = styles.rightButtons.color;
    resultDisplay1.style.color = styles.resultDisplay1.color;
    // Toggle scrollbar styles based on mode
    const historyDisplay = document.getElementById('historyDisplay');
    historyDisplay.classList.remove('light', 'dark'); // Remove existing classes
    historyDisplay.classList.add(mode); // Add current mode class
}


// Event listener for checkbox change
toggleCheckbox.addEventListener('change', function() {
    if (toggleCheckbox.checked) {
        applyStyles('light');
    } else {
        applyStyles('dark');
    }
});

// Initial styles based on checkbox state
applyStyles(toggleCheckbox.checked ? 'light' : 'dark');





// Selecting DOM elements
const historyDisplay = document.getElementById('historyDisplay');
const resultDisplay = document.getElementById('resultDisplay');

let history = ''; // To store the history of operations


// Function to add to history
function addToHistory(value) {
    // Ensure only one character is added per click
    if (value.length > 0 || value==='00') {
        value = value[0]; // Take only the first character if more than one is provided
    }
    
    history += value;
    historyDisplay.innerText = history;
}

// Function to clear the display
function clearDisplay() {
    history = '';
    historyDisplay.innerText = '0';
    resultDisplay.innerText = '0';
}

// Function to delete the last character
function deleteLast() {
    history = history.slice(0, -1);
    historyDisplay.innerText = history;
}
// Function to calculate the result
function calculateResult() {
    try {
        // Using regular expressions to find and calculate operations
        var foundSymbols = ['+', '-', '*', '/', '%', '^'];
        var regex = new RegExp('([' + foundSymbols.join('\\') + '])', 'g');
        var parts = history.split(regex).filter(Boolean); // Filter out empty strings
        var result = '';

        // Convert parts to numbers where possible
        for (var i = 0; i < parts.length; i++) {
            if (!foundSymbols.includes(parts[i])) {
                parts[i] = parseFloat(parts[i]);
            }
        }

        // Function to perform operations in order of precedence
        function performOperation(ops, sym) {
            if (!ops.includes(sym)) {
                return;
            }else{
                while (ops.includes(sym)) {
                    var index = ops.indexOf(sym);
                    var operand1 = parts[index - 1];
                    var operand2 = parts[index + 1];
                    var operationResult;

                    switch (sym) {
                        case '*':
                            operationResult = operand1 * operand2;
                            break;
                        case '/':
                            if (operand2 === 0) {
                                throw new Error('Division by zero');
                            }
                            operationResult = operand1 / operand2;
                            break;
                        case '%':
                            // Check if the % is a standalone postfix operator
                            if (index === ops.length - 1) {
                                operationResult = operand1 / 100; // Convert to percentage
                            } else {
                                operationResult = operand1 % operand2;
                            }
                            break;
                        case '+':
                            operationResult = operand1 + operand2;
                            break;
                        case '-':
                            operationResult = operand1 - operand2;
                            break;
                    }

                    parts.splice(index - 1, 3, operationResult); // Replace operands and operator with result
                    ops.splice(index, 1); // Remove operator from ops array
                }
            }
        }

        // Perform operations in order of precedence
        performOperation(parts, '^');
        performOperation(parts, '*');
        performOperation(parts, '/');
        performOperation(parts, '%');
        performOperation(parts, '+');
        performOperation(parts, '-');

        // The final result is the only remaining part
        result = parts[0];

        // Display the result
        resultDisplay.innerText = result;

        // Clear history and reset for next calculation
        history = '';
        historyDisplay.innerText = '';

    } catch (error) {
        // Handle any errors during calculation
        resultDisplay.innerText = 'Error';
        console.error('Error calculating result:', error);
    }
}
