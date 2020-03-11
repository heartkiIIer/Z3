import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";
import BedtimeProgressBar from "./BedtimeProgressBar";
import Redirect from "react-router-dom/es/Redirect";
import {getUserID} from "../scripts/login";
import {Link} from "react-router-dom";

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
        if(window.innerWidth >= 400){
            this.state = {
                fontSize: '13px',
                padding: '13px 22px',
                width: '400px'
            };
        }
        else{
            this.state = {
                fontSize: '9px',
                padding: '12px 10px',
                width: '210px'
            };
        }
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        /*if(this.state.stage !== -1){
            if(this.state.stage < this.state.stages){
                if(this.state.routine[this.state.stage].minutes !== 0) {
                    this.startTimer(this.state.routine[this.state.stage].minutes*60);
                }
            }
        }*/
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
            if(window.innerWidth < 400){
                this.setState({
                    fontSize: '9px',
                    padding: '12px 10px',
                    width: '210px'
                });
            }
            else {
                this.setState({
                    fontSize: '13px',
                    padding: '13px 22px',
                    width: '400px'
                })
            }
        })
    }

    selectComponent(){
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
                    return <BedtimeProgressBar key = {this.state.stage} id="items" title={this.state.routine[this.state.stage].task_name}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={true}/>;
                }
                //No Timer
                else{
                    return <BedtimeProgressBar key = {this.state.stage} id="items" title={this.state.routine[this.state.stage].task_name}
                                               stage={this.state.stage} stages={this.state.stages}
                                               minutes={this.state.routine[this.state.stage].minutes} timer={false}/>;
                }
            }
            //Nothing remains
            else{
                document.getElementById("cycle").innerText = "Log Sleep";
                return <BedtimeProgressBar key = {this.state.stage} id="items" title={"You're done!"}
                                           stage={100} stages={100}
                                           minutes={0} timer={false}/>;
            }
        }
    }

    render(){
        this.resize();

        const bdStyle = {
            bdContainer:{
                width: this.state.width,
            }
        };
        const { bdContainer } = bdStyle;

        const btnStyle = {
            btnContainer:{
                fontSize: this.state.fontSize,
                padding: this.state.padding
            }
        };
        const { btnContainer } = btnStyle;
            return (
                <div className = "content personality" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                        <div style={bdContainer} className="inner" id="page-wrap">
                            {this.selectComponent()}
                            <hr className="bedtime-hr"/>
                            <div className = "center" id = "button">
                                <button style={btnContainer} className='btn' id = "cycle" onClick={() => this.startRoutine()}>Begin your routine</button>
                            </div>
                        </div>
                    </div>

                </div>


                // <div>
                //     <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                //     <div class = "content" id="App">
                //         <div class ="middle">
                //             <div className="inner" id="page-wrap">
                //                 <div style={bdContainer} class = "itsBedtime">
                //                     {this.selectComponent()}
                //                     <hr className="bedtime-hr"/>
                //                     <div className = "center" id = "button">
                //                         <button style={btnContainer} className='btn' id = "cycle" onClick={() => this.startRoutine()}>Begin your routine</button>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
            );
    };
}
export default ItsBedtimeRoutine;
