import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";
import BedtimeProgressBar from "./BedtimeProgressBar";

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
            while(this.state.stage != this.state.stages-1){

            }
        }
    }

    getRoutine() {
        fetch('http://sleepwebapp.wpi.edu:5000/getRoutine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(r){
            this.setState({routine : r})
            console.log(JSON.stringify(r))
        })
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
                                    <BedtimeProgressBar id = "items" name = "It's Bedtime" stage = {100} stages = {100} minutes = {0} timer = {false}/>
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
