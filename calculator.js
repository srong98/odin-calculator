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
const sqrtButton = document.getElementById('sqrt');
const plusMinus = document.getElementById('plusminus');
const deleteCharacter = document.getElementById('delete');
const decimalPoint = document.getElementById('decimal');

clear.addEventListener('click', clearCalculator);
equalSign.addEventListener('click', compute);
plusMinus.addEventListener('click', plusMinusDisplay);
sqrtButton.addEventListener('click', useSquareRoot);
deleteCharacter.addEventListener('click', deleteLastCharacter);
decimalPoint.addEventListener('click', addDecimalPoint);
operatorsArray.forEach(operator => operator.addEventListener('click', updateUpperDisplay));
numbersArray.forEach(number => number.addEventListener('click', updateLowerDisplay));

let multiply = (num1, num2) => Math.round(num1 * num2 * 100) / 100;
let divide = (num1, num2) => Math.round(num1 / num2 * 100) / 100;
let subtract = (num1, num2) => num1 - num2;
let add = (num1, num2) => num1 + num2;
let sqrt = (num1) => Math.round(num1 ** (1/2) * 100) / 100;;

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
    if (displayValue.length == 10) {
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
    if (storedValue != 0 && displayValue !=0) {
        compute();
    } 
    currentOperator = e.target.value;
    displayUpper.innerText = `${storedValue}` + ` ${currentOperator}`;
    displayLower.innerText = '';   
}

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

function useSquareRoot() {
    if (displayValue == 0 && storedValue == 0) {
        return;
    }
    else if (storedValue == 0) {
        displayValue = sqrt(displayValue);
        displayLower.innerText = `${displayValue}`;
    }
    else { 
        storedValue = sqrt(storedValue);
        displayLower.innerText = `${storedValue}`;
    }
} 

function deleteLastCharacter() {
    displayValue = displayValue.slice(0, -1);
    displayLower.innerText = `${displayValue}`;    
}

function addDecimalPoint() {
    if (displayLower.innerText != `${storedValue}` && !(displayValue.includes('.'))) {
        displayValue += '.';
        displayLower.innerText = `${displayValue}`;
    }
    else if (displayLower.innerText == `${storedValue}`) {
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

window.onload = () => {
    clearCalculator();
}
