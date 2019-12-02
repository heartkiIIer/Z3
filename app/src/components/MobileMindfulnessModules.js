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
                            <MobileTile name = "Mindful Walking"/>
                            <MobileTile name = "Daily Mindfulness"/>
                            <a href = "/ExampleModule">
                                <MobileTile name = "Mindful Eating"/>
                            </a>

                            <MobileTile name = "Mindful Walking"/>
                            <MobileTile name = "Daily Mindfulness"/>
                            <MobileTile name = "Mindful Eating"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default MindfulnessModules;
