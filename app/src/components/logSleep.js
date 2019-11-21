import React, { Component } from 'react';
import '../styles/logSleep.css'

class LogSleep extends React.Component{
    render(){
        return (
            <div class = "content">
                <div class = "inner" id ="in">
                    <div class = "time" align='center'>
                        <h1 className="sleepHeader" align='center'>Ready for bed?</h1>
                        <button className='btn' id="extended">Goodnight</button>
                    </div>
                </div>
            </div>
        );
    };
}
export default LogSleep;