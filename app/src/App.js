import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
// import Register from './components/Register.js'
// import Logging from './components/logging'
// import UserSettings from "./components/UserSettings";
// import logSleep from './components/logSleep';
// import Chronotype from './components/Personality/chronotype';
// import ChronoResults from './components/Personality/chronoResults';
// import Personality from './components/Personality/Personality';
// import PersonalityIntro from './components/Personality/PersonalityIntro';
// import PersonalityResults from './components/Personality/PersonalityResults';
// import MindfulnessModules from './components/MindfulnessModules';
// import report from "./components/report";
// import ExampleModule from './components/ExampleModule';
// import NotFound from './components/NotFound';
// import logWake from "./components/logWake";
// import BedtimeRoutine from "./components/ItsBedtimeRoutine";
// import MobileBedtimeRoutine from "./components/MobileBedtimeRoutine";
// import MobileMindfulnessModules from "./components/MobileMindfulnessModules";
// import MobileExampleModule from "./components/MobileExampleModule";
// import MobileLanding from "./components/MobileLanding";
// import mindfulLeadership from "./components/mindfulLeadership";
// import MindfulYoga from "./components/MindfulYoga";
// import BodyScanMeditation from "./components/BodyScanMeditation";
// import MindfulnessOverview from "./components/MindfulnessOverview";
// import MindfulEating from "./components/MindfulEating";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path ="/home" component={Home}/>
          </Switch>
      </Router>
  );
}
export default App;