import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SideBar from "./sideMenu";
import MobileTile from "./MobileTile";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the mindfulness modules page.
 * */

class MindfulnessModules extends React.Component {
    render(){
        return (
            <div class = "content modules mobilePage " id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div className="inner mindfulnessMobile" id="page-wrap">
                        <h1 class = "blueHeader"> Mindfulness Modules</h1>
                        <hr class = "hr-settings"/>
                        <h4>Explore mindfulness topics: proven to improve sleep!</h4>


                        <div class = "flex-column-nowrap">
                            <a href = "/MindfulnessOverview">
                                <MobileTile name = "Mindfulness Overview"/>
                            </a>
                            <a href = "/MindfulYoga">
                                <MobileTile name = "Mindful Yoga"/>
                            </a>
                            <a href = "/BodyScanMeditation">
                                <MobileTile name = "10 Minute Meditation"/>
                            </a>
                            <a href = "/ExampleModule">
                                <MobileTile name = "5 Minute Meditation"/>
                            </a>
                            <a href = "/MindfulEating">
                                <MobileTile name = "Mindful Eating"/>
                            </a>
                            <a href = "/mindfulLeadership">
                                <MobileTile name = "Mindful Leadership"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default MindfulnessModules;
