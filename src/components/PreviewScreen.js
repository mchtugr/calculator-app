import React from 'react'

const PreviewScreen = ({ current, history, showResult, result, showZero }) => {
  return (
    <div className='preview-screen'>
      {/* operationHistory */}
      <div className='prev'>{history}</div>
      <div id='display'>{showResult ? result : showZero ? 0 : current} </div>
    </div>
  )
}

export default PreviewScreen
