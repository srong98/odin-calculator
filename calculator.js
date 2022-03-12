const DEFAULT_VALUE = '0';

let displayValue = DEFAULT_VALUE;
let storedValue = DEFAULT_VALUE;
let equalOn = false;
let currentOperator;

const numbers = document.querySelectorAll('.numpad');
let numbersArray = Array.from(numbers);

const operators = document.querySelectorAll('.operator');
let operatorsArray = Array.from(operators);

const mathAdd = document.getElementById('plus');
const mathSubtract = document.getElementById('minus');
const mathMultiply = document.getElementById('multiply');
const mathDivide = document.getElementById('divide');
const displayUpper = document.getElementById('display-upper');
const displayLower = document.getElementById('display-lower');
const equalSign = document.getElementById('equal');
const clear = document.getElementById('clear');
const plusMinus = document.getElementById('plusminus');
const deleteCharacter = document.getElementById('delete');
const decimalPoint = document.getElementById('decimal');

clear.addEventListener('click', clearCalculator);
equalSign.addEventListener('click', useEqual);
plusMinus.addEventListener('click', plusMinusDisplay);
deleteCharacter.addEventListener('click', deleteLastCharacter);
decimalPoint.addEventListener('click', addDecimalPoint);
operatorsArray.forEach(operator => operator.addEventListener('click', updateUpperDisplay));
numbersArray.forEach(number => number.addEventListener('click', updateLowerDisplay))
window.addEventListener('keydown', keyPress)

let multiply = (num1, num2) => Math.round(num1 * num2 * 1000) / 1000;
let divide = (num1, num2) => Math.round(num1 / num2 * 1000) / 1000;
let subtract = (num1, num2) => num1 - num2;
let add = (num1, num2) => num1 + num2;
let sqrt = (num1) => Math.round(num1 ** (1/2) * 1000) / 1000;

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+': 
            return add(num1, num2);
        case '−':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            if (num2 == 0) {
                return 'div0';
            }
            else {
                return divide(num1, num2)
        }
        default: return null;
    }
}

function compute() {
    if(equalOn == false) {
        storedValue = operate(currentOperator, storedValue, displayValue);
        displayValue = DEFAULT_VALUE
        if (storedValue == 'div0')  {
            displayUpper.innerText = '';
            displayLower.innerText = 'Div by 0: ERROR';
            storedValue = DEFAULT_VALUE;
            }
        else {
            displayUpper.innerText = '';
            displayLower.innerText = `${storedValue}`;
            ;
        }
    }
}

function useEqual() {
    compute();
    equalOn = true;
}

function updateDisplayValue(e) {
    if (displayValue != 0 || displayValue.includes('.')) {
        displayValue += `${e.target.value}`;
    }
    if (displayValue == 0) {
        displayValue = e.target.value;
    }
}

function updateLowerDisplay(e) {    
    if (displayValue.length == 10 || storedValue.length == 10) {
        displayLower.innerText = 'ERROR';
        displayValue = DEFAULT_VALUE;
    }
    else if (displayLower.innerText == `${storedValue}` && storedValue != 0) {
        storedValue += `${e.target.value}`;
        displayLower.innerText = `${storedValue}`;
    }
    else {
        updateDisplayValue(e);
        displayLower.innerText = `${displayValue}`;
    }   
}

function updateUpperDisplay(e) {
    equalOn = false;
    if (storedValue == 0) {
        storedValue = displayValue;
        displayValue = DEFAULT_VALUE; 
    } 
    if (storedValue != 0 && displayValue != 0) {
        compute();
    }
    currentOperator = e.target.value;
    displayUpper.innerText = `${storedValue}` + ` ${currentOperator}`;
    displayLower.innerText = '';   
}

//+/- function somewhat buggy

function plusMinusDisplay() {
    if (displayValue == 0 && displayLower.innerText == `${storedValue}`) {
        storedValue *= -1;
        displayLower.innerText = `${storedValue}`;
    }
    else {
        displayValue *= -1;
        displayLower.innerText = `${displayValue}`;
    }
}

function deleteLastCharacter() {
    if (displayLower.innerText != `${storedValue}`) {
        displayValue = displayValue.slice(0, -1);
        displayLower.innerText = `${displayValue}`;    
    }
}

function addDecimalPoint() {
    if (displayLower.innerText != `${storedValue}` && !(displayValue.includes('.'))) {
        displayValue += '.';
        displayLower.innerText = `${displayValue}`;
    }
    else if (displayLower.innerText == `${storedValue}` && !(String(storedValue)).includes('.')) {
        storedValue += '.';
        displayLower.innerText = `${storedValue}`;
    }
    else return;
}

function clearCalculator() {
    displayValue = DEFAULT_VALUE;
    storedValue = DEFAULT_VALUE;
    displayUpper.innerText = '';
    displayLower.innerText = 0;
}

//keyboard functionality reusing above code with e.target.value replaced with e.key

function keyPress(e) {
    if (e.key >= 0 && e.key <= 9) {
        if (displayValue.length == 10 || storedValue.length == 10) {
            displayLower.innerText = 'ERROR';
            displayValue = DEFAULT_VALUE;
        }
        else if (displayValue == 0 && !(displayValue.includes('.'))) {
            displayValue = `${e.key}`;
            displayLower.innerText = `${displayValue}`;
        }
        else if (displayLower.innerText != `${storedValue}`) {
            displayValue += `${e.key}`;
            displayLower.innerText = `${displayValue}`;
        }
        else {
            storedValue += `${e.key}`;
            displayLower.innerText = `${storedValue}`;
        }
    }
    if (e.key == '.') {
        if (displayLower.innerText != `${storedValue}` && !(displayValue.includes(e.key))) {
            displayValue += e.key;
            displayLower.innerText = `${displayValue}`;
        }
        else if (displayLower.innerText == `${storedValue}` && !(String(storedValue)).includes(e.key)) {
            storedValue += e.key;
            displayLower.innerText = `${storedValue}`;
        }
        else return;
    }
    if (e.key == '=' || e.key == 'Enter') {
        useEqual();
    }
    if (e.key == 'Backspace' || e.key == 'Delete') {
        deleteLastCharacter();
    }
    if (e.key == 'Escape') {
        clearCalculator();
    }
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == 'x') {
        equalOn = false;
        if (storedValue == 0) {
            storedValue = displayValue;
            displayValue = DEFAULT_VALUE; 
        } 
        if (storedValue != 0 && displayValue != 0) {
            compute();
        }
        currentOperator = convertKeyOperator(e.key);
        displayUpper.innerText = `${storedValue}` + ` ${currentOperator}`;
        displayLower.innerText = '';   
    }
}

function convertKeyOperator(operator) {
    if (operator == '+') return '+';
    if (operator == '-') return '−';
    if (operator == '*' || operator == 'x') return '×';
    if (operator == '/') return '÷';
}

window.onload = () => {
    clearCalculator();
}
