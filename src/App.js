import './styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Dashboard from './Dashboard';
import InverseKinematics from './InverseKinematics';
import Kinematics from './Kinematics';
import NoMatch from './NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/kinematics" component={Kinematics}/>
          <Route path="/kinematics" component={Kinematics}/>
          <Route path="/InverseKinematics" component={InverseKinematics}/>
          <Route path="/inverse-kinematics" component={InverseKinematics}/>
          <Route component={NoMatch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
