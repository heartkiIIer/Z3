import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ItsBedtime from './components/ItsBedtime.js';
import Landing from './components/Landing.js';
import Home from './components/Home.js';

function App() {
  return (
      <Router>
          <nav>
              <ul>
                  <li>
                      <Link to="/bedtimeRoutine">It's bedtime routine</Link>
                  </li>
              </ul>
          </nav>

          <Switch>
              <Route path ="/bedtimeRoutine">
                  <ItsBedtime/>
              </Route>
          </Switch>
      </Router>
  );
}
export default App;