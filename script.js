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
