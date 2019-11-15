import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/calendar.css";
import CalendarButtons from "./CalendarButtons";
import CSlider from "./CSlider";

const calendar = () =>
    <div class="calendar d-flex justify-content-center align-items-center">
        <br/><br/>
        <h1>Rate Stress Level for Each Event</h1>
        <br/>
        <CalendarButtons/>
        <br/><br/>
        <CSlider/>
        <button className='btn'>Submit</button>
    </div>

export default calendar
