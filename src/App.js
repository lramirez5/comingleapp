import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminPanelComponent } from './components/AdminPanel';
import { HomepageComponent } from './components/Homepage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomepageComponent />
        </Route>
        <Route path="/admin" exact>
          {/*<AdminPanelComponent />*/}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;