const DEFAULT_VALUE = 0;

let displayValue = DEFAULT_VALUE;
let storedValue = DEFAULT_VALUE;
let currentOperator;

const numbers = document.querySelectorAll('.numpad');
let numbersArray = Array.from(numbers);

const operators = document.querySelectorAll('.operator');
let operatorArray = Array.from(operators);

const mathAdd = document.getElementById('plus');
const mathSubtract = document.getElementById('minus');
const mathMultiply = document.getElementById('multiply');
const mathDivide = document.getElementById('divide');
const displayUpper = document.getElementById('display-upper');
const displayLower = document.getElementById('display-lower');
const equalSign = document.getElementById('equal');
const clear = document.getElementById('clear');
const sqrt = document.getElementById('sqrt');
const plusMinus = document.getElementById('plusminus');

clear.addEventListener('click', clearCalculator);
equalSign.addEventListener('click', compute);
plusMinus.addEventListener('click', plusMinusDisplay);
operatorArray.forEach(operator => operator.addEventListener('click', updateUpperDisplay));
numbersArray.forEach(number => number.addEventListener('click', updateLowerDisplay));

let multiply = (num1, num2) => (num1 * num2).toFixed(2);
let divide = (num1, num2) => (num1 / num2).toFixed(2);
let subtract = (num1, num2) => num1 - num2;
let add = (num1, num2) => num1 + num2;

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
                displayLower.innerText = 'ERROR';
            }
            else {
            return divide(num1, num2)
        }
        default: return null;
    }
}

function compute() {
    storedValue = operate(currentOperator, storedValue, displayValue);
    displayValue = DEFAULT_VALUE;
    displayUpper.innerText = `${storedValue}`;
    displayLower.innerText = `${storedValue}`;
}

function updateDisplayValue(e) {
    if (displayValue != 0) {
        displayValue += `${e.target.value}`;
    }
    if (displayValue == 0) {
        displayValue = e.target.value;
    }
}

function updateLowerDisplay(e) {    
    if (displayValue.length == 10) {
        displayLower.innerText = 'ERROR';
        displayValue = DEFAULT_VALUE;
    }
    else {
        updateDisplayValue(e);
        displayLower.innerText = `${displayValue}`;
    }   
}

function updateUpperDisplay(e) {
    if (storedValue == 0) {
        storedValue = displayValue;    
        displayValue = DEFAULT_VALUE;
        currentOperator = e.target.value;        
        displayUpper.innerText = `${storedValue}` + ` ${currentOperator}`;
        displayLower.innerText = '';     
    }
    else {
        compute(currentOperator, storedValue, displayValue);
        currentOperator = e.target.value;        
        displayUpper.innerText = `${storedValue}` + ` ${currentOperator}`;
        displayLower.innerText = '';     
    }
}

function plusMinusDisplay() {
    if (storedValue == 0) {
        displayValue *= -1;
        displayLower.innerText = `${displayValue}`
    }
    else {
        storedValue *= -1;
        displayUpper.innerText = `${storedValue}`;
        displayLower.innerText = `${storedValue}`;
    }
}

function clearCalculator() {
    displayValue = DEFAULT_VALUE;
    storedValue = DEFAULT_VALUE;
    displayUpper.innerText = '';
    displayLower.innerText = 0;
}

window.onload = () => {
    clearCalculator();
}
