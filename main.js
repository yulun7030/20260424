const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-buttons button');

let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForNewValue = false;

function updateDisplay() {
  display.textContent = currentInput;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('misc')) {
      if (value === 'AC') {
        currentInput = '0';
        previousInput = '';
        operator = null;
        waitingForNewValue = false;
      } else if (value === '+/-') {
        if (currentInput !== 'Error') {
          currentInput = String(parseFloat(currentInput) * -1);
        }
      } else if (value === '%') {
        if (currentInput !== 'Error') {
          currentInput = String(parseFloat(currentInput) / 100);
        }
      }
    } else if (button.classList.contains('operator')) {
      if (value === '=') {
        if (operator && previousInput !== '') {
          currentInput = String(calculate(parseFloat(previousInput), parseFloat(currentInput), operator));
          operator = null;
          previousInput = '';
          waitingForNewValue = true;
        }
      } else {
        if (operator && !waitingForNewValue) {
          currentInput = String(calculate(parseFloat(previousInput), parseFloat(currentInput), operator));
        }
        operator = value;
        previousInput = currentInput;
        waitingForNewValue = true;
      }
    } else {
      if (waitingForNewValue || currentInput === 'Error') {
        currentInput = value === '.' ? '0.' : value;
        waitingForNewValue = false;
      } else {
        if (value === '.') {
          if (!currentInput.includes('.')) {
            currentInput += '.';
          }
        } else {
          currentInput = currentInput === '0' ? value : currentInput + value;
        }
      }
    }
    updateDisplay();
  });
});

function calculate(a, b, op) {
  if (isNaN(a) || isNaN(b)) return 0;
  let result;
  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '×': result = a * b; break;
    case '÷': return b === 0 ? 'Error' : a / b;
    default: return b;
  }
  return Math.round(result * 1000000000) / 1000000000;
}