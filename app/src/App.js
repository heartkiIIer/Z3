import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ItsBedtime from './components/ItsBedtime';
import Calendar from './components/Calendar/Calendar'
import ApiCalendar from 'react-google-calendar-api';

function App() {
    if (ApiCalendar.sign) {
        ApiCalendar.listUpcomingEvents(10).then(({result}: any) => {
            console.log(result.items);
        }); }
  return (
      <Router>
          <nav>
              <ul>
                  <li>
                      <Link to="/bedtimeRoutine">It's bedtime routine</Link>
                      <Link to="/calendar">Calendar</Link>
                  </li>
              </ul>
          </nav>

          <Switch>
              <Route path ="/bedtimeRoutine">
                  <ItsBedtime/>
              </Route>
              <Route path ="/calendar">
                  <Calendar/>
              </Route>
          </Switch>
      </Router>
  );
}
export default App;
