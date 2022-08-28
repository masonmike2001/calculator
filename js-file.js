//body
let total = 0, input = 0, displayValue = 0;
let firstDigits = 1, secondDigits = 1;
let isFirstNum = true;
let isComplete = true;


//creates the DOM vars and event listeners that are needed
const leftButtons = document.querySelectorAll("#left-btns>.key");
const mainButtons = document.querySelectorAll("#num-btns>.row>.key");
const clearButton = document.querySelector("#right-btns>.key");
const equalButton = document.querySelector("#right-btns>#equal-btn>.key")

//adds the click event listeners and links to appropriate function
leftButtons.forEach(button => {
    button.addEventListener("click", operate);
});
mainButtons.forEach(button => {
    button.addEventListener("click", updateInput);
});
clearButton.addEventListener("click", updateInput);
equalButton.addEventListener("click", operate);




//main functions
function operate (e, a, b) //chooses an operator and executes it, returning the solution
{
    if (e.target == leftButtons[0])
    {
        return addInputs(a, b);
    }
    else if (e.target == leftButtons[1])
    {
        return subtractInputs(a, b);
    }
    else if (e.target == leftButtons[2])
    {
        return multiplyInputs(a, b);
    }
    else if (e.target == leftButtons[3])
    {
        return divideInputs(a, b);
    }
    else if (e.target == equalButton)
    {
        return;
    }
}

function updateInput (e) //takes the key input (tens and ones digit) and updates the display
{

       //checks for which number key is pressed (if . or del)
    switch(e.target)
    {
        case(mainButtons[0]):

            break;
        case(mainButtons[1]):
            break;   
        case(mainButtons[2]):
            break;
        case(mainButtons[3]):
            break;
        case(mainButtons[4]):
            break;   
        case(mainButtons[5]):
            break;
        case(mainButtons[6]):
            break;
        case(mainButtons[7]):
            break;
        case(mainButtons[8]):
            break;   
        case(mainButtons[9]):
            break;
        case(mainButtons[10]):
            break;
        case(mainButtons[11]):
            break;   
    }


     //DOM selects the display, and updates the text
    const display = document.querySelector("#text-box");
    //checks amount of digits for whatever input user's on, and runs a for loop to multiply by 10 enough times before adding
    if (isFirstNum == true)
    {
        for (i = 0; i < (firstDigits - 1); i++)
        {
            input1 = input1 * 10;
            display.innerText = input1;
        }
    }
    else if (isFirstNum == false)
    {
        for (i = 0; i < (secondDigits - 1); i++)
        {
            input2 = input2 * 10;
            display.innerText = input2;
        }
    }

    
    isFirstNum = false;
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