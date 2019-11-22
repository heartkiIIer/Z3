import React, { Component } from 'react';
import '../styles/logSleep.css'

class LogWake extends React.Component{
    render(){
        return (
            <div class = "content logSleep">
                <div class = "sleepInner" id="in">
                    <div class = "time" align='center'>
                        <h1 className="wakeHeader" align='center'>Are you up?</h1>
                        <a href="/logSleep"><button className='btn' id="extended" onClick="myFunction()">Good Morning</button></a>
                    </div>
                </div>
            </div>
        );
    };
}

export default LogWake;