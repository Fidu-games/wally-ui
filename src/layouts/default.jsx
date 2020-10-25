import React from 'react'
import Menu from '../components/menu'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/default.css'

export default function DefaultLayout (props) {
  return (
    <div>
      <Menu />
      <div>
        {props.children}
      </div>
    </div>
  )
}
