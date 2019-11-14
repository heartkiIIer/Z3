import React from "react";
import {slide as Menu } from "react-burger-menu";

export default props => {
    return (
        <Menu {...props}>
            <a className="menu-item" href='/home'>
                Home
            </a>
            <a className="menu-item" href="/">
                Log Sleep
            </a>
            <a className="menu-item" href="/Calendar">
                Calender
            </a>
            <a className="menu-item" href="/CSlider">
                Calender Slide
            </a>
            <a className="menu-item" href="/">
                Log Others
            </a>
            <a className="menu-item" href="/">
                Mindfulness
            </a>
            <a className="menu-item" href="/bedtimeRoutine">
                Bedtime Routine
            </a>
            <a className="menu-item" href="/landing">
                Log Out
            </a>
    </Menu>
    );
};