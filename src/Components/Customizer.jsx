import React, { useState } from 'react'

import '../stylesheets/customizer.css'

function ColorCube (props) {
  const handleClick = () => {
    props.onChange(props.color)
  }
  const style = props.selected ? '6px solid gray' : ''

  return (
    <div
      style={{ border: style }}
      className={`color-box ${props.color}-player`}
      onClick={handleClick}
    />
  )
}

export default function Customizer (props) {
  const [selectedColor, setSelectedColor] = useState('')
  const handleColorChange = color => {
    props.onChange(color)
    setSelectedColor(props.colors.find(c => c === color))
  }

  return (
    <div className='colorGird'>
      <div className='color-container'>
        {props.colors.map((color, i) => (
          <ColorCube
            key={i}
            color={color}
            onChange={handleColorChange}
            selected={selectedColor === color}
          />
        ))}
      </div>
    </div>
  )
}
