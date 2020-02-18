import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileMindfulnessModules from "./MobileMindfulnessModules";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the mindfulness modules page.
 * */

class MindfulnessModules extends React.Component {
    constructor(props){
        super(props)
        var mobile;
        if(window.innerWidth >= 700){
            mobile = false;
        }
        else{
            mobile = true;
        }
        this.state = { isEditable: false, stage: 0, isMobile: mobile};
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    mobile: true
                });
            }
            else {
                this.setState({
                    mobile: false
                })
            }
        })
    }

    render(){
        this.resize();
        if(this.state.isMobile){
            return (
                <MobileMindfulnessModules/>
            );
        }
        else{
            return (
                <div class = "content modules" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                    <div className="inner" id="page-wrap">
                        <h1 class = "blueHeader"> Mindfulness Modules</h1>
                        <hr class = "hr-settings"/>
                        <h4>Explore mindfulness topics: proven to improve sleep!</h4>


                        <div class = "flex-row-wrap">
                            <a href = "/MindfulnessOverview">
                                <Tile name = "Mindfulness Overview"/>
                            </a>
                            <a href = "/MindfulYoga">
                                <Tile name = "Mindful Yoga"/>
                            </a>
                            <a href = "/ExampleModule">
                                <Tile name = "5 Minute Meditation"/>
                            </a>
                            <a href = "/BodyScanMeditation">
                                <Tile name = "10 Minute Meditation"/>
                            </a>
                            <a href = "/MindfulEating">
                                <Tile name = "Mindful Eating"/>
                            </a>
                            <a href = "/mindfulLeadership">
                                <Tile name = "Mindful Leadership"/>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
    };
}
export default MindfulnessModules;
