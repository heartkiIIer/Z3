import React, { Component } from 'react';
import '../styles/ItsBedtime.css';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./sideMenu";


class report extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                week: null
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
                week: null
            };
        }
    }

    componentDidMount(){
        let currentComponent = this;
        this.getWeek(currentComponent)
    }

    getWeek(currentComponent) {
        function updateStates(r) {
            currentComponent.setState({week : r.json()})
        }

        fetch('http://sleepwebapp.wpi.edu:5000/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( r => {
            return r.json();
        }).then(r => {
            currentComponent.setState({routine : r})
        })
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '10% 10% 5%'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px'
                })
            }
        })
    }
    render(){
        this.resize();
        return (
            <div class = "reportClass" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 className="blueHeader" align="center">Sleep Goal: 8 hrs</h1>
                    <hr className="hr-settings"/>
                    <h1 className="blueHeader">Weekly Overview</h1>
                    <div className="week" class="flex-report">
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
                    <h1 className="blueHeader">Monday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader" >Sunday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader">Saturday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader">Friday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader">Thursday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader">Wednesday</h1>
                    <div className="day" class="flex-report">
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
                    <h1 className="blueHeader">Tuesday</h1>
                    <div className="day" class="flex-report">
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