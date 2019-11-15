import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/calendar.css";
import LSlider from "./logging";

const logger = () =>
    <div class="logger d-flex justify-content-center align-items-center">
        <br/><br/>
        <h1>Log Exercise & Caffeine for the day </h1>
        <br/><br/>
        <LSlider/>
        <button className='btn'>Submit</button>
    </div>

export default logger
