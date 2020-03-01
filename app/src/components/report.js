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
                weeksAgo: 0,
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
                sleep: null,
                stress: null,
                goal: null,
                caf: null,
                exer: null,
                weeksAgo: 0,
            };
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
        var cardsToGenerate = []; //2d/3d array
        //[x][0] date [x][1] cups [x][2] sleep [x][3] stressEntries (array) [x][4] exercise

        //Iterate through all entries and sort them together by date
        //Caffeine
        for(var i = 0; i < Object.keys(this.state.caf).length; i++){
            //if empty, add to the array
            if(cardsToGenerate.length == 0){
                cardsToGenerate.push([this.state.caf[i].date, this.state.caf[i].cups, 0, [], 0]);
            }
            //otherwise
            else{
                var added = false; //record true when finished

                //check if that date is already entered
                for(var j = 0; j < cardsToGenerate.length; j++){
                    var dateInArr = new Date(cardsToGenerate[j][0]);
                    var dateToEnter = new Date(this.state.caf[i].date);
                    if(dateInArr.getDate() == dateToEnter.getDate() && dateInArr.getFullYear() == dateToEnter.getFullYear() && dateInArr.getMonth() == dateToEnter.getMonth()){
                        console.log("date equal");
                        added=true;

                        cardsToGenerate[j][1] = cardsToGenerate[j][1] + this.state.caf[i].cups;
                    }
                }
                //otherwise just add a new entry
                if(!added){
                    cardsToGenerate.push([this.state.caf[i].date, this.state.caf[i].cups, 0, [], 0]);
                }
            }
        }

        //Sleep
        for(var i = 0; i < Object.keys(this.state.sleep).length; i++){
            //disregard entries where wake up is not recorded
            if(this.state.sleep[i].terminate != null){
                //if empty, add to the array
                if(cardsToGenerate.length == 0){
                    var initial = new Date (this.state.sleep[i].initial);
                    var terminate = new Date(this.state.sleep[i].terminate);
                    cardsToGenerate.push([this.state.sleep[i].initial, 0, (terminate.getTime() - initial.getTime())/(1000*3600), [], 0]);
                }
                //otherwise
                else{
                    var added = false; //record true when finished

                    //check if that date is already entered
                    for(var j = 0; j < cardsToGenerate.length; j++){
                        var dateInArr = new Date(cardsToGenerate[j][0]);
                        var dateToEnter = new Date(this.state.sleep[i].initial);
                        var terminate = new Date(this.state.sleep[i].terminate);
                        if(dateInArr.getDate() == dateToEnter.getDate() && dateInArr.getFullYear() == dateToEnter.getFullYear() && dateInArr.getMonth() == dateToEnter.getMonth()){
                            console.log("date equal");
                            added=true;

                            cardsToGenerate[j][2] = cardsToGenerate[j][2] + (terminate.getTime() - dateToEnter.getTime())/(1000*3600);
                        }
                    }
                    //otherwise just add a new entry
                    if(!added){
                        var initial = new Date (this.state.sleep[i].initial);
                        var terminate = new Date(this.state.sleep[i].terminate);
                        cardsToGenerate.push([this.state.sleep[i].initial, 0, (terminate.getTime() - initial.getTime())/(1000*3600), [], 0]);                }
                }
            }
        }

        console.log(cardsToGenerate);


        //Iterate through all day by day and populate card

        console.log(this.state.stress);
        console.log(this.state.goal);
        console.log(this.state.caf);
        console.log(this.state.exer);
        console.log(this.state.sleep);
        var date = new Date(this.state.caf[0].date);
        console.log(date.getFullYear());
        return <ReportComponent date={"--"} sleep ={"--"} stress = {"--"} exer = {"--"} caf = {"--"}/>;
    }
}
export default report;