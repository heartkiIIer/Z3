import React, { Component } from 'react';
import '../styles/ItsBedtime.css';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./sideMenu";
import ReportComponent from "./reportComponent";
import {getUserID} from "../scripts/login";

class report extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                sleep: null,
                stress: null,
                goal: null,
                caf: null,
                exer: null,
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
                sleep: null,
                stress: null,
                goal: null,
                caf: null,
                exer: null,            };
        }
    }

    componentDidMount(){
        let currentComponent = this;
        this.getWeek(currentComponent)
    }

    getWeek(currentComponent) {
        // get past sleep data
        // get stress data
        // get sleep goal
        // get caffiene entries
        // get exercise data

        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('http://sleepwebapp.wpi.edu:5000/getWeekExer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({exer : r})
            }).then(function(){
                return fetch('http://sleepwebapp.wpi.edu:5000/getWeekCaf', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data})
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({caf : r})
            }).then(function(){
                return fetch('http://sleepwebapp.wpi.edu:5000/getWeekSleep', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data})
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({sleep : r})
            }).then(function(){
                return fetch('http://sleepwebapp.wpi.edu:5000/getWeekStress', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data})
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({stress : r})
            }).then(function(){
                return fetch('http://sleepwebapp.wpi.edu:5000/getSleepGoal', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data})
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({goal : r})
            }).catch(error => alert(error.message));
        });

    };
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
        if(this.state.sleep == null || this.state.goal == null || this.state.stress == null || this.state.caf == null || this.state.exer == null){
            return (
            <div class = "reportClass" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 className="blueHeader" align="center">Sleep Goal: -- hrs</h1>
                    <hr className="hr-settings"/>
                    <h1 className="blueHeader">Weekly Overview</h1>
                    <div className="week" class="flex-report">
                        <div className="goalProg">
                            <CircularProgressbar value={93} text={`${93}%`} />
                        </div>
                        <div className="percentage">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">-- hrs</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">--</h1>
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">-- min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">-- Cups</h1>
                        </div>
                    </div>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                    <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>
                </div>
            </div>
        );
        }
        else {
            return (
                <div class = "reportClass" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="inner" id="page-wrap">
                        <h1 className="blueHeader" align="center">Sleep Goal: -- hrs</h1>
                        <hr className="hr-settings"/>
                        <h1 className="blueHeader">Weekly Overview</h1>
                        <div className="week" class="flex-report">
                            <div className="goalProg">
                                <CircularProgressbar value={93} text={`${93}%`} />
                            </div>
                            <div className="percentage">
                                <p>Average Sleep:</p>
                                <h1 className="timeHeader">-- hrs</h1>
                                <p>Average Stress Level:</p>
                                <h1 className="smallTimeHeader">--</h1>
                                <p>Total Exercise:</p>
                                <h1 className="smallTimeHeader">-- min</h1>
                                <p>Average Caffeine Consumption:</p>
                                <h1 className="smallTimeHeader">-- Cups</h1>
                            </div>
                        </div>
                        {this.generateComponent()}
                    </div>
                </div>
            );
        }
    };

    generateComponent() {
        //Iterate through all entries and fetch only entries that are within the last 7 days
        //Iterate through all day by day and populate card

        console.log(this.state.stress);
        console.log(this.state.goal);
        console.log(this.state.caf);
        console.log(this.state.exer);
        console.log("hi bb" + this.state.sleep);
        console.log(this.state.caf[0].date);
        return <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>;
    }
}
export default report;