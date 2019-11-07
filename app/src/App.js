import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import ItsBedtime from './components/ItsBedtime.js';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Register from './components/Register.js'

function App() {
  return (
      <Router>
          <nav>
              <ul>
                  <li>
                      <Link to="/bedtimeRoutine">It's bedtime routine</Link>
                  </li>
                  <li>
                      <Link to="/landing">Landing Page</Link>
                  </li>
                  <li>
                      <Link to="/home">Home Page</Link>
                  </li>
                  <li>
                      <Link to="/register">Register Page</Link>
                  </li>
              </ul>
          </nav>

          <Switch>
              <Route path ="/bedtimeRoutine">
                  <ItsBedtime/>
              </Route>
              <Route path ="/landing">
                  <Landing/>
              </Route>
              <Route path ="/home">
                  <Home/>
              </Route>
              <Route path ="/register">
                  <Register/>
              </Route>
          </Switch>
      </Router>
  );
}
export default App;