import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the mindfulness modules page.
 * */

class MindfulnessModules extends React.Component {

    render(){
        return (
            <div class = "content modules" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div className="inner" id="page-wrap">
                    <h1 class = "blueHeader"> Mindfulness Modules</h1>
                    <hr class = "hr-settings"/>
                    <h4>Explore mindfulness topics: proven to improve sleep!</h4>


                    <div class = "flex-row-wrap">
                        <Tile name = "Mindful Walking"/>
                        <Tile name = "Daily Mindfulness"/>
                        <a href = "/ExampleModule">
                            <Tile name = "Mindful Eating"/>
                        </a>

                        <Tile name = "Mindful Walking"/>
                        <Tile name = "Daily Mindfulness"/>
                        <Tile name = "Mindful Eating"/>
                    </div>
                </div>
                </div>
            </div>
        );
    };
}
export default MindfulnessModules;
