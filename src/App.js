import React, { Component } from 'react';

import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


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
            </Switch>
        </Router>
    );
  }
}

export default App;
