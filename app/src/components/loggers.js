import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import "../styles/calendar.css";
import Taboo from "./logging";
import SideBar from "./sideMenu";

const logger = () =>
    <div class="content logging" id="App">
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
            <div className="inner" id="page-wrap">
                <h1 className="blueHeader">Logging </h1>
                <hr className="hr-settings"/>
                <h4>Log your exercise, coffee, & stress.</h4>
                <br/>
                <Taboo/>
                <button className='btn'>Submit</button>
        </div>
    </div>

export default logger
