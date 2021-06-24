import React from 'react'

const Key = ({ value, id, handleClick }) => {
  return (
    <div className='keys' id={id} onClick={handleClick}>
      {value}
    </div>
  )
}

export default Key
