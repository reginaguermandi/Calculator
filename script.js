const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');



keys.addEventListener('click', event => {
  if (!event.target.closest('button')) return

  // print the Keys values in the display
  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const type = key.dataset.type
  const { previousKeyType } = calculator.dataset
  display.textContent = keyValue

  // print only numbers in the display and reset after calculation
  if (type === 'number') {
    if (displayValue === '0' || previousKeyType === 'operator' || previousKeyType === 'equal') {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }

  // store the first input and an operator
  if (type === 'operator') {
    calculator.dataset.firstNumber = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  // store the second input and perfom a calculation
  if (type === 'equal') {
    if (previousKeyType !== 'equal') {
      const firstNumber = calculator.dataset.firstNumber
      const operator = calculator.dataset.operator
      const secondNumber = displayValue
      const result = calculate(firstNumber, operator, secondNumber)
      display.textContent = result
    } else {
      display.textContent = displayValue
    }
  }

  // clear display
  if (type === 'clear') {
    display.textContent = '0';
    delete calculator.dataset.firstNumber
    delete calculator.dataset.secondNumber
  }

  // add a dot to the display value
  if (type === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.'
    } else {
      display.textContent = displayValue
    }
  }

  calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber)
  secondNumber = parseFloat(secondNumber)

  if (operator === 'plus') return firstNumber + secondNumber
  if (operator === 'minus') return firstNumber - secondNumber
  if (operator === 'times') return firstNumber * secondNumber
  if (operator === 'divide') return firstNumber / secondNumber
}
