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

equalsBtn.classList.add("*");
equalsBtn.classList.add("operator-btn");
equalsBtn.classList.add("btn");
equalsBtn.textContent = "=";

addBtn.classList.add("+");
addBtn.classList.add("operator-btn");
addBtn.classList.add("btn");
addBtn.textContent = "+";

subtractBtn.classList.add("-");
subtractBtn.classList.add("operator-btn");
subtractBtn.classList.add("btn");
subtractBtn.textContent = "-";

multiplyBtn.classList.add("*");
multiplyBtn.classList.add("operator-btn");
multiplyBtn.classList.add("btn");
multiplyBtn.textContent = "*";

divideBtn.classList.add("/");
divideBtn.classList.add("operator-btn");
divideBtn.classList.add("btn");
divideBtn.textContent = "/";

powerBtn.classList.add("**");
powerBtn.classList.add("operator-btn");
powerBtn.classList.add("btn");
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

let currVal = "";
let valsArr = [];
let opsArr = [];
const opObj = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  power: power,
};

btnsContainer.addEventListener("click", function (e) {
  if ([...e.target.classList].includes("num-btn"))
    console.log("button clicked");
});
