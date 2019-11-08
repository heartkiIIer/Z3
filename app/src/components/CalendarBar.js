import React from 'react';
import "../styles/calendar.css";
import CSlider from "./CSlider";

const calendarbar = () =>
    <div>
        <div class="cal"><h1>Rate Stress Level for Each Event</h1></div>
        <div class="calendarbar">
            <br/><br/>
            <CSlider/>
            <button class='btn'>Submit</button>
        </div>

    </div>


export default calendarbar