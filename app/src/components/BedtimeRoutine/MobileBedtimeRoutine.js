import React from 'react';
import "../../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../../styles/ItsBedtime.css";
import SideBar from "./SideMenu";
import {buildStyles, CircularProgressbar, CircularProgressbarWithChildren} from "react-circular-progressbar";
import {getUserID} from "../scripts/login";
import BedtimeProgressBar from "./BedtimeProgressBar";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class MobileBedtimeRoutine extends React.Component {
    constructor(props){
        super(props)
        this.state = { isEditable: false, stage: -1, stages: 0, routine : null};
    }

    componentDidMount(){
        let currentComponent = this;
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
        this.getRoutine(currentComponent)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.stage !== -1){
            if(this.state.stage < this.state.stages){
                if(this.state.routine[this.state.stage].minutes !== 0) {
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
                if(alerted === 0){
                    alert("Your timer has finished!");
                    alerted++;
                }
                return;
            }
        }, 1000);
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
                    return <BedtimeProgressBar id="items" title={this.state.routine[this.state.stage].task_name}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={true}/>;
                }
                //No Timer
                else{
                    return <BedtimeProgressBar id="items" title={this.state.routine[this.state.stage].task_name}
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
        return (
            <div class = "mobilePage">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div id="App">
                    <div>
                        <div className="inner">
                            <div className="itsBedtime">
                                {this.selectComponent()}
                                <hr className="bedtime-hr"/>
                                <div className="center" id="button">
                                    <button className='btn' id="cycle" onClick={() => this.startRoutine()}>Begin your
                                        routine
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default MobileBedtimeRoutine;
