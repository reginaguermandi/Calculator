const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const operatorKey = document.querySelector('[data-type="operator"]');


keys.addEventListener('click', event => {
  if(!event.target.closest('button')) return

// print the Key value in the display
  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const type = key.dataset.type
  const { previousKeyType } = calculator.dataset
  display.textContent = keyValue


 if(type === 'number'){
    if(displayValue === '0' || previousKeyType === 'operator'){
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }       
  } 

  if (type === 'operator') {
    calculator.dataset.firstNumber = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'equal') {
    if( previousKeyType !== 'equal'){
      const firstNumber = calculator.dataset.firstNumber
      const operator = calculator.dataset.operator
      const secondNumber = displayValue
      
      display.textContent = calculate(firstNumber, operator, secondNumber)      
    } else {
      display.textContent = displayValue
    }
  }    

  if(type === 'clear'){
    display.textContent = '0';
    delete calculator.dataset.firstNumber
    delete calculator.dataset.secondNumber
  }

  if (type === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.'
    } else {
      display.textContent = '0'
    }
    
  }

  calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber)
  secondNumber = parseFloat(secondNumber)

  if(operator === 'plus') return firstNumber + secondNumber
  if(operator === 'minus') return firstNumber - secondNumber
  if(operator === 'times') return firstNumber * secondNumber
  if(operator === 'divide') return firstNumber / secondNumber
}


