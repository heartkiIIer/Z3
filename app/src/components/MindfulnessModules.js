import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the mindfulness modules page.
 * */

class MindfulnessModules extends React.Component {

    render(){
        return (
            <div class = "content modules">
                <div class = "inner">
                    <h1 class = "blueHeader"> Mindfulness Modules</h1>
                    <hr class = "hr-settings"/>
                    <div class = "flex-row-wrap">
                        <Tile name = "Mindful Walking"/>
                        <Tile name = "Daily Mindfulness"/>
                        <Tile name = "Mindful Eating"/>
                        <Tile name = "Mindful Walking"/>
                        <Tile name = "Daily Mindfulness"/>
                        <Tile name = "Mindful Eating"/>
                    </div>
                </div>
            </div>
        );
    };
}
export default MindfulnessModules;
