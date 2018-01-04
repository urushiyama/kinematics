import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import Dashboard from './Dashboard';
import NoMatch from './NoMatch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route component={NoMatch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
