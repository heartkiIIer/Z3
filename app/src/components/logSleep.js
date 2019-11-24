import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";

class LogSleep extends React.Component{
    render(){
        return (
            <div className="content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div className="inner" id="page-wrap">
                        <div class = "time" align='center'>
                            <h1 className="sleepHeader" align='center'>Ready for bed?</h1>
                            <a href="/logWake"><button className='btn' id="extended" onClick="myFunction()">Goodnight</button></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default LogSleep;