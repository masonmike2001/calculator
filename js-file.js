//body
let displayValue = 0, input = 0; //displayValue is the running total/firstNum, input is user entered
let calcQueue = new Array();
let operandQueue = new Array();
let queueSize = 0;
let inputDigits = 1;
let isFirstInput = true;


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
clearButton.addEventListener("click", updateInput);
equalButton.addEventListener("click", addOperator);




//main functions
function addOperator (e) //after an operator key is pressed, saves the finished number and operator into the calcQueue array
{
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
    return nums[0];
}

function updateInput (e) //takes the key input (tens and ones digit) and updates the total -> puts it on display
{

    switch(e.target)
        //checks for which number key is pressed (if . or del)
    {
        case(mainButtons[0]):
            input = 1;
            break;
        case(mainButtons[1]):
            input = 2;
            break;   
        case(mainButtons[2]):
            input = 3;
            break;
        case(mainButtons[3]):
            input = 4;
            break;
        case(mainButtons[4]):
            input = 5;
            break;   
        case(mainButtons[5]):
            input = 6;
            break;
        case(mainButtons[6]):
            input = 7;
            break;
        case(mainButtons[7]):
            input = 8;
            break;
        case(mainButtons[8]):
            input = 9;
            break;   
        case(mainButtons[9]):
            //decimal    

            break;
        case(mainButtons[10]):
            input = 0;
            break;
        case(mainButtons[11]):
            //backspace

            break;   
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
    calcQueue[queueSize] = displayValue;
    display.innerText = calcQueue[queueSize];
    input = 0;

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




/* TEST CASES:

checks for function operation for operators:
console.log(addInputs(100,10));
console.log(subtractInputs(100,10));
console.log(multiplyInputs(100,10));
console.log(divideInputs(100,10));




*/