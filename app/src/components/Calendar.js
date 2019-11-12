import React from 'react'
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/calendar.css";
import CalendarButtons from "./CalendarButtons";

const calendar = () =>
    <div class="calendar d-flex justify-content-center align-items-center">
        <h1>Calendar</h1>
        <br/><br/>
        <CalendarButtons/>
    </div>

export default calendar
