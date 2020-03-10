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
import MindfulYoga from "./components/MindfulYoga";
import BodyScanMeditation from "./components/BodyScanMeditation";
import MindfulnessOverview from "./components/MindfulnessOverview";
import MindfulEating from "./components/MindfulEating";
import TitleComponent from "./components/TitleComponent";

// withTitle function
const withTitle = ({ component: Component, title }) => {
    return class Title extends Component {
        render() {
            return (
                <React.Fragment>
                    <TitleComponent title={title} />
                    <Component {...this.props} />
                </React.Fragment>
            );
        }
    };
};

// Adding titles
Landing = withTitle({ component: Landing, title: 'Welcome to Z³!' });
BedtimeRoutine = withTitle({ component: BedtimeRoutine, title: 'Bedtime Routine – Z³' });
Home = withTitle({ component: Home, title: 'Home – Z³' });
Register = withTitle({ component: Register, title: 'Sign Up – Z³' });
UserSettings = withTitle({ component: UserSettings, title: 'Settings – Z³' });
logSleep = withTitle({ component: logSleep, title: 'Log Sleep – Z³' });
logWake = withTitle({ component: logWake, title: 'Log Wake – Z³' });
Chronotype = withTitle({ component: Chronotype, title: 'Chronotype Test– Z³' });
ChronoResults = withTitle({ component: ChronoResults, title: 'Chronotype Results– Z³' });
Personality = withTitle({ component: Personality, title: 'Personality Test – Z³' });
PersonalityIntro = withTitle({ component: PersonalityIntro, title: 'Find Your Personality – Z³' });
PersonalityResults = withTitle({ component: PersonalityResults, title: 'Personality Results – Z³' });
MindfulnessModules = withTitle({ component: MindfulnessModules, title: 'Mindfulness – Z³' });
Logging = withTitle({ component: Logging, title: 'Log Exercise, Caffeine, and Stress – Z³' });
report = withTitle({ component: report, title: 'Report – Z³' });
ExampleModule = withTitle({ component: ExampleModule, title: '5-minute Meditation – Z³' });
mindfulLeadership = withTitle({ component: mindfulLeadership, title: 'Mindful Leadership – Z³' });
MindfulYoga = withTitle({ component: MindfulYoga, title: 'Mindful Yoga – Z³' });
BodyScanMeditation = withTitle({ component: BodyScanMeditation, title: '10-minute Medication – Z³' });
MindfulnessOverview = withTitle({ component: MindfulnessOverview, title: 'Mindfulness Overview – Z³' });
MindfulEating = withTitle({ component: MindfulEating, title: 'Mindful Eating – Z³' });
MobileBedtimeRoutine = withTitle({ component: MobileBedtimeRoutine, title: 'Bedtime Routine – Z³' });
MobileMindfulnessModules = withTitle({ component: MobileMindfulnessModules, title: 'Mindfulness Modules – Z³' });
MobileExampleModule = withTitle({ component: MobileExampleModule, title: '5-minute Meditation – Z³' });
MobileLanding = withTitle({ component: MobileLanding, title: 'Welcome to Z³!' });
NotFound = withTitle({ component: NotFound, title: 'Page Not Found :\'(' });

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
              <Route path="/MindfulYoga" component={MindfulYoga}/>
              <Route path="/BodyScanMeditation" component={BodyScanMeditation}/>
              <Route path="/MindfulnessOverview" component={MindfulnessOverview}/>
              <Route path="/MindfulEating" component={MindfulEating}/>
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