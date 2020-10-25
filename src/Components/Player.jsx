import React from 'react'

import WallaceRed from '../images/wallace_red.png'
import WallaceBlue from '../images/wallace_blue.png'
import WallaceGreen from '../images/wallace_green.png'

import '../stylesheets/player.css'

const colors = [
  { color: 'blue', src: WallaceBlue },
  { color: 'red', src: WallaceRed },
  { color: 'green', src: WallaceGreen }
]

export default function Player (props) {
  const color = colors.find(c => c.color === props.color)
  if (!color) return <span />

  return (
    <div className='player'>
      <div className='player-nickname'>
        <h2>{props.nickname}</h2>
      </div>
      <div className='player-sprite-container'>
        <img className='player-sprite' src={color.src} alt='player avatar' />
      </div>
    </div>
  )
}
