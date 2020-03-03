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
                avgCaf : null,
                numCaf : null,
                avgSleep : null,
                numSleep : null,
                arrStress : null,
                avgExer : null,
                numExer : null,
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
                avgCaf : null,
                numCaf : null,
                avgSleep : null,
                numSleep : null,
                arrStress : null,
                avgExer : null,
                numExer : null,
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
            fetch('https://sleepwebapp.wpi.edu:5000/getWeekExer', {
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
                return fetch('https://sleepwebapp.wpi.edu:5000/getWeekCaf', {
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
                return fetch('https://sleepwebapp.wpi.edu:5000/getWeekSleep', {
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
                return fetch('https://sleepwebapp.wpi.edu:5000/getWeekStress', {
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
                return fetch('https://sleepwebapp.wpi.edu:5000/getSleepGoal', {
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
        if((this.state.sleep == null || this.state.goal == null || this.state.stress == null || this.state.caf == null || this.state.exer == null) && (this.state.avgCaf == null || this.state.numCaf ==null || this.state.avgSleep == null || this.state.arrStress.length != 0 || this.state.numSleep == null || this.state.avgExer == null || this.state.numExer ==null)){
            return (
            <div class = "reportClass" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap" align="center">
                    <h1 className="blueHeader" align="center">Sleep Goal: -- hrs per day</h1>
                    <hr className="hr-settings"/>
                    <h1 className="blueHeader">Weekly Overview</h1>
                    <div className="week" class="flex-report">
                        <div className="goalProg">
                            <CircularProgressbar value={0} text={`--`} />
                        </div>
                        <div className="percentage">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">-- hrs</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">--</h1>
                            <p>Average Exercise:</p>
                            <h1 className="smallTimeHeader">-- min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">-- Cups</h1>
                        </div>
                    </div>
                    <button className='btn' id = "extended">
                            Prev 7 Days
                    </button>
                    <button className='btn' style={{marginRight:'0px'}}>
                            Next 7 Days
                    </button>
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
        else if (this.state.avgCaf != null && this.state.numCaf !=null && this.state.avgSleep != null && this.state.arrStress.length != null && this.state.numSleep != null && this.state.avgExer != null && this.state.numExer !=null){
            var sleepGoal;
            if(this.state.goal[0].sleepgoal == null){
                sleepGoal = "Sleep Goal: -- hrs per day";
            }
            else{
                sleepGoal = "Sleep Goal: " + this.state.goal[0].sleepgoal.toString() + " hrs per day";
            }
            var caf;
            var sleep;
            var stress;
            var exer;

            if(this.state.numCaf !=0){
                caf = Math.round(this.state.avgCaf/this.state.numCaf);
            }
            else{
                caf = 0;
            }
            if(this.state.numSleep !=0){
                sleep = Math.round(this.state.avgSleep/this.state.numSleep);
            }
            else{
                sleep = 0;
            }
            if(this.state.numExer !=0){
                exer = Math.round(this.state.avgExer/this.state.numExer);
            }
            else{
                exer = 0;
            }
            if(this.state.arrStress.length !=0){
                var sortArr = this.state.arrStress.sort();
                var mid = Math.floor(sortArr.length/2)
                var median = sortArr[mid];

                if(median < 40){
                    stress = "Low";
                }
                else if (median >= 45){
                    stress = "Medium";
                }
                else {
                    stress = "High";
                }
            }
            else{
                stress = "--";
            }

            console.log((sleep/this.state.goal[0].sleepgoal)*10);

            return (
                <div class = "reportClass" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="inner" id="page-wrap" align="center">
                        <h1 className="blueHeader" align="center">{sleepGoal}</h1>
                        <hr className="hr-settings"/>
                        <h1 className="blueHeader">Weekly Overview</h1>
                        <div className="week" class="flex-report">
                            <div className="goalProg">
                                <CircularProgressbar value={(sleep/this.state.goal[0].sleepgoal)*10} text={`${(sleep/this.state.goal[0].sleepgoal)*10}%`} />
                            </div>
                            <div className="percentage">
                                <p>Average Sleep:</p>
                                <h1 className="timeHeader">{sleep+ " hrs"}</h1>
                                <p>Average Stress Level:</p>
                                <h1 className="smallTimeHeader">{stress}</h1>
                                <p>Average Exercise:</p>
                                <h1 className="smallTimeHeader">{exer.toString() + " min"}</h1>
                                <p>Average Caffeine Consumption:</p>
                                <h1 className="smallTimeHeader">{caf.toString() + " cups"}</h1>
                            </div>
                        </div>
                        <button className='btn' id = "extended" onClick={()=>this.changeWeek("minus7")}>
                            Prev 7 Days
                        </button>
                        <button className='btn' style={{marginRight:'0px'}}  onClick={()=>this.changeWeek("plus7")}>
                            Next 7 Days
                        </button>
                        {this.generateComponent()}
                    </div>
                </div>
            );
        }

        else {
            var sleepGoal;
            if(this.state.goal[0].sleepgoal == null){
                sleepGoal = "Sleep Goal: -- hrs per day";
            }
            else{
                sleepGoal = "Sleep Goal: " + this.state.goal[0].sleepgoal.toString() + " hrs per day";
            }

            return (
                <div class = "reportClass" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="inner" id="page-wrap" align="center">
                        <h1 className="blueHeader" align="center">{sleepGoal}</h1>
                        <hr className="hr-settings"/>
                        <h1 className="blueHeader">Weekly Overview</h1>
                        <div className="week" class="flex-report">
                            <div className="goalProg">
                                <CircularProgressbar value={0} text={`--`} />
                            </div>
                            <div className="percentage">
                                <p>Average Sleep:</p>
                                <h1 className="timeHeader">-- hrs</h1>
                                <p>Average Stress Level:</p>
                                <h1 className="smallTimeHeader">--</h1>
                                <p>Average Exercise:</p>
                                <h1 className="smallTimeHeader">-- min</h1>
                                <p>Average Caffeine Consumption:</p>
                                <h1 className="smallTimeHeader">-- Cups</h1>
                            </div>
                        </div>
                        <button className='btn' id = "extended">
                            Prev 7 Days
                        </button>
                        <button className='btn' style={{marginRight:'0px'}}>
                            Next 7 Days
                        </button>
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

        //Stress
        for(var i = 0; i < Object.keys(this.state.stress).length; i++){
            //if empty, add to the array
            if(cardsToGenerate.length == 0){
                cardsToGenerate.push([this.state.stress[i].date, 0, 0, [this.state.stress[i].stress], 0]);
            }
            //otherwise
            else{
                var added = false; //record true when finished

                //check if that date is already entered
                for(var j = 0; j < cardsToGenerate.length; j++){
                    var dateInArr = new Date(cardsToGenerate[j][0]);
                    var dateToEnter = new Date(this.state.stress[i].date);
                    if(dateInArr.getDate() == dateToEnter.getDate() && dateInArr.getFullYear() == dateToEnter.getFullYear() && dateInArr.getMonth() == dateToEnter.getMonth()){
                        added=true;
                        cardsToGenerate[j][3] = cardsToGenerate[j][3].push(this.state.stress[i].stress);
                    }
                }
                //otherwise just add a new entry
                if(!added){
                    cardsToGenerate.push([this.state.stress[i].date, 0, 0, [this.state.stress[i].stress], 0]);
                }
            }
        }
        //Exercise
        for(var i = 0; i < Object.keys(this.state.exer).length; i++){
            //if empty, add to the array
            if(cardsToGenerate.length == 0){
                cardsToGenerate.push([this.state.exer[i].date, 0, 0, [], this.state.exer[i].minutes]);
            }
            //otherwise
            else{
                var added = false; //record true when finished

                //check if that date is already entered
                for(var j = 0; j < cardsToGenerate.length; j++){
                    var dateInArr = new Date(cardsToGenerate[j][0]);
                    var dateToEnter = new Date(this.state.exer[i].date);
                    if(dateInArr.getDate() == dateToEnter.getDate() && dateInArr.getFullYear() == dateToEnter.getFullYear() && dateInArr.getMonth() == dateToEnter.getMonth()){
                        added=true;
                        cardsToGenerate[j][4] = cardsToGenerate[j][4] + this.state.exer[i].minutes;
                    }
                }
                //otherwise just add a new entry
                if(!added){
                    cardsToGenerate.push([this.state.exer[i].date, 0, 0, [], this.state.exer[i].minutes]);
                }
            }
        }

        console.log(this.state.stress);
        console.log(this.state.goal);
        console.log(this.state.caf);
        console.log(this.state.exer);
        console.log(this.state.sleep);
        console.log(this.state.weeksAgo);


        //Iterate through all day by day and populate card given a range
        cardsToGenerate.sort(function(a, b){
            return a>b ? -1 : a<b ? 1 : 0;
        })

        console.log(cardsToGenerate);

        //reference : https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-week-in-javascript
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        var avgCaf = 0;
        var numCaf = 0;
        var avgSleep = 0;
        var numSleep = 0;
        var arrStress = [];
        var avgExer = 0;
        var numExer = 0;

        var arrToReturn = [];
        //[x][0] date [x][1] cups [x][2] sleep [x][3] stressEntries (array) [x][4] exercise

        for(var i = 7*this.state.weeksAgo; i < (7*this.state.weeksAgo) +7; i++){
            if(cardsToGenerate[i] != null) {
                var formatStress;
                var formatCaf;
                var formatExer;
                var formatSleep;
                var formatDate;

                //Stress
                if(cardsToGenerate[i][3].length != 0){
                    var sortArr = cardsToGenerate[i][3].sort();
                    var mid = Math.floor(sortArr.length/2)
                    var median = sortArr[mid];

                    if(median < 40){
                        formatStress = "Low";
                    }
                    else if (median >= 45){
                        formatStress = "Medium";
                    }
                    else {
                        formatStress = "High";
                    }
                }
                else{
                    formatStress = "--"
                }

                formatCaf = cardsToGenerate[i][1];
                formatExer = cardsToGenerate[i][4];
                formatSleep = (Math.round(cardsToGenerate[i][2] * 10)/10).toFixed(1);
                var date = new Date (cardsToGenerate[i][0]);
                formatDate = (date.getMonth()+1) + "-"  + date.getDate()+ "-" + date.getFullYear();
                //[x][0] date [x][1] cups [x][2] sleep [x][3] stressEntries (array) [x][4] exercise

                if((date.getTime() <= lastday.getTime() && date.getTime() >= firstday.getTime())){
                    avgCaf += cardsToGenerate[i][1];
                    numCaf++;
                    avgSleep += cardsToGenerate[i][2];
                    numSleep++;
                    for(var k = 0; k < cardsToGenerate[i][3].length; k++) {
                        arrStress.push(cardsToGenerate[i][3][k]);
                    }
                    avgExer += cardsToGenerate[i][4];
                    numExer++;
                }

                arrToReturn.push(<ReportComponent date={formatDate} sleep={formatSleep} stress={formatStress} exer={formatExer} caf={formatCaf}/>)
            }
            else{
                arrToReturn.push(<ReportComponent date={"--"} sleep={"--"} stress={"--"} exer={"--"} caf={"--"}/>)

            }
        }

        if(this.state.avgCaf == null){
            this.setState({
                avgCaf : avgCaf,
                numCaf : numCaf,
                avgSleep : avgSleep,
                numSleep : numSleep,
                arrStress : arrStress,
                avgExer : avgExer,
                numExer : numExer,
            })
        }

        return (arrToReturn) ;
    }

    changeWeek(element){
        if(element.equals( "plus7")){
            this.setState({
                weeksAgo: this.state.weeksAgo++,
                sleep: null,
                stress: null,
                goal: null,
                caf: null,
                exer: null,
                avgCaf : null,
                numCaf : null,
                avgSleep : null,
                numSleep : null,
                arrStress : null,
                avgExer : null,
                numExer : null,
            }, ()=>{
                let currentComponent = this;
                this.getWeek(currentComponent)
            });
        }
        else if(this.state.weeksAgo != 0){
            this.setState({
                weeksAgo: this.state.weeksAgo--,
                sleep: null,
                stress: null,
                goal: null,
                caf: null,
                exer: null,
                avgCaf : null,
                numCaf : null,
                avgSleep : null,
                numSleep : null,
                arrStress : null,
                avgExer : null,
                numExer : null,
            },  ()=>{
                let currentComponent = this;
                this.getWeek(currentComponent)
            });
        }
    }
}
export default report;