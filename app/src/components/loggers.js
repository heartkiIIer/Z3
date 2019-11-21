import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
// import "../styles/calendar.css";
import "../styles/ItsBedtime.css";
import Taboo from "./logging";

const logger = () =>
    <div class="content">
        <div className="inner">
                <h1 className="blueHeader">Log Exercise & Caffeine for the day </h1>
                <hr className="hr-settings"/>
                <Taboo/>
                <button className='btn'>Submit</button>
        </div>
    </div>

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default logger
