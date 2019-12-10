import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import DeleteButton from "../resources/icons/minus-circle-solid.svg";
import AddButton from "../resources/icons/plus-circle-solid.svg";
import EmptyCheckbox from "../resources/icons/square-regular.svg";
import CheckedBox from "../resources/icons/check-square-solid.svg";
import SideBar from "./sideMenu";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class ItsBedtimeRoutine extends React.Component {
    constructor(props){
        super(props)
        this.state = { isEditable: false, stage: 0 };
    }

    // componentDidMount() {
    //     setTimeout(function () {
    //         document.getElementById("outer-circle").style.opacity = 100;
    //     }, 250);
    // }

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

    startRoutine(startTimer){
        if(this.state.stage == 0) {
                //document.getElementById("routine-progress").innerHTML = '<div class = "progress"><div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="80"></div></div>';
                document.getElementById("itsbedtime").style.display = "none";
                document.getElementById("meditate").style.display = "";
                    //    '<div style="{{ marginTop: -5 }}">' +
                    //        '<h1>Meditate</h1>' +
                    //    '</div>' +
                    //    '<div style="{{ marginTop: -5 }}">' +
                    //        '<h1><span id = "timer">01:00</span> minutes</h1>' +
                    //    '</div>' +
                    // '</CircularProgressbarWithChildren>';
                //document.getElementById("top").innerHTML = '<h1>Meditate</h1>';
               // document.getElementById("bottom").innerHTML = '<h1><span id = "timer">01:00</span> minutes</h1>';
                document.getElementById("cycle").innerText = 'Next item';
                var fiveMinutes = 60 * 1;
                var interval = this.startTimer(fiveMinutes);
                this.setState({stage : 1});
        }
        else if(this.state.stage == 1){
            clearInterval(interval);
            document.getElementById("meditate").style.display = "none";
            document.getElementById("brushyourteeth").style.display = "";
            //document.getElementById("routine-progress").innerHTML = '<div class = "progress">  <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>\n</div>';
            //document.getElementById("top").innerHTML = '<h1>Brush your teeth</h1>';
            // document.getElementById("bottom").innerHTML = '';

            this.setState({stage : 2});
        }
        else if(this.state.stage == 2){
            document.getElementById("brushyourteeth").style.display = "none";
            document.getElementById("washyourface").style.display = "";
            // document.getElementById("routine-progress").innerHTML = '<div class = "progress">  <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>\n</div>';
            // document.getElementById("top").innerHTML = '<h1>Wash your face</h1>';
            this.setState({stage : 3});
        }
        else if(this.state.stage == 3){
            document.getElementById("washyourface").style.display = "none";
            document.getElementById("turnoffyourcomputer").style.display = "";
            // document.getElementById("routine-progress").innerHTML = '<div class = "progress">  <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="60 aria-valuemin="0" aria-valuemax="100"></div>\n</div>';
            // document.getElementById("top").innerHTML = '<h1>Turn off your computer</h1>';
            this.setState({stage : 4});
        }
        else if(this.state.stage == 4){
            document.getElementById("turnoffyourcomputer").style.display = "none";
            document.getElementById("youredone").style.display = "";
            // document.getElementById("routine-progress").innerHTML = '<div class = "progress">  <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>\n</div>';
            // document.getElementById("top").innerHTML = "<h1>You're done!</h1>";
            document.getElementById("button").innerHTML = '<a href = "/logSleep"><button class="btn" id = "cycle">Time for bed</button></a>';

        }

    }

    render(){
        return (
            <div>
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div class = "content" id="App">
                    <div class ="middle">
                        <div className="inner" id="page-wrap">
                            <div class = "itsBedtime">
                                <div id = "items">

                                   {/*<div class = "outer-circle" id = "outer-circle">*/}
                                   {/*    <div className="inner-circle flex-column-nowrap">*/}
                                   {/*        <div id = "top">It's Bedtime</div>*/}
                                   {/*        <div id = "bottom"/>*/}
                                   {/*    </div>*/}
                                   {/*</div>*/}
                                    <div id = "itsbedtime" style={{  width: "390px" }}>
                                        <CircularProgressbar value={100} text={`It's bedtime`} styles={buildStyles({
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
    };
}
export default ItsBedtimeRoutine;
