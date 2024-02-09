"use strict";

//Create variables for existing elements

const mainContainer = document.querySelector(".container");
const display = document.querySelector(".display");
const btnsContainer = document.querySelector(".btns-container");
const numBtnsContainer = document.querySelector(".num-btns");
const lastRowContainer = document.querySelector(".last-row");

//programatically add number buttons ("Leaving off 0 for now")
let counter = 1;
for (let i = 1; i <= 3; i++) {
  const newRow = document.createElement("div");
  newRow.classList.add("num-row");
  numBtnsContainer.appendChild(newRow);
  for (let k = 1; k <= 3; k++) {
    const newBtn = document.createElement("div");
    newBtn.classList.add("num-btn");
    newBtn.classList.add("btn");
    newBtn.classList.add(counter);
    newBtn.id = counter;
    newBtn.textContent = counter;
    newRow.appendChild(newBtn);
    counter++;
  }
}

//Adding last row which will contain 0andoperator buttons
//First create the row and add it to operator-btns
const opRow = document.createElement("div");
opRow.classList.add("num-row");
lastRowContainer.appendChild(opRow);

//Create zero button
const zero = document.createElement("div");
zero.classList.add("num-btn");
zero.classList.add("btn");
zero.classList.add(0);
zero.id = 0;
zero.textContent = "0";
opRow.appendChild(zero);
//Make zero's width the same as other nums
zero.style.width = `${document.getElementById("7").offsetWidth}px`;
console.log(document.getElementById("7").offsetWidth);

//Create container for operator buttons
const operatorBtnsContainer = document.createElement("div");
operatorBtnsContainer.classList.add("operator-btns-container");
lastRowContainer.appendChild(operatorBtnsContainer);

//Add other operator buttons
const equalsBtn = document.createElement("div");
const addBtn = document.createElement("div");
const subtractBtn = document.createElement("div");
const multiplyBtn = document.createElement("div");
const divideBtn = document.createElement("div");
const powerBtn = document.createElement("div");

equalsBtn.id = "=";
addBtn.id = "+";
subtractBtn.id = "-";
multiplyBtn.id = "*";
divideBtn.id = "*";
powerBtn.id = "**";

//Note that equals does not have the operator-btn class.
equalsBtn.classList.add("=");
equalsBtn.classList.add("btn");
equalsBtn.id = "=";
equalsBtn.textContent = "=";

addBtn.classList.add("+");
addBtn.classList.add("operator-btn");
addBtn.classList.add("btn");
addBtn.id = "add";
addBtn.textContent = "+";

subtractBtn.classList.add("-");
subtractBtn.classList.add("operator-btn");
subtractBtn.classList.add("btn");
subtractBtn.id = "subtract";
subtractBtn.textContent = "-";

multiplyBtn.classList.add("*");
multiplyBtn.classList.add("operator-btn");
multiplyBtn.classList.add("btn");
multiplyBtn.id = "multiply";
multiplyBtn.textContent = "*";

divideBtn.classList.add("/");
divideBtn.classList.add("operator-btn");
divideBtn.classList.add("btn");
divideBtn.id = "divide";
divideBtn.textContent = "/";

powerBtn.classList.add("**");
powerBtn.classList.add("operator-btn");
powerBtn.classList.add("btn");
powerBtn.id = "power";
powerBtn.textContent = "^/**";

operatorBtnsContainer.appendChild(equalsBtn);
operatorBtnsContainer.appendChild(addBtn);
operatorBtnsContainer.appendChild(subtractBtn);
operatorBtnsContainer.appendChild(multiplyBtn);
operatorBtnsContainer.appendChild(divideBtn);
operatorBtnsContainer.appendChild(powerBtn);

//Broad logic
//Write functions for each operation. Each function will only take 2 numbers

//create state variables for operation being performed. Add event listeners to
//operator buttons that change this state variable.

//the state variable should decide which function is being called at any given time

//create an array to store intermediate results of operation

//when a number is clicked, and then an operator, and then a second number, store the
//result inside the array we created in the last step.
//For each subsequent operation, the first argument in the operation's function
//will be the last item of the array (array.at(-1))

//Don't display the result until you click the '=' sign. So we will have a display
//result function added in an event listener

//create a clear function that clears the array and the display.

//The above isn't quite right, it won't work with 2 digit numbers.
//Need a buffer variable to store the numbers in (string and add the id)
//Then at the start of each operator function, including =, we'll push the
//full number into the array and clear its contents

const intermediateValues = [];
let currValue = "";

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function power(num1, num2) {
  return num1 ** num2;
}

//Implement logic onto calculator
let currVal = "";
let valsArr = [];
let opsArr = [];
let updateDisplay = false;
const opObj = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  power: power,
};

btnsContainer.addEventListener("click", function (e) {
  if ([...e.target.classList].includes("num-btn")) {
    //Store string of integer in currVal
    let id = e.target.id;
    currVal += id;
    //Update the display text. If we just clicked an operator, updateDisplay should be
    //true, and the string will clear before adding the new integer.
    //Otherwise, it will add the new integer onto the existing string of integers.
    //The operator-btns even listener will set the state variable to true.
    if (updateDisplay) display.textContent = id;
    else display.textContent += id;

    //Change updateDisplay state variable
    updateDisplay = false;
  }
});

operatorBtnsContainer.addEventListener("click", function (e) {
  if ([...e.target.classList].includes("operator-btn")) {
    valsArr.push(parseInt(currVal));
    currVal = "";
    opsArr.push(opObj[e.target.id]);
    //Ensure we are starting from an empty string if we click more numbers.
    updateDisplay = true;

    console.log(valsArr, opsArr);
  }
});
