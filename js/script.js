"use strict";

//Create variables for existing elements

const mainContainer = document.querySelector(".container");
const display = document.querySelector(".display");
const btnsContainer = document.querySelector(".btns-container");
const numBtnsContainer = document.querySelector(".num-btns");
const lastRowContainer = document.querySelector(".last-row");
const clearBtn = document.querySelector(".clear-btn");

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

//Note that equals does not have the operator-btn class.
equalsBtn.classList.add("=");
equalsBtn.classList.add("btn");
equalsBtn.id = "equals";
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

//Apply logic

//Define basica operations to store in opsObj (so that we can store them in an array when relevant)
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

//Implement logic into calculator
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

//Implement clear button logic

clearBtn.addEventListener("click", function () {
  valsArr = [];
  opsArr = [];
  currVal = "";
  display.textContent = "";
});

//Implement equals button logic
equalsBtn.addEventListener("click", function () {
  //Make sure currVal is pushed into the array (and then cleared)
  //These 2 lines is repeated code from the operator-btn event listenr.
  //This is inefficient and should likely be refactored into a function.
  valsArr.push(parseInt(currVal));
  currVal = "";
  //Only calculate anything if there has been at least 2 number
  //This is equivalent of saying there has been at least one operator and 2 operands
  if (valsArr.length > 1) {
    //Store running totals
    const intermVals = [];

    //store the result of the first operation in intermVals
    intermVals.push(opsArr[0](valsArr[0], valsArr[1]));

    //If there are no other values, simply return the result stored in intermVals above
    if (valsArr.length < 3) display.textContent = intermVals[0];
    //Otherwise, loop through the remaining required operations.
    else {
      for (let i = 1; i < opsArr.length; i++) {
        intermVals.push(opsArr[i](intermVals[i - 1], valsArr[i + 1]));
      }
      display.textContent = intermVals.at(-1);
    }
  }
  //reset updateDisplay back to true
  updateDisplay = true;
});
