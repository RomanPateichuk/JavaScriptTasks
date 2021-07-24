const btns_number = document.querySelectorAll(".numbers");
const btns_operation = document.querySelectorAll(".operations");
const input = document.getElementById("calculator__input");
let arr_inputs = [];
let result = 0;

if (window.matchMedia("(max-width: 1088px)").matches) {
  input.setAttribute("maxLength", 10);
}

if (window.matchMedia("(max-width: 280px)").matches) {
  input.setAttribute("maxLength", 5);
}

function clean_border() {
  for (let btn of btns_operation) {
    btn.style.outline = "none";
  }
}

function active(event) {
  event.target.style.outline = "3px solid red";
  event.target.style.outlineOffset = "-5px";
}

function prev_operation(arr_inputs) {
  let last_element = arr_inputs[arr_inputs.length - 1];
  if (
    last_element === "+" ||
    last_element === "-" ||
    last_element === "*" ||
    last_element === "/"
  ) {
    arr_inputs.pop();
    calculator__input.value = arr_inputs.join("");
  }
}

function result_input() {
  result = eval(arr_inputs.join(""));
  calculator__input.value = result;
  arr_inputs = [];
  arr_inputs.push(result);
}

function run(event) {
  active(event);
  prev_operation(arr_inputs);
  calculator__input.value += event.target.getAttribute("value");
  arr_inputs.push(event.target.getAttribute("value"));
}

calculator__buttons.addEventListener("click", (event) => {
  clean_border();
  if (event.target.getAttribute("class") === "numbers") {
    let value = event.target.getAttribute("value");
    arr_inputs.push(value);
    calculator__input.value += value;
    event.target.getAttribute("value");
  } else if (event.target.getAttribute("class") === "operations") {
    if (arr_inputs.length !== 0) {
      switch (event.target.getAttribute("value")) {
        case "+":
          run(event);
          break;
        case "-":
          run(event);
          break;
        case "/":
          run(event);
          break;
        case "*":
          run(event);
          break;
        case "=":
          active(event);
          prev_operation(arr_inputs);
          result_input();
          break;
        case "C":
          active(event);
          arr_inputs = [];
          calculator__input.value = "";
          break;
      }
    } else {
      calculator__input.value = "Введите число";
      setTimeout(() => {
        calculator__input.value = " ";
      }, 1000);
    }
  }
});

document.addEventListener("keydown", (event) => {
  let arr_operations = {
    NumpadAdd: "+",
    NumpadSubtract: "-",
    NumpadMultiply: "*",
    NumpadDivide: "/",
    Equal: "=",
  };

  let str =
    "(/^NumpadAdd$/) || (/^NumpadSubstract$/) || (/^NumpadMultiply$/) || (/^NumpadDivide$/) || (/^Equal$/)";
  if (event.code[event.code.length - 1].match(/[0-9]/)) {
    for (let btn of btns_number) {
      if (btn.value === event.code[event.code.length - 1]) {
        btn.click();
      }
    }
  } else if (event.code.match(str)) {
    for (let btn of btns_operation) {
      if (btn.value === String(arr_operations[event.code])) {
        btn.click();
      }
    }
  }
});
