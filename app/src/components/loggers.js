import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import "../styles/calendar.css";
import Taboo from "./logging";

const logger = () =>
    <div class="content logging">
        <div className="inner">
                <h1 className="blueHeader">Logging </h1>
                <hr className="hr-settings"/>
                <h4>Log your exercise, coffee, & stress.</h4>
                <br/>
                <Taboo/>
                <button className='btn'>Submit</button>
        </div>
    </div>

export default logger
