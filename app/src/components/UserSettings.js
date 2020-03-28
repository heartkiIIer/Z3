import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SideBar from "./sideMenu";
import {deleteAcc} from "../scripts/SettingsScript"
import swal from 'sweetalert'
import TaskSetting from "./TaskSetting"
import {getUserID} from "../scripts/login";
import {OAUTHSettings} from "../scripts/FitbitScript";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {
    constructor(props){
        super(props);
        this.handler = this.updateRoutine.bind(this);
        this.state = {
            isEditable: false,
            image: "",
            routine: null,
            sleepGoal: null,
            fibit: false
        };
    }

    componentDidMount(){
        let idPromise = getUserID();
        //if no user signed in redirect them back to landing
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        });
        let currentComponent = this;
        this.getRoutine(currentComponent);
        this.getUseFitbit(currentComponent);
        this.getSleepGoal(currentComponent);
    }

    //retrieves the user's bedtime routine
    getRoutine(currentComponent) {
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
            });
        });

    }
    //used in child component to update routine list when deleting/editing
    updateRoutine(){
        this.getRoutine(this);
    }
    //returns a list of TaskSetting components which are each task in the bedtime routine
    listRoutine(){
        let list = [];
        if(this.state.routine !== null){
            for(let i = 0; i < this.state.routine.length; i++){
                var task = this.state.routine[i];
                list.push(<TaskSetting id={task.task_id} taskTitle={task.task_name} taskMin={task.minutes} action={this.handler}/>);
            }
        }
        return list;
    }
    //adds a routine to the user's bedtime routine
    addRoutine() {
        // prompt to enter a new routine
        swal({ //prompt user to enter the task name
            title: "Add a Routine: Enter Task",
            text: "Please enter the task you would like to add: ",
            content: {
                element: "input",
                attributes: {
                    placeholder: "Brush Teeth",
                    type: "text"
                }
            },
            buttons: true,
        }).then((task) => {
            if(task === ""){ //user clicked okay with nothing as input
                swal({
                    text: "No task was inputed",
                    icon: "error"
                });
            }
            else if(task.length > 16){
                swal({
                    text: "Please input a task with 16 or less characters",
                    icon: "error"
                });
            }
            else if(task !== null) { // user clicked okay with something in the input field
                swal({ //the prompts user to enter the duration of the task
                    title: "Add a Routine: Enter Duration",
                    text: "Please enter the number of minutes of your new task:",
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "0 if the task is not timed",
                            type: "number"
                        }
                    },
                    buttons: true,
                }).then((minutes) => {
                    if (minutes !== null){
                        if (minutes === "") { //user didn't enter input
                            minutes = 0 //set minutes to zero if user doesn't input duration
                        }
                        let idPromise = getUserID();
                        idPromise.then(uid => {
                            const data = JSON.stringify({
                                minutes: minutes,
                                task: task,
                                uid: uid
                            });
                            fetch('https://sleepwebapp.wpi.edu:5000/addRoutine', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: data
                            }).then(r => {
                                swal({
                                    title: "Success",
                                    icon: "success",
                                    text: "New routine have been added."
                                });
                                this.getRoutine(this) //get routine again now a new routine has been added
                            })
                        });
                    }
                });
            }
        });
    }
    //gets the user's sleep goal
    getSleepGoal(currentComponent){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getSleepGoal', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length !== 0){
                    currentComponent.setState({sleepGoal : r[0].sleepgoal})
                }
            });
        });
    }
    //adds a sleep goal
    addSleepGoal(){
        swal({ //prompt user to set a sleep goal
            title: "Add Sleep Goal",
            text: "Please enter the number of hours you would like to sleep each night: ",
            content: {
                element: "input",
                attributes: {
                    placeholder: "8",
                    type: "number",
                    max: 24,
                    min: 0,
                    step: 0.5,
                }
            },
            buttons: true,
        }).then((goal) => {
            if(goal){
                let idPromise = getUserID();
                idPromise.then(uid=>{
                    const data = JSON.stringify({
                        goal: goal,
                        uid: uid
                    });
                    fetch('https://sleepwebapp.wpi.edu:5000/addSleepGoal', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then(r => {
                        swal({
                            title: "Success",
                            icon: "success",
                            text: "Successfully set sleep goal."
                        });
                        this.getSleepGoal(this)
                    })
                });
            }
        });
    }
    //get if user is willing to use fitbit to log sleep
    getUseFitbit(currentComponent){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getUseFitbit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length !== 0){
                    currentComponent.setState({fitbit : r[0].fitbit})
                }
            });
        });
    }
    //set user fitbit permission to false
    setUserFibitFalse(){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({
                fitbit: false,
                uid: uid
            });
            fetch('https://sleepwebapp.wpi.edu:5000/addUseFitbit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(r => {
                this.getUseFitbit(this)
            })
        });
    }
    //set user fitbit permission to true
    setUserFibitTrue(){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({
                fitbit: true,
                uid: uid
            });
            fetch('https://sleepwebapp.wpi.edu:5000/addUseFitbit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(r => {
                this.toreport();
                this.getUseFitbit(this)
            })
        });
    }
    //set message under fitbit usage depending on user had given permission or not
    useFibit(){
        let fitbitele = [];
        if(this.state.fitbit){
            fitbitele.push(<h3 className='blueHeader'>Do you wish to stop auto logging your sleep and exercise through Fitbit? </h3>);
            fitbitele.push(<p style={{color: "#ff6666", marginTop: "10px", size: "10pt"}}>* You will be asked again to authorize Fitbit on the <b>Report</b> page on other (new) devices.</p>);
            fitbitele.push(<button className='btn' onClick={this.setUserFibitFalse.bind(this)}>Stop Fitbit</button>);
        }
        else{
            fitbitele.push(<h3 className='blueHeader'>Do you own a Fitbit and would like to auto fill your sleep and exercise log through Fitbit? </h3>);
            fitbitele.push(<h4 className='blueHeader'>How it works: We will automatically retrieve the past week's data from your fitbit whenever you access your personal reports page. For exercise minutes, we will take your lightly, fairly, and very active mintutes and store them as low, medium, and high intensity minutes respectively</h4>);
            fitbitele.push(<p style={{color: "#1B1E23", marginTop: "10px", size: "10pt"}}>* Manually logging sleep and exercise will still be available but sleep log will take precedence over Fibtit data whereas exercise log will add on to what Fitbit will record.</p>);
            fitbitele.push(<p style={{color: "#ff6666", marginTop: "10px", size: "10pt"}}>* Once you click the button, you will be redirected to Fitbit for authorization. However, you will have to authorize Fitbit again on the <b>Report</b> page on other (new) devices.</p>);
            fitbitele.push(<button className='btn' onClick={this.setUserFibitTrue.bind(this)}>Use Fitbit</button>);
        }
        return fitbitele;
    }
    //redirect user to fitbit authentication login
    toreport(){
        window.location.assign(OAUTHSettings);
    }

    render(){
        let sleepGoalEle;
        if (!this.state.sleepGoal) sleepGoalEle = <BlankEle/>;
        else sleepGoalEle = <h1>{this.state.sleepGoal} hrs</h1>;
        return (
            <div class = "content settings" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner-report" id="page-wrap">
                    <h1 class = "blueHeader"> Set Sleep Goal</h1>
                    <hr class = "hr-settings"/>
                    <br/>
                    <h3 className="blueHeader">Current Sleep Goal: </h3>
                    {sleepGoalEle}
                    <button className='btn' id = "extended" onClick={this.addSleepGoal.bind(this)}>
                        Edit Sleep Goal
                    </button>
                    <br/><br/>
                    <h1 className="blueHeader"> Fitbit Account Access</h1>
                    <hr className="hr-settings"/>
                    <br/>
                    {this.useFibit()}
                    <br/><br/>
                    <h1 className="blueHeader"> Modify your Bedtime Routine</h1>
                    <hr className="hr-settings"/>
                    <br/>
                    <div className="list-group" style={{maxWidth: "500px"}}>
                        {this.listRoutine()}
                        <button className={'btn'} onClick={this.addRoutine.bind(this)}> Add Task </button>
                    </div>
                    <br/>
                    <h1 className="blueHeader"> Delete your account</h1>
                    <hr className="hr-settings"/>
                    <button className='btn' id = "extended" onClick={deleteAcc}>
                        Delete
                    </button>
                </div>
            </div>
        );
    };
}

function BlankEle() {
    return (<h1>-- hrs</h1>)
}

export default UserSettings;
