import React from "react";
import {slide as Menu} from "react-burger-menu"
import {getUserID, logout} from '../scripts/login'
import {OAUTH} from "../scripts/FitbitScript";

//redirect user to autentication with fibit and grab fitbit data if the
// user allows for application to use fitbit data before directing them to reports page
// otherwise direct user to reports page
function useFitbit(){
    let idPromise = getUserID();
    idPromise.then(uid=>{
        const data = JSON.stringify({uid: uid});
        fetch('https://sleepwebapp.wpi.edu:5000/getUseFitbit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            return r.json();
        }).then(r => {
            if(r.length !== 0){
                if(r[0].fitbit){
                    window.location.assign(OAUTH);
                }
                else{
                    window.location.assign('https://sleepwebapp.wpi.edu/report')
                }
            }
        });
    });
}

export default props => {
    return (
        <Menu {...props}>
            <a className="menu-item" href='/Home'>
                Home
            </a>
            <a className="menu-item" href="/Sleep">
                Log Sleep
            </a>
            <a className="menu-item" href="/LogOther">
                Log Exercise, Caffeine, and Stress
            </a>
            <a className="menu-item" onClick={useFitbit}>
                Report
            </a>
            <a className="menu-item" href="/MindfulnessModules">
                Mindfulness
            </a>
            <a className="menu-item" href="/PersonalityIntro">
                Personality Test
            </a>
            <a className="menu-item" href="/BedtimeRoutine">
                Bedtime Routine
            </a>
            <a className="menu-item" href="/Settings">
                Settings
            </a>
            <a className="menu-item" onClick={logout}>
                Log Out
            </a>
    </Menu>
    );
};