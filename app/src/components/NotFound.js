import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the file not found page
 * */

class NotFound extends React.Component {

    render(){
        return (
            <div class = "content modules">
                <div class = "inner">
                    <h1 class = "blueHeader"> File not Found</h1>
                    <hr class = "hr-settings"/>

                </div>
            </div>
        );
    };
}
export default NotFound;
