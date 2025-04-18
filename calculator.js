const calculatorInput = document.querySelector(".calc-input"); // calculator input display
const calculatorOutput = document.querySelector(".calc-output"); // calculator output display
const calculatorButtons = document.querySelector(".buttons-div"); // calculator buttons

// keep the cursor beeping
const keepCursorBeeping = () => {
  calculatorInput.focus();
};

// function to insert character at cursor position
const insertIntoPosition = (originalText, insertText, position) => {
  return (
    originalText.slice(0, position) + insertText + originalText.slice(position)
  );
};

// insert into input function
const insertInput = (e) => {
  const currentBtn = e.target;
  const position = calculatorInput.selectionStart;
  const insertText = currentBtn.innerHTML;
  const originalText = calculatorInput.value;

  calculatorInput.value = insertIntoPosition(
    originalText,
    insertText,
    position
  );
  if (insertText === "00") {
    calculatorInput.setSelectionRange(position + 2, position + 2);
  } else {
    calculatorInput.setSelectionRange(position + 1, position + 1);
  }
  keepCursorBeeping();
};

// clear input function
const clearInput = () => {
  calculatorInput.value = "";
  calculatorOutput.innerHTML = "";
  keepCursorBeeping();
};

// delete character function
const deleteInput = () => {
  const start = calculatorInput.selectionStart;
  const end = calculatorInput.selectionEnd;
  if (start !== end) {
    let unSelectedText =
      calculatorInput.value.slice(0, start) + calculatorInput.value.slice(end);
    calculatorInput.value = unSelectedText;
    calculatorInput.setSelectionRange(start, start);
  } else if (start > 0) {
    console.log(start);

    calculatorInput.value =
      calculatorInput.value.slice(0, start - 1) +
      calculatorInput.value.slice(end);

    calculatorInput.setSelectionRange(start - 1, start - 1);
  }

  keepCursorBeeping();
};

// Evaluate function
const evalaute = (expression) => {
  try {
    if (expression.includes("^")) {
      const newExpression = expression.replaceAll("^", "**");
      const Solve = new Function("return " + newExpression);
      return Solve();
    } else if (expression.includes("x")) {
      const newExpression = expression.replaceAll("x", "*");
      const Solve = new Function("return " + newExpression);
      return Solve();
    } else {
      const Solve = new Function("return " + expression);
      return Solve();
    }
  } catch (error) {
    return "Invalid Operation";
  }
};

// find squareroot of a value

const squareRoot = (expression) => {
  const evalauted = evalaute(expression)
  calculatorOutput.innerHTML = Math.sqrt(evalauted);
  
};

const calculatorApp = () => {
  // selecting all the buttons to add functionality
  const buttons = document.querySelectorAll(".btn"); // create's a nodelist
  buttons.forEach((btn) => {
    btn.addEventListener("click", insertInput);
  });

  const clearBtn = document.querySelector(".clear-btn"); // clear button
  clearBtn.addEventListener("click", clearInput);

  const deleteBtn = document.querySelector(".del-btn"); // delete button
  deleteBtn.addEventListener("click", deleteInput);


  
  const sqrtBtn = document.querySelector(".sqrt-btn")  // squareroot button
  sqrtBtn.addEventListener("click", () =>{
    const expression = calculatorInput.value; // the expression to be calculated(input value)
    squareRoot(expression)
  })

  const equalToBtn = document.querySelector(".eqaul-to-btn");
  equalToBtn.addEventListener("click", () => {
    if (calculatorInput.value !== "") {
      const expression = calculatorInput.value; // the expression to be calculated(input value)
      calculatorOutput.innerHTML = evalaute(expression);

      // console.log(evalaute(expression), calculatorOutput.innerHTML); for debugging purpose
    }

    return;
  });
  // console.log(evalaute("5 + 6 ^ 2")); debugging purpose

  keepCursorBeeping();
};

document.addEventListener("DOMContentLoaded", calculatorApp);
Math.sqrt;
