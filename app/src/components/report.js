import React, { Component } from 'react';
import '../styles/ItsBedtime.css';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SideBar from "./sideMenu";
import ReportComponent from "./reportComponent";
import {getUserID} from "../scripts/login";
import Swal from "sweetalert2";

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
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
        let currentComponent = this;
        this.getWeek(currentComponent);
        // this.getUseFitbit();
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

    displayInfo(){
        Swal.fire({
            title: '<strong><u>Report Page Information</u></strong>',
            icon: 'info',
            html:<ul>
                <li>Set your nightly <b>Sleep Goal</b> in settings.</li>
                <li><b>Total Sleep</b> is the elapsed time between the time you went to bed and the time you wake up in the morning. If using Fitbit, this does not include 'restless/awake' periods.</li>
                <li><b>Total Exercise</b> is the sum of minutes of all your exercise for the day. When using Fitbit this number is calculated the same as your 'active minutes'.</li>
                <li><b>Total Caffeine</b> is the sum of all of your caffeine intake for the day.</li>.
                <li><b>Average Stress Level</b> takes all your rated events' stress levels and calculates the average level of stress for that day.</li>
                <li>The <b>Weekly Overview</b> shows the averages of each category for that week, as well as the percentage of your sleep goal completed based on your average hours of sleep.</li>
            </ul>,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
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
        if((this.state.sleep == null || this.state.goal == null || this.state.stress == null || this.state.caf == null || this.state.exer == null) && (this.state.avgCaf == null || this.state.numCaf ==null || this.state.avgSleep == null || this.state.arrStress.length != 0 || this.state.numSleep == null || this.state.avgExer == null || this.state.numExer ==null)){
            return (
            <div class = "reportClass" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner-report" id="page-wrap" align="center">
                    <div align='end'>
                    <button className='infoBut' style={{marginRight:'0px'}} onClick={() => this.displayInfo()}/>
                    </div>
                    <h1 className="blueHeader" align="center">Sleep Goal: -- hrs per day</h1>
                    <hr className="hr-report"/>
                    <br/>
                    <h1 className="blueHeader">Weekly Overview</h1>
                    <br/>
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
                    <button className='btn' style={{marginRight:'0px'}}>
                        Prev 7 Days
                    </button>
                    <button className='btn' id = "extended">
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
                // caf = Math.round(this.state.avgCaf/7);
            }
            else{
                caf = 0;
            }
            if(this.state.numSleep !=0){
                sleep = Math.round(this.state.avgSleep/this.state.numSleep*10)/10;
                // sleep = Math.round(this.state.avgSleep/7*10)/10;
            }
            else{
                sleep = 0;
            }
            if(this.state.numExer !=0){
                exer = Math.round(this.state.avgExer/this.state.numExer);
                // exer = Math.round(this.state.avgExer/7);
            }
            else{
                exer = 0;
            }
            if(this.state.arrStress.length !=0){
                var sortArr = this.state.arrStress.sort();
                var convTotal = 0;
                for(var i = 0; i < sortArr.length; i++){
                    //medium
                    if(sortArr[i] == 50){
                        convTotal = convTotal +1;
                    }
                    //high
                    else if (sortArr[i] == 98){
                        convTotal = convTotal +2;
                    }
                }

                var avg = Math.floor(convTotal/sortArr.length)

                //0
                if(avg == 0){
                    stress = "Low";
                }
                //50
                else if (avg == 1){
                    stress = "Medium";
                }
                //98
                else if (avg == 2) {
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
                    <div className="inner-report" id="page-wrap" align="center">
                        <div align='end'>
                            <button className='infoBut' style={{marginRight:'0px'}} onClick={() => this.displayInfo()}/>
                        </div>
                        <h1 className="blueHeader" align="center">{sleepGoal}</h1>
                        <hr className="hr-report"/>
                        <br/>
                        <h1 className="blueHeader">Weekly Overview</h1>
                        <div className="week" class="flex-report">
                            <div className="goalProg">
                                <CircularProgressbar value={Math.round(sleep/this.state.goal[0].sleepgoal*100)} text={`${Math.round(sleep/this.state.goal[0].sleepgoal*100)}%`} />
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
                        <button className='btn' style={{marginRight:'0px'}}  onClick={()=>this.changeWeek(1)}>
                            Prev 7 Days
                        </button>
                        <button className='btn' id = "extended" onClick={()=>this.changeWeek(0)}>
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
                    <div className="inner-report" id="page-wrap" align="center">
                        <div align='end'>
                            <button className='infoBut' style={{marginRight:'0px'}} onClick={() => this.displayInfo()}/>
                        </div>
                        <h1 className="blueHeader" align="center">{sleepGoal}</h1>
                        <hr className="hr-report"/>
                        <br/>
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
                        <button className='btn' id = "prevButton" style={{marginRight:'0px'}}>
                            Prev 7 Days
                        </button>
                        <button className='btn' id = "extended">
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
            if(this.state.sleep[i].end_sleep != null || this.state.sleep[i].end_sleep != undefined){
                //if empty, add to the array
                if(cardsToGenerate.length == 0){
                    var initial = new Date (this.state.sleep[i].start_sleep);
                    var terminate = new Date(this.state.sleep[i].end_sleep);
                    console.log("sleep entry info");
                    console.log(initial)
                    console.log(terminate)
                    cardsToGenerate.push([this.state.sleep[i].start_sleep, 0, (terminate.getTime() - initial.getTime())/(1000*3600), [], 0]);
                }
                //otherwise
                else{
                    var added = false; //record true when finished

                    //check if that date is already entered
                    for(var j = 0; j < cardsToGenerate.length; j++){
                        var dateInArr = new Date(cardsToGenerate[j][0]);
                        var dateToEnter = new Date(this.state.sleep[i].start_sleep);
                        var terminate = new Date(this.state.sleep[i].end_sleep);
                        if(dateInArr.getDate() == dateToEnter.getDate() && dateInArr.getFullYear() == dateToEnter.getFullYear() && dateInArr.getMonth() == dateToEnter.getMonth()){
                            added=true;
                            cardsToGenerate[j][2] = cardsToGenerate[j][2] + (terminate.getTime() - dateToEnter.getTime())/(1000*3600);
                        }
                        console.log("found a same date entry")
                    }
                    //otherwise just add a new entry
                    if(!added){
                        console.log("adding a new entry")
                        var initial = new Date (this.state.sleep[i].start_sleep);
                        var terminate = new Date(this.state.sleep[i].end_sleep);
                        cardsToGenerate.push([this.state.sleep[i].start_sleep, 0, (terminate.getTime() - initial.getTime())/(1000*3600), [], 0]);                }
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
                        console.log("cards to generate j[3]")
                        console.log(cardsToGenerate[j][3])
                        cardsToGenerate[j][3].push(this.state.stress[i].stress);
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


        var avgCaf = 0;
        var numCaf = 0;
        var avgSleep = 0;
        var numSleep = 0;
        var arrStress = [];
        var avgExer = 0;
        var numExer = 0;

        var arrToReturn = [];
        //[x][0] date [x][1] cups [x][2] sleep [x][3] stressEntries (array) [x][4] exercise

        var emptyWeek = 0;

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
                    var convTotal = 0;

                    for(var i = 0; i < sortArr.length; i++){
                        //medium
                        if(sortArr[i] == 50){
                            convTotal = convTotal +1;
                        }
                        //high
                        else if (sortArr[i] == 98){
                            convTotal = convTotal +2;
                        }
                    }

                    var avg = Math.floor(convTotal/sortArr.length)

                    //0
                    if(avg == 0){
                        formatStress = "Low";
                    }
                    //50
                    else if (avg == 1){
                        formatStress = "Medium";
                    }
                    //98
                    else if (avg == 2) {
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

                //filter data to only be past week's
                // if((date.getTime() >= firstday.getTime() && date.getTime() <= lastday.getTime())){
                    avgCaf += cardsToGenerate[i][1];
                    numCaf++;
                    avgSleep += cardsToGenerate[i][2];
                    numSleep++;
                    for(var k = 0; k < cardsToGenerate[i][3].length; k++) {
                        arrStress.push(cardsToGenerate[i][3][k]);
                    }
                    avgExer += cardsToGenerate[i][4];
                    numExer++;
                // }

                arrToReturn.push(<ReportComponent id = {""} date={formatDate} sleep={formatSleep} stress={formatStress} exer={formatExer} caf={formatCaf}/>)
            }
            else{
                arrToReturn.push(<ReportComponent id = {"blankCard"} date={"--"} sleep={"--"} stress={"--"} exer={"--"} caf={"--"}/>)
            }
        }

        if(this.state.avgCaf == null){
                this.setState({
                    avgCaf: avgCaf,
                    numCaf: numCaf,
                    avgSleep: avgSleep,
                    numSleep: numSleep,
                    arrStress: arrStress,
                    avgExer: avgExer,
                    numExer: numExer,
                });
        }

        return (arrToReturn) ;
    }

    changeWeek(element){
        console.log("weeksAgo");
        console.log(this.state.weeksAgo);
        if(document.getElementById("blankCard") == null) {
            if (element == 1) {
                this.setState({
                    weeksAgo: this.state.weeksAgo + 1,
                    sleep: null,
                    stress: null,
                    goal: null,
                    caf: null,
                    exer: null,
                    avgCaf: null,
                    numCaf: null,
                    avgSleep: null,
                    numSleep: null,
                    arrStress: null,
                    avgExer: null,
                    numExer: null,
                    weekEmpty: false,
                }, () => {
                    let currentComponent = this;
                    this.getWeek(currentComponent)
                });
                // }
            }
        }
        if(this.state.weeksAgo != 0 && element == 0){
            console.log("subtracting one..")
            this.setState({
                weeksAgo: this.state.weeksAgo - 1,
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
                weekEmpty : false,
            },  ()=>{
                let currentComponent = this;
                this.getWeek(currentComponent)
            });
        }}
}
export default report;