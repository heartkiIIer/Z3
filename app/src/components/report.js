import React, { Component } from 'react';
import '../styles/ItsBedtime.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class report extends React.Component{
    render(){
        return (
            <div class = "reportClass">
                <div class = "inner" id ="in">
                    <h1 className="blueHeader" align="center">Average sleep this week:</h1>
                    <h1 className="timeHeader" align="center">7 hrs 30 min</h1>
                    <br/>
                    <div>
                        <h1 className="blueHeader">Monday</h1>
                        <hr className="hr-settings"/>
                        <div className="data">
                            <p>Total Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Total Caffeine:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                            <p>Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div class="percentage">
                            <CircularProgressbar value={93.75} text={`${93.75}%`}/>
                        </div>
                    </div>


                </div>
            </div>
        );
    };
}
export default report;