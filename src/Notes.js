import React, { Component } from 'react';



console.log(messages)

export default ({ratio}) => {
  return (
    <div className='Notes'>
      <p>{messages[ratio]}</p>
    </div>
  )
}
