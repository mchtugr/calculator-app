import React, { useState } from 'react'
import Key from './Key'
import PreviewScreen from './PreviewScreen'

const App = () => {
  const [operationHistory, setOperationHistory] = useState('')
  const [current, setCurrent] = useState('')
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [showZero, setShowZero] = useState(true)

  const handleClearAll = () => {
    setShowZero(true)
    setOperationHistory('')
    setCurrent('')
    setShowResult(false)
  }

  const handleDelete = () => {
    // removes the last element
    setCurrent(current.slice(0, -1))
    if (current.length === 0) {
      // when current is '', it removes operation history
      setOperationHistory(operationHistory.slice(0, -1))
    }
  }

  const handleClick = (e) => {
    setShowZero(false)
    setShowResult(false)
    const keyValue = e.target.innerText
    // to check operators
    const operators = ['+', '-', '×', '÷']

    //if key is not an operator
    if (!operators.includes(keyValue)) {
      // check '0' and '.'keys
      if (canIPass(keyValue)) {
        setCurrent(current + keyValue)
        // prevents numbers adding to operation history after pressing '='
        if (
          operationHistory.length > 1 &&
          !operators.includes(operationHistory.slice(-1))
        ) {
          setOperationHistory('')
        }
      }
    } else {
      setOperationHistory(operationHistory + current + keyValue)
      setCurrent('')
    }
  }

  const handleEquals = () => {
    setShowZero(false)
    setShowResult(true)
    let historyStr = operationHistory + current
    let value = compute(historyStr)
    setOperationHistory(String(value))
    setCurrent('')
  }

  const compute = (historyStr) => {
    // in case there is space between numbers/operators
    let str = historyStr.split(' ').join('')
    // create a new array from numbers and operators
    let calculation = str.match(/\d+\.\d+|\d+|[^0-9]/g)
    let result

    for (let i = 0; i < calculation.length; i++) {
      if (i === 0) {
        result = Number(calculation[i])
      } else {
        if (!isNaN(calculation[i])) {
          switch (calculation[i - 1]) {
            case '-':
              // handles minus '-' sign
              if (calculation[i - 2] === '+') {
                result += Number(-calculation[i])
              } else if (calculation[i - 2] === '-') {
                result += Number(-calculation[i])
              } else if (calculation[i - 2] === '×') {
                result *= Number(-calculation[i])
              } else if (calculation[i - 2] === '÷') {
                result /= Number(-calculation[i])
              } else {
                result -= Number(calculation[i])
              }
              break
            case '+':
              result += Number(calculation[i])
              break
            case '×':
              result *= Number(calculation[i])
              break
            case '÷':
              result /= Number(calculation[i])
              break
            default:
              console.log(calculation[i])
          }
        }
      }
    }
    setCurrent('')
    setResult(result)
    return result
  }
  // handles initial '0' and decimal point '.'
  const canIPass = (keyValue) => {
    let length = current.length
    switch (keyValue) {
      case '.':
        if (current.includes('.')) {
          return false
        } else {
          return true
        }
      case '0':
        if (length === 1 && current[0] === '0') {
          return false
        } else {
          return true
        }
      default:
        return true
    }
  }
  return (
    <div className='app-wrapper'>
      <PreviewScreen
        history={operationHistory}
        current={current}
        showResult={showResult}
        result={result}
        showZero={showZero}
      />
      <div className='key-container'>
        <Key value={'AC'} id={'clear'} handleClick={handleClearAll} />
        <Key value={'C'} id='delete' handleClick={handleDelete} />
        <Key value={'÷'} id={'divide'} handleClick={handleClick} />
        <Key value={'7'} id={'seven'} handleClick={handleClick} />
        <Key value={'8'} id={'eight'} handleClick={handleClick} />
        <Key value={'9'} id={'nine'} handleClick={handleClick} />
        <Key value={'×'} id={'multiply'} handleClick={handleClick} />
        <Key value={'4'} id={'four'} handleClick={handleClick} />
        <Key value={'5'} id={'five'} handleClick={handleClick} />
        <Key value={'6'} id={'six'} handleClick={handleClick} />
        <Key value={'-'} id={'subtract'} handleClick={handleClick} />
        <Key value={'1'} id={'one'} handleClick={handleClick} />
        <Key value={'2'} id={'two'} handleClick={handleClick} />
        <Key value={'3'} id={'three'} handleClick={handleClick} />
        <Key value={'+'} id={'add'} handleClick={handleClick} />
        <Key value={'0'} id={'zero'} handleClick={handleClick} />
        <Key value={'.'} id={'decimal'} handleClick={handleClick} />
        <Key value={'='} id={'equals'} handleClick={handleEquals} />
      </div>
    </div>
  )
}

export default App
