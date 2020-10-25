import React from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import '../stylesheets/game.css'

export default function GameLayout (props) {
  return (
    <div id='GameView'>
      {props.children}
    </div>
  )
}
