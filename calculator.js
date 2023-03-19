let display = document.getElementById("display");

function addToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  let result = eval(display.value);
  display.value = result;
}

document.addEventListener("keydown", function(event) {
  let key = event.key;
  if (/^[0-9+\-*/().]$/.test(key)) {
    event.preventDefault();
    addToDisplay(key);
  }
  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  }
  else if (key === "Backspace") {
    event.preventDefault();
    let currentValue = display.value;
    display.value = currentValue.substring(0, currentValue.length - 1);
  }
});
