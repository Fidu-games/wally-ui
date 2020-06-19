import React, { Component } from 'react';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import PlayerView from './pages/playerView';
import CreateRoom from './pages/createroom';

import config from './config';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Redirector(props){
  window.location.href = `${config.peer_server.URL}/control${props.location.search}`;
  return <span></span>;
}

class App extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/sign_up" component={SignUp}/>
                <Route path="/player" component={PlayerView}/>
                <Route path="/create" component={CreateRoom} />
                <Route path="/gameControl" component={Redirector} />
            </Switch>
        </Router>
    );
  }
}

export default App;
