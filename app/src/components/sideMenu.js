import React from "react";
import {slide as Menu } from "react-burger-menu";
import logout from '../scripts/login'

export default props => {
    return (
        <Menu {...props}>
            <a className="menu-item" href='/home'>
                Home
            </a>
            <a className="menu-item" href="/logSleep">
                Log Sleep
            </a>
            <a className="menu-item" href="/logging">
                Log Other
            </a>
            <a className="menu-item" href="/report">
                Report
            </a>
            <a className="menu-item" href="/mindfulnessModules">
                Mindfulness
            </a>
            <a className="menu-item" href="/personalityIntro">
                Personality Test
            </a>
            <a className="menu-item" href="/bedtimeRoutine">
                Bedtime Routine
            </a>
            <a className="menu-item" href="/settings">
                Settings
            </a>
            <a className="menu-item" onClick={logout}>
                Log Out
            </a>
    </Menu>
    );
};