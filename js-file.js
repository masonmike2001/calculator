//body
let displayValue = 0, input = 0; //displayValue is the running total/firstNum, input is user entered
let calcQueue = new Array();
let operandQueue = new Array();
let queueSize = 0;
let inputDigits = 1;
let isEquationComplete = false;
let isDecimalMode = false;
let decimalAmount = 0;



//creates the DOM vars and event listeners that are needed
const leftButtons = document.querySelectorAll("#left-btns>.key");
const mainButtons = document.querySelectorAll("#num-btns>.row>.key");
const clearButton = document.querySelector("#right-btns>.key");
const equalButton = document.querySelector("#right-btns>#equal-btn>.key")

//DOM selects the display, and updates the text
const display = document.querySelector("#text-box");
const displayHistory = document.querySelector("#text-history");

//adds the click event listeners and links to appropriate function
leftButtons.forEach(button => {
    button.addEventListener("click", addOperator);
});
mainButtons.forEach(button => {
    button.addEventListener("click", updateInput);
});
document.addEventListener('keydown', updateInput)

clearButton.addEventListener("click", clearCalculator);
equalButton.addEventListener("click", addOperator);

//main functions------------------------------------------------------------------------------------------------------------------------------------------------
function addOperator (e) //after an operator key is pressed, saves the finished number and operator into the calcQueue array
{
    isDecimalMode = false;
    decimalAmount = 0;
    if (calcQueue[queueSize] == undefined)
    //returns if user presses operand before number entry
    {
        return 1;
    }
    if (e.target == leftButtons[0])
    {
        operandQueue[queueSize] = "+";
    }
    else if (e.target == leftButtons[1])
    {
        operandQueue[queueSize] = "-";
    }
    else if (e.target == leftButtons[2])
    {
        operandQueue[queueSize] = "*";
    }
    else if (e.target == leftButtons[3])
    {
        operandQueue[queueSize] = "/";
    }
    else if (e.target == equalButton)
    {
        displayHistory.innerText += ' ' +  calcQueue[queueSize] + ' ';
        display.innerText = operate(calcQueue, operandQueue);
        isEquationComplete = true;
        return 0;
    }
    displayHistory.innerText += ' ' +  calcQueue[queueSize] + ' ' + operandQueue[queueSize] + ' ';
    queueSize++;
    inputDigits = 1;
}
function operate (nums, operators) //chooses an operator and executes it, returning the solution
{
    //goes through operands, and does operations with PEMDAS
    let index;
    while(operators.indexOf('*') != -1)
    {
        index = operators.indexOf('*');
        nums.splice(index, 2, multiplyInputs(nums[index], nums[index+1]));
        operators.splice(index, 1);
        index = operators.indexOf('*');
    }
    while(operators.indexOf('/') != -1)
    {
        index = operators.indexOf('/');
        nums.splice(index, 2, divideInputs(nums[index], nums[index+1]));
        operators.splice(index, 1);
        index = operators.indexOf('/');
    }
    while(operators.indexOf('+') != -1)
    {
        index = operators.indexOf('+');
        nums.splice(index, 2, addInputs(nums[index], nums[index+1]));
        operators.splice(index, 1);
        index = operators.indexOf('+');
    }
    while(operators.indexOf('-') != -1)
    {
        index = operators.indexOf('-');
        nums.splice(index, 2, subtractInputs(nums[index], nums[index+1]));
        operators.splice(index, 1);
        index = operators.indexOf('-');
    }
    nums[0] = Number((nums[0]).toFixed(3))
    return nums[0];
}

function updateInput (e) //takes the key input (tens and ones digit) and updates the total -> puts it on display
{
    if (isEquationComplete) clearCalculator();
    if (e.target == mainButtons[0] || e.keyCode == 49)
    {
        input = 1; 
    }
    else if (e.target == mainButtons[1] || e.keyCode == 50)
    {
        input = 2; 
    }
    else if (e.target == mainButtons[2] || e.keyCode == 51)
    {
        input = 3; 
    }
    else if (e.target == mainButtons[3] || e.keyCode == 52)
    {
        input = 4; 
    }
    else if (e.target == mainButtons[4] || e.keyCode == 53)
    {
        input = 5; 
    }
    else if (e.target == mainButtons[5] || e.keyCode == 54)
    {
        input = 6; 
    }
    else if (e.target == mainButtons[6] || e.keyCode == 55)
    {
        input = 7; 
    }
    else if (e.target == mainButtons[7] || e.keyCode == 56)
    {
        input = 8; 
    }
    else if (e.target == mainButtons[8] || e.keyCode == 57)
    {
        input = 9; 
    }
    else if (e.target == mainButtons[9] || e.keyCode == 190)
    {
        //decimal    
        input = 0.0;
        isDecimalMode = true;
    }
    else if (e.target == mainButtons[10] || e.keyCode == 48)
    {
        input = 0; 
    }
    else if (e.target == mainButtons[11] || e.keyCode == 8)
    {
        //backspace
        displayValue -= (displayValue % 10);
        displayValue /= 10;
        display.innerText = displayValue;
        if (displayValue == undefined) displayValue = 0;
        return 0;
    }
    
    else {
        return 0;
    }
    if (isDecimalMode == true)
    {
        let power = 1.0;
        for (i = 0; i < decimalAmount; i++)
        {
            power *= 10;
        }
        displayValue += input / power;

//make it so thst it works for decimals
    inputDigits++;
    calcQueue[queueSize] = displayValue / 1.0;
    display.innerText = calcQueue[queueSize];
        decimalAmount++;
        return 0;
    }
    if (inputDigits != 1)
    //if not the first number multiplies displayValue by ten to correct digit
    {
        displayValue *= 10;
        displayValue += input;
    }
    else {
        //if the first number, replaces the zero
        displayValue = input;
        display.innerText = displayValue;
    }
    inputDigits++;
    calcQueue[queueSize] = displayValue / 1.0;
    display.innerText = calcQueue[queueSize];
    input = 0;
}

function clearCalculator()
{
    displayValue = 0;
    display.innerText = displayValue;
    displayHistory.innerText = '';
    calcQueue = new Array();
    operandQueue = new Array();
    queueSize = 0;
    inputDigits = 1
    isEquationComplete = false;
}

//operator functions
function addInputs (a, b) {
    return a + b;
}

function subtractInputs (a, b) {
    return a - b;
}

function multiplyInputs (a, b) {
    return a * b;
}

function divideInputs (a, b) {
    return a / b;
}