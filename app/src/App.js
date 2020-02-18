import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
import Register from './components/Register.js'
import Logging from './components/logging'
import UserSettings from "./components/UserSettings";
import logSleep from './components/logSleep';
import Chronotype from './components/Personality/chronotype';
import ChronoResults from './components/Personality/chronoResults';
import Personality from './components/Personality/Personality';
import PersonalityIntro from './components/Personality/PersonalityIntro';
import PersonalityResults from './components/Personality/PersonalityResults';
import MindfulnessModules from './components/MindfulnessModules';
import report from "./components/report";
import ExampleModule from './components/ExampleModule';
import NotFound from './components/NotFound';
import logWake from "./components/logWake";
import BedtimeRoutine from "./components/ItsBedtimeRoutine";
import MobileBedtimeRoutine from "./components/MobileBedtimeRoutine";
import MobileMindfulnessModules from "./components/MobileMindfulnessModules";
import MobileExampleModule from "./components/MobileExampleModule";
import MobileLanding from "./components/MobileLanding";
import mindfulLeadership from "./components/mindfulLeadership";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path ="/bedtimeRoutine" component={BedtimeRoutine}/>
              <Route path ="/home" component={Home}/>
              <Route path ="/register" component={Register}/>
              <Route path="/settings" component={UserSettings}/>
              <Route path="/logSleep" component={logSleep}/>
              <Route path="/logWake" component={logWake}/>
              <Route path="/chronotype" component={Chronotype}/>
              <Route path="/chronoResults" component={ChronoResults}/>
              <Route path="/personality" component={Personality}/>
              <Route path="/personalityIntro" component={PersonalityIntro}/>
              <Route path="/personalityResults" component={PersonalityResults}/>
              <Route path="/mindfulnessModules" component={MindfulnessModules}/>
              <Route path="/logging" component={Logging}/>
              <Route path="/report" component={report}/>
              <Route path="/ExampleModule" component={ExampleModule}/>
              <Route path="/mindfulLeadership" component={mindfulLeadership}/>
              <Route path="/MobileBedtimeRoutine" component = {MobileBedtimeRoutine}/>
              <Route path="/MobileMindfulnessModules" component = {MobileMindfulnessModules}/>
              <Route path="/MobileExampleModule" component = {MobileExampleModule}/>
              <Route path="/mobile" component = {MobileLanding}/>
              <Route component = {NotFound}/>
          </Switch>
      </Router>
  );
}
export default App;