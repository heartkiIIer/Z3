import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";
import BedtimeProgressBar from "./BedtimeProgressBar";
import Redirect from "react-router-dom/es/Redirect";
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
        var mobile;
        if(window.innerWidth >= 700){
            mobile = false;
        }
        else{
            mobile = true;
        }
        this.state = { isEditable: false, stage: -1, stages: 0, isMobile: mobile, routine : null, timer: null, timerRunning: false};
    }

     componentDidMount(){
        let currentComponent = this;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.stage !== -1){
            if(this.state.stage < this.state.stages){
                if(this.state.routine[this.state.stage].minutes !== 0 && !this.state.timerRunning) {
                    this.startTimer(this.state.routine[this.state.stage].minutes*60);
                }
            }
        }
    }

    getRoutine(currentComponent) {
        function updateStates(r) {
            //console.log(JSON.stringify(r))
            currentComponent.setState({routine : r.json()})
        }

        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getRoutine', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                currentComponent.setState({routine : r})
            })
        });
    }

    startRoutine(){
        //set size to amount of pieces
        if(this.state.stage >= this.state.stages){
            window.location.replace("https://sleepwebapp.wpi.edu/logSleep");
        }
        this.setState({stages: Object.keys(this.state.routine).length, stage : this.state.stage+1})
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
        if(!this.state.timerRunning){
            this.setState({
                timerRunning: true
            }, ()=>{
                var alerted = 0;
                var timer = duration, minutes, seconds;
                this.setState({timer: setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        if(document.getElementById('timer')!=null) {
                            document.getElementById('timer').innerText = minutes + ":" + seconds;
                        }
                        if (--timer < 0) {
                            timer = 0;
                            if(alerted === 0){
                                alert("Your timer has finished!");
                                alerted++;
                            }
                            return;
                        }
                    }, 1000),})
            })
        }
        else{
            this.setState({
                timer: clearInterval(this.state.timer)
        }, ()=>{
                var alerted = 0;
                var timer = duration, minutes, seconds;
                this.setState({timer: setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        if(document.getElementById('timer')!=null) {
                            document.getElementById('timer').innerText = minutes + ":" + seconds;
                        }
                        if (--timer < 0) {
                            timer = 0;
                            if(alerted === 0){
                                alert("Your timer has finished!");
                                alerted++;
                            }
                            return;
                        }
                    }, 1000),})
            })
        }
    }

    selectComponent(){
        //if not initialized, show blank
        if(this.state.stage === -1){
            console.log("init");
            return <BedtimeProgressBar id = "items" title = "It's Bedtime" stage = {100} stages = {100} minutes = {0} timer = {false}/>;
        }

        else {
            //Still stages remaining
            if(this.state.stage < this.state.stages){
                document.getElementById("cycle").innerText = "Next Item";
                //Timer
                if(this.state.routine[this.state.stage].minutes !== 0) {
                    return <BedtimeProgressBar id="items" title={this.state.routine[this.state.stage].title}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={true}/>;
                }
                //No Timer
                else{
                    return <BedtimeProgressBar id="items" title={this.state.routine[this.state.stage].title}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={false}/>;
                }
            }
            //Nothing remains
            else{
                document.getElementById("cycle").innerText = "Log Sleep";
                return <BedtimeProgressBar id="items" title={"You're done!"}
                                           stage={100} stages={100}
                                           minutes={0} timer={false}/>;
            }
        }
    }

    render(){
        let idPromise = getUserID();
        idPromise.then(()=>this.getRoutine(currentComponent)
        ).catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
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
                                    {this.selectComponent()}
                                    <hr class = "bedtime-hr"/>
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
