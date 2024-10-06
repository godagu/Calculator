let firstOperand = "";
let secondOperand = "";
let operator = "";
let digitsEntered = 0;

let extraOperation = ""

let resetDisplay = false;
let isFirstInput = true;
let isResultDisplayed = false; 

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");


function updateDisplay(value){
    if(isFirstInput || resetDisplay){
        display.textContent = value;
        resetDisplay = false;
        isFirstInput = false;
    }
    else if(display.textContent.length < 8){
        display.textContent += value;
    }
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        if(button.hasAttribute("data-number")){
            updateDisplay(button.getAttribute("data-number"));
            ++digitsEntered;
        }
        else if(button.hasAttribute("data-operator")){
            if(firstOperand !== "" && operator !== ""){
                secondOperand = display.textContent
                const result =  operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
                display.textContent = result;
            }
    
            firstOperand = display.textContent;
            operator = button.getAttribute("data-operator");
            resetDisplay = true;
        }
        else if(button.id === "equals"){
            if(!resetDisplay){
                secondOperand = display.textContent;
                const result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
                display.textContent = result;
                resetDisplay = true;
                isResultDisplayed = true;
            }

        } else if(button.id === "clear"){
            clear();
        }
        else if(button.id === "backspace"){
            handleBackSpace();
        }
    })
})

document.addEventListener("keydown", (event) => {
    if (event.key >= 0 && event.key <= 9) {
        updateDisplay(event.key); 
    }
   
    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%') {
        const operatorButton = Array.from(buttons).find(button => button.getAttribute('data-operator') === event.key);
        if (operatorButton) {
            operatorButton.click();
        }
    }
   
    else if (event.key === 'Enter') {
        const equalsButton = document.getElementById('equals');
        equalsButton.click();
    }

    else if (event.key === 'Backspace') {
        const backspaceButton = document.getElementById('backspace');
        backspaceButton.click(); 
    }

    else if (event.key === 'Escape') {
        const clearButton = document.getElementById('clear');
        clearButton.click();
    }
});


function clear(){
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    operator = "";
    resetDisplay = true;
    digitsEntered = 0;
}

function handleBackSpace(){
    if (display.textContent.length > 1) {
        if(display.textContent.length == 2 && display.textContent.charAt(0) === '-'){
            display.textContent = "0";
        }
        else{
            display.textContent = display.textContent.slice(0, -1);
        }
    } else {
        display.textContent = "0";
        resetDisplay = true;
        digitsEntered = digitsEntered > 0 ? digitsEntered - 1 : 0;
    }
}


function formatResult(result) {
    let resultStr = result.toString();

    if (resultStr.includes('.')) {
        let [wholePart, decimalPart] = resultStr.split('.');

        if (wholePart.length >= 14) {
            return Math.round(result).toString();
        } 
        else if (wholePart.length === 13 && decimalPart.length > 0) {
            return result.toFixed(1);
        }
        else{
            return result.toFixed(15 - wholePart.length).replace(/\.?0+$/, ''); // Removes trailing zeros
        }
    } 
    else {
        if (resultStr.length > 17) {
            return result.toExponential(2); 
        }
    }
    
    return resultStr;
}

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return alert("Division by 0 is not allowed");
    }
    return a / b;
}

function modulus(a, b){
    if(b === 0){
        return alert("Division by 0 is not allowed");
    }
    return a % b
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return formatResult(add(a, b));
        case '-':
            return formatResult(substract(a, b));
        case '*':
            return formatResult(multiply(a, b));
        case '/':
            return formatResult(divide(a, b));
        case '%':
            return formatResult(modulus(a, b));
        default:
            return null;
    }
}


