import React, { Component } from 'react';
import '../styles/ItsBedtime.css';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./sideMenu";


class report extends React.Component{
    render(){
        return (
            <div class = "reportClass" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 className="blueHeader" align="center">Sleep Goal: 8 hrs</h1>
                    <hr className="hr-settings"/>
                    <h1 className="blueHeader">Weekly Overview</h1>
                    <div className="week">
                        <div className="goalProg">
                            <CircularProgressbar value={93} text={`${93}%`} />
                        </div>
                        <div className="percentage">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Monday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Sunday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Saturday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Friday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Thursday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Wednesday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                    <hr className="hr-settings"/>
                    <div className="day">
                        <h1 className="blueHeader">Tuesday</h1>
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">7 hrs 30 min</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">High</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">30 min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">1 Cup</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default report;