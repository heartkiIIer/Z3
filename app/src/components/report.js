import React, { Component } from 'react';
import '../styles/ItsBedtime.css'

class report extends React.Component{
    render(){
        return (
            <div class = "reportClass">
                <div class = "inner" id ="in">
                    <h1 className="blueHeader">Monday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="timeHeader">8 hrs 30 min</h1>

                    <h1 className="blueHeader">Tuesday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>

                    <h1 className="blueHeader">Wednesday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>

                    <h1 className="blueHeader">Thursday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>

                    <h1 className="blueHeader">Friday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>

                    <h1 className="blueHeader">Saturday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>

                    <h1 className="blueHeader">Sunday</h1>
                    <hr className="hr-settings"/>
                    <p>Total Sleep:</p>
                    <h1 className="blueHeader"> </h1>
                </div>
            </div>
        );
    };
}
export default report;