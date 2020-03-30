import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Home from './components/Home/Home.js';
import Register from './components/Register.js'
import LogOther from './components/LogOther/LogOther'
import UserSettings from "./components/UserSettings/UserSettings";
import LogSleep from './components/Sleep/LogSleep';
import Chronotype from './components/Personality/Chronotype';
import ChronoResults from './components/Personality/ChronoResults';
import Personality from './components/Personality/Personality';
import PersonalityIntro from './components/Personality/PersonalityIntro';
import PersonalityResults from './components/Personality/PersonalityResults';
import MindfulnessModules from './components/Mindfulness/MindfulnessModules';
import Report from "./components/Report/Report";
import Sleep from "./components/Sleep/Sleep";
import ExampleModule from './components/Mindfulness/ExampleModule';
import NotFound from './components/NotFound';
import LogWake from "./components/Sleep/LogWake";
import BedtimeRoutine from "./components/BedtimeRoutine/ItsBedtimeRoutine";
import MobileBedtimeRoutine from "./components/BedtimeRoutine/MobileBedtimeRoutine";
import MobileMindfulnessModules from "./components/Mindfulness/MobileMindfulnessModules";
import MobileExampleModule from "./components/Mindfulness/MobileExampleModule";
import MobileLanding from "./components/Landing/MobileLanding";
import MindfulLeadership from "./components/Mindfulness/MindfulLeadership";
import MindfulYoga from "./components/Mindfulness/MindfulYoga";
import BodyScanMeditation from "./components/Mindfulness/BodyScanMeditation";
import MindfulnessOverview from "./components/Mindfulness/MindfulnessOverview";
import MindfulEating from "./components/Mindfulness/MindfulEating";
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
const SleepComponent = withTitle({ component: Sleep, title: 'Sleep – Z³' });
const LogSleepComponent = withTitle({ component: LogSleep, title: 'Log Sleep – Z³' });
const LogWakeComponent = withTitle({ component: LogWake, title: 'Log Wake – Z³' });
const ChronotypeComponent = withTitle({ component: Chronotype, title: 'Chronotype Test– Z³' });
const ChronoResultsComponent = withTitle({ component: ChronoResults, title: 'Chronotype Results– Z³' });
const PersonalityComponent = withTitle({ component: Personality, title: 'Personality Test – Z³' });
const PersonalityIntroComponent = withTitle({ component: PersonalityIntro, title: 'Find Your Personality – Z³' });
const PersonalityResultsComponent = withTitle({ component: PersonalityResults, title: 'Personality Results – Z³' });
const MindfulnessModulesComponent = withTitle({ component: MindfulnessModules, title: 'Mindfulness – Z³' });
const LogOtherComponent = withTitle({ component: LogOther, title: 'Log Exercise, Caffeine, and Stress – Z³' });
const ReportComponent = withTitle({ component: Report, title: 'Report – Z³' });
const ExampleModuleComponent = withTitle({ component: ExampleModule, title: '5-minute Meditation – Z³' });
const MindfulLeadershipComponent = withTitle({ component: MindfulLeadership, title: 'Mindful Leadership – Z³' });
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
              <Route path ="/BedtimeRoutine" component={BedtimeRoutineComponent}/>
              <Route path ="/Home" component={HomeComponent}/>
              <Route path ="/Register" component={RegisterComponent}/>
              <Route path="/Settings" component={UserSettingsComponent}/>
              <Route path="/Sleep" component={SleepComponent}/>
              <Route path="/LogSleep" component={LogSleepComponent}/>
              <Route path="/LogWake" component={LogWakeComponent}/>
              <Route path="/Chronotype" component={ChronotypeComponent}/>
              <Route path="/ChronoResults" component={ChronoResultsComponent}/>
              <Route path="/Personality" component={PersonalityComponent}/>
              <Route path="/PersonalityIntro" component={PersonalityIntroComponent}/>
              <Route path="/PersonalityResults" component={PersonalityResultsComponent}/>
              <Route path="/MindfulnessModules" component={MindfulnessModulesComponent}/>
              <Route path="/LogOther" component={LogOtherComponent}/>
              <Route path="/Report" component={ReportComponent}/>
              <Route path="/ExampleModule" component={ExampleModuleComponent}/>
              <Route path="/MindfulLeadership" component={MindfulLeadershipComponent}/>
              <Route path="/MindfulYoga" component={MindfulYogaComponent}/>
              <Route path="/BodyScanMeditation" component={BodyScanMeditationComponent}/>
              <Route path="/MindfulnessOverview" component={MindfulnessOverviewComponent}/>
              <Route path="/MindfulEating" component={MindfulEatingComponent}/>
              <Route path="/MobileBedtimeRoutine" component = {MobileBedtimeRoutineComponent}/>
              <Route path="/MobileMindfulnessModules" component = {MobileMindfulnessModulesComponent}/>
              <Route path="/MobileExampleModule" component = {MobileExampleModuleComponent}/>
              <Route path="/Mobile" component = {MobileLandingComponent}/>
              <Route component = {NotFoundComponent}/>
          </Switch>
      </Router>
  );
}
export default App;