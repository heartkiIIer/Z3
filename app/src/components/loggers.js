import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
// import "../styles/calendar.css";
import "../styles/ItsBedtime.css";
import Taboo from "./logging";

const logger = () =>
    <div class="content">
        <div className="inner">
                <h1 className="blueHeader">Log Exercise </h1>
                <hr className="hr-settings"/>
                <Taboo/>
                <button className='btn'>Submit</button>
        </div>
    </div>

export default logger
