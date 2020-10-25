import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'
import PlayerView from './pages/playerView'
import CreateRoom from './pages/createroom'
import Game from './pages/game'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/player' component={PlayerView} />
        <Route path='/create' component={CreateRoom} />
        <Route path='/game' component={Game} />
      </Switch>
    </Router>
  )
}
