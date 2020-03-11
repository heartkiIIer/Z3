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
import sleep from "./components/sleep";
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
const LandingComponent = withTitle({ component: Landing, title: 'Welcome to Z³!' });
const BedtimeRoutineComponent = withTitle({ component: BedtimeRoutine, title: 'Bedtime Routine – Z³' });
const HomeComponent = withTitle({ component: Home, title: 'Home – Z³' });
const RegisterComponent = withTitle({ component: Register, title: 'Sign Up – Z³' });
const UserSettingsComponent = withTitle({ component: UserSettings, title: 'Settings – Z³' });
const SleepComponent = withTitle({ component: sleep, title: 'Log Sleep – Z³' });
const LogSleepComponent = withTitle({ component: logSleep, title: 'Log Sleep – Z³' });
const logWakeComponent = withTitle({ component: logWake, title: 'Log Wake – Z³' });
const ChronotypeComponent = withTitle({ component: Chronotype, title: 'Chronotype Test– Z³' });
const ChronoResultsComponent = withTitle({ component: ChronoResults, title: 'Chronotype Results– Z³' });
const PersonalityComponent = withTitle({ component: Personality, title: 'Personality Test – Z³' });
const PersonalityIntroComponent = withTitle({ component: PersonalityIntro, title: 'Find Your Personality – Z³' });
const PersonalityResultsComponent = withTitle({ component: PersonalityResults, title: 'Personality Results – Z³' });
const MindfulnessModulesComponent = withTitle({ component: MindfulnessModules, title: 'Mindfulness – Z³' });
const LoggingComponent = withTitle({ component: Logging, title: 'Log Exercise, Caffeine, and Stress – Z³' });
const reportComponent = withTitle({ component: report, title: 'Report – Z³' });
const ExampleModuleComponent = withTitle({ component: ExampleModule, title: '5-minute Meditation – Z³' });
const mindfulLeadershipComponent = withTitle({ component: mindfulLeadership, title: 'Mindful Leadership – Z³' });
const MindfulYogaComponent = withTitle({ component: MindfulYoga, title: 'Mindful Yoga – Z³' });
const BodyScanMeditationComponent = withTitle({ component: BodyScanMeditation, title: '10-minute Medication – Z³' });
const MindfulnessOverviewComponent = withTitle({ component: MindfulnessOverview, title: 'Mindfulness Overview – Z³' });
const MindfulEatingComponent = withTitle({ component: MindfulEating, title: 'Mindful Eating – Z³' });
const MobileBedtimeRoutineComponent = withTitle({ component: MobileBedtimeRoutine, title: 'Bedtime Routine – Z³' });
const MobileMindfulnessModulesComponent = withTitle({ component: MobileMindfulnessModules, title: 'Mindfulness Modules – Z³' });
const MobileExampleModuleComponent = withTitle({ component: MobileExampleModule, title: '5-minute Meditation – Z³' });
const MobileLandingComponent = withTitle({ component: MobileLanding, title: 'Welcome to Z³!' });
const NotFoundComponent = withTitle({ component: NotFound, title: 'Page Not Found :\'(' });

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={LandingComponent}/>
              <Route path ="/bedtimeRoutine" component={BedtimeRoutineComponent}/>
              <Route path ="/home" component={HomeComponent}/>
              <Route path ="/register" component={RegisterComponent}/>
              <Route path="/settings" component={UserSettingsComponent}/>
              <Route path="/sleep" component={SleepComponent}/>
              <Route path="/logSleep" component={logSleepComponent}/>
              <Route path="/logWake" component={logWakeComponent}/>
              <Route path="/chronotype" component={ChronotypeComponent}/>
              <Route path="/chronoResults" component={ChronoResultsComponent}/>
              <Route path="/personality" component={PersonalityComponent}/>
              <Route path="/personalityIntro" component={PersonalityIntroComponent}/>
              <Route path="/personalityResults" component={PersonalityResultsComponent}/>
              <Route path="/mindfulnessModules" component={MindfulnessModulesComponent}/>
              <Route path="/logging" component={LoggingComponent}/>
              <Route path="/report" component={reportComponent}/>
              <Route path="/ExampleModule" component={ExampleModuleComponent}/>
              <Route path="/mindfulLeadership" component={mindfulLeadershipComponent}/>
              <Route path="/MindfulYoga" component={MindfulYogaComponent}/>
              <Route path="/BodyScanMeditation" component={BodyScanMeditationComponent}/>
              <Route path="/MindfulnessOverview" component={MindfulnessOverviewComponent}/>
              <Route path="/MindfulEating" component={MindfulEatingComponent}/>
              <Route path="/MobileBedtimeRoutine" component = {MobileBedtimeRoutineComponent}/>
              <Route path="/MobileMindfulnessModules" component = {MobileMindfulnessModulesComponent}/>
              <Route path="/MobileExampleModule" component = {MobileExampleModuleComponent}/>
              <Route path="/mobile" component = {MobileLandingComponent}/>
              <Route component = {NotFoundComponent}/>
          </Switch>
      </Router>
  );
}
export default App;