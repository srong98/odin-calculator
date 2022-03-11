let inputFirstValue = true;
let currentOperator;
let firstValue = 0;
let secondValue = 0;

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

clear.addEventListener('click', clearCalculator);
equalSign.addEventListener('click', operate(firstValue, secondValue, currentOperator));
operatorArray.forEach(operator => operator.addEventListener('click', updateOperator));
numbersArray.forEach(number => number.addEventListener('click', updateValue));

let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => (num1 / num2).toFixed(2);
let subtract = (num1, num2) => num1 - num2;
let add = (num1, num2) => num1 + num2;

let result = 0;
function operate(num1, num2, operator) {
    if (operator === `&#215;`) {
        result = multiply(num1, num2);
        displayLower.innerText = `${result}`;
        return result;
    }
    else if (operator === `&#247;`) {
        result = divide(num1, num2);
        displayLower.innerText = `${result}`;
        return result;
    }
    else if (operator === `&#8722;`) {
        result = subtract(num1, num2);
        displayLower.innerText = `${result}`;
        return result;
    }
    else if (operator === `&#43;`) {
        result = add(num1, num2);
        displayLower.innerText = `${result}`;
        return result;
    }
}

function updateOperator(e) {
    if (inputFirstValue) {
    currentOperator = `${e.target.value}`;
    inputFirstValue = false;
    displayLower.innerText += ` ${e.target.value}`; 
    return currentOperator;
    }
} 

function updateValue(e) {
    if (inputFirstValue) {
        if (firstValue === 0) {
            firstValue = e.target.value;
            displayLower.innerText = `${firstValue}`;
        }
        else {
        firstValue += `${e.target.value}`;
        displayLower.innerText = `${firstValue}`;
        }
    return firstValue;
    }            
    if (!inputFirstValue) {
        if (secondValue === 0) {
            secondValue = e.target.value;
            displayUpper.innerText = displayLower.innerText;
            displayLower.innerText = `${secondValue}`;
        }
        else {
            secondValue += `${e.target.value}`;
            displayLower.innerHTML = `${secondValue}`
        }
    return secondValue;
    } 
}


function clearCalculator() {
    inputFirstValue = true;
    firstValue = 0;
    secondValue = 0;
    displayUpper.innerText = '';
    displayLower.innerText = 0;
}

window.onload = () => {
    clearCalculator();
}
