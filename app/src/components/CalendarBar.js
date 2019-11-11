import React from 'react';
import "../styles/calendar.css";
import CSlider from "./CSlider";

const calendarbar = () =>
        <div class="calendarbar d-flex justify-content-center align-items-center">
            <h1>Rate Stress Level for Each Event</h1>
            <br/><br/>
            <CSlider/>
            <button className='btn'>Submit</button>
        </div>

export default calendarbar