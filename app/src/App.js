import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ItsBedtime from './components/ItsBedtime.js';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Register from './components/Register.js'
import Calendar from './components/Calendar'
import CalendarBar from './components/CalendarBar'
import UserSettings from "./components/UserSettings";
import logSleep from './components/logSleep';
import Personality from './components/Personality';

function App() {
  return (
      <Router>
          <Switch>
              <Route path ="/landing" component={Landing}/>
              <Route path ="/bedtimeRoutine" component={ItsBedtime}/>
              <Route path ="/home" component={Home}/>
              <Route path ="/register" component={Register}/>
              <Route path ="/calendarsign" component={Calendar}/>
              <Route path ="/calendar" component={CalendarBar}/>
              <Route path="/settings" component={UserSettings}/>
              <Route path="/logSleep" component={logSleep}/>
              <Route path="/personality" component={Personality}/>
          </Switch>
      </Router>
  );
}
export default App;