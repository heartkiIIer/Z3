import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";
import {getUserID} from "../scripts/login";

/**
 * @author Eliazbeth Del Monaco, Sarah Armstrong
 * This component renders the It's Bedtime routine page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class ItsBedtimeRoutine extends React.Component {
    constructor(props){
        super(props)
        this.getRoutine();
        var mobile;
        if(window.innerWidth >= 700){
            mobile = false;
        }
        else{
            mobile = true;
        }
        this.state = { isEditable: false, stage: 0, stages: 0, isMobile: mobile, routine : null};
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    mobile: true
                });
            }
            else {
                this.setState({
                    mobile: false
                })
            }
        })
    }

     startTimer(duration) {
        var alerted = 0;
        var timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                if(document.getElementById('timer')!=null) {
                    document.getElementById('timer').innerText = minutes + ":" + seconds;
                }
                if (--timer < 0) {
                    timer = 0;
                    if(alerted == 0){
                        alert("Your timer has finished!");
                        alerted++;
                    }
                    return;
                }
            }, 1000);

    }

    startRoutine(){
        //if not initialized, show blank
        if(this.state.routine == null){

        }

        //cycle through all bedtime routine
        else{
            //set size to amount of pieces
            this.setState({stages: this.state.routine.size()})
        }
        if(this.state.stage == 0) {
            document.getElementById("itsbedtime").style.display = "none";
            document.getElementById("meditate").style.display = "";
            document.getElementById("cycle").innerText = 'Next item';
            var fiveMinutes = 60 * 1;
            var interval = this.startTimer(fiveMinutes);
            this.setState({stage : 1});
        }
        else if(this.state.stage == 1){
            clearInterval(interval);
            document.getElementById("meditate").style.display = "none";
            document.getElementById("brushyourteeth").style.display = "";
            this.setState({stage : 2});
        }
        else if(this.state.stage == 2){
            document.getElementById("brushyourteeth").style.display = "none";
            document.getElementById("washyourface").style.display = "";
            this.setState({stage : 3});
        }
        else if(this.state.stage == 3){
            document.getElementById("washyourface").style.display = "none";
            document.getElementById("turnoffyourcomputer").style.display = "";
            this.setState({stage : 4});
        }
        else if(this.state.stage == 4){
            document.getElementById("turnoffyourcomputer").style.display = "none";
            document.getElementById("youredone").style.display = "";
            document.getElementById("button").innerHTML = '<a href = "/logSleep"><button class="btn" id = "cycle">Time for bed</button></a>';

        }
    }

    getRoutine() {
        let idPromise = getUserID();
        idPromise.then(uid=>{
           const data = JSON.stringify({uid: uid});
            fetch('http://sleepwebapp.wpi.edu:5000/getRoutine', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(function(r){
                this.setState({routine : r})
                console.log(JSON.stringify(r))
            })
        });
    }

    render(){
        this.resize();
        if(this.state.isMobile){
            return (
                <MobileBedtimeRoutine/>
            );
        }
        else{
            return (
                <div>
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div class = "content" id="App">
                        <div class ="middle">
                            <div className="inner" id="page-wrap">
                                <div class = "itsBedtime">
                                    <div id = "items">
                                        <div id = "itsbedtime" style={{  width: "300px" }}>
                                            <CircularProgressbar value={100} text={`It's Bedtime`} styles={buildStyles({
                                                textSize: 10
                                            })}></CircularProgressbar>
                                        </div>
                                        <div id = "meditate" style={{  display: "none", width: "390px" }}>
                                            <CircularProgressbarWithChildren value={0} styles={buildStyles({
                                                pathColor: "mediumpurple",
                                                textSize: 10
                                            })}>
                                                <div style={{ marginTop: -5 }}>
                                                        <h1>Meditate</h1>
                                                </div>
                                                <div style={{ marginTop: -5 }}>
                                                        <h1><span id = "timer">01:00</span> minutes</h1>
                                                </div>
                                            </CircularProgressbarWithChildren>
                                        </div>
                                        <div id = "brushyourteeth" style={{  display: "none", width: "390px" }}>
                                            <CircularProgressbar value={25} text={`Brush your teeth`} styles={buildStyles({
                                                pathColor: "mediumpurple",
                                                textSize: 10
                                            })}></CircularProgressbar>
                                        </div>
                                        <div id = "washyourface" style={{ display: "none", width: "390px" }}>
                                            <CircularProgressbar value={50} text={`Wash your face`} styles={buildStyles({
                                                pathColor: "mediumpurple",
                                                textSize: 10
                                            })}></CircularProgressbar>
                                        </div>
                                        <div id = "turnoffyourcomputer" style={{ display: "none", width: "390px" }}>
                                            <CircularProgressbar value={75} text={`Turn off laptop`} styles={buildStyles({
                                                pathColor: "mediumpurple",
                                                textSize: 10
                                            })}></CircularProgressbar>
                                        </div>
                                        <div id = "youredone" style={{ display: "none", width: "390px" }}>
                                            <CircularProgressbar value={100} text={`You're done!`} styles={buildStyles({
                                                pathColor: "mediumpurple",
                                                textSize: 10
                                            })}></CircularProgressbar>
                                        </div>
                                    </div>
                                    <hr class = "bedtime-hr"/>
                                    {/*<div id = "routine-progress">*/}
                                    {/*</div>*/}
                                    <div className = "center" id = "button">
                                        <button className='btn' id = "cycle" onClick={() => this.startRoutine()}>Begin your routine</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
}
export default ItsBedtimeRoutine;
