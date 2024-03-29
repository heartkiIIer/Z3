import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import "../styles/personalityIntro.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";
import BedtimeProgressBar from "./BedtimeProgressBar";
import Redirect from "react-router-dom/es/Redirect";
import {getUserID} from "../scripts/login";
import {Link} from "react-router-dom";
import swal from "sweetalert"

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
        // if(window.innerWidth >= 700){
        //     this.state = {
        //         width: '350px'
        //     };
        // }
        // else{
        //     this.state = {
        //         width: '170px',
        //         paddingTop: '300px'
        //     };
        // }
        this.state = { isEditable: false, stage: -1, stages: 0, isMobile: mobile, routine : null, timer: null, timerRunning: false};
    }

     componentDidMount(){
        let currentComponent = this;
        let idPromise = getUserID();
        idPromise.then(()=>this.getRoutine(currentComponent)
        ).catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
         window.addEventListener('resize', this.updateDimensions);
    }

    getRoutine(currentComponent) {
        // function updateStates(r) {
        //     //console.log(JSON.stringify(r))
        //     currentComponent.setState({routine : r.json()})
        // }

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
                currentComponent.setState({routine : r});
                if(r.length === 0) {
                    swal({
                        title: "Empty Routine List",
                        text: "You currently do not have a bedtime routine. You can go to settings page to set up a routine.",
                        icon: "warning"
                    });
                }
            })
        });
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };


    startRoutine(){
        //set size to amount of pieces
        if(this.state.stage >= this.state.stages){
            window.location.replace("https://sleepwebapp.wpi.edu/logSleep");
        }
        if(this.state.routine != null){
            this.setState({stages: Object.keys(this.state.routine).length, stage : this.state.stage+1})
        }
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    width: '170px',
                    paddingTop: '300px'
                });
            }
            else {
                this.setState({
                    width: '350px'
                })
            }
        })
    }

    selectComponent(){
        let h1Style;
        if(window.innerWidth < 700) {
            h1Style = {
                fontSize: '2rem'
            }
        } else {
            h1Style = {
                fontSize: '2.5rem'
            }
        }
        //if not initialized, show blank
        if(this.state.stage === -1 || this.state.routine == null){
            console.log("init");
            return <BedtimeProgressBar key = {this.state.stage} id = "items" title = "It's Bedtime" stage = {100} stages = {100} minutes = {0} timer = {false}/>;
        }

        else {
            //Still stages remaining
            if(this.state.stage < this.state.stages){
                document.getElementById("cycle").innerText = "Next Item";
                //Timer
                if(this.state.routine[this.state.stage].minutes !== 0) {
                    return <div><h1 style={h1Style} className="alignTextRight">{this.state.stage.toString() + "/" + this.state.stages.toString()+ " tasks completed"}</h1> <br/><BedtimeProgressBar key = {this.state.stage} id="items" title={this.state.routine[this.state.stage].task_name}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={true}/></div>;
                }
                //No Timer
                return <div><h1 style={h1Style} className="alignTextRight">{this.state.stage.toString() + "/" + this.state.stages.toString()+ " tasks completed"}</h1> <br/><BedtimeProgressBar key = {this.state.stage} id="items" title={this.state.routine[this.state.stage].task_name}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={false}/></div>;

            }
            //Nothing remains
            else{
                document.getElementById("cycle").innerText = "Log Sleep";
                return <div><h1 style={h1Style} className="alignTextRight">{this.state.stages.toString() + "/" + this.state.stages.toString() + " tasks completed"}</h1> <br/><BedtimeProgressBar key = {this.state.stage} id="items" title={"You're done!"}
                                           stage={100} stages={100}
                                           minutes={0} timer={false}/></div>;
            }
        }
    }

    render(){
        this.resize();
            return (
                <div className = "content" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                        <div className="inner" id="page-wrap" align='center'>
                            {this.selectComponent()}
                            <br/>
                            <hr className='hr-settings'/>
                            <br/>
                            <button className='btn' id = "cycle" onClick={() => this.startRoutine()}>Begin your routine</button>
                        </div>
                    </div>
                </div>
            );
    };
}
export default ItsBedtimeRoutine;
