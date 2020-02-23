import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SideBar from "./sideMenu";
// import CalendarButtons from "./CalendarButtons";
import {updatePwd, updateEmail, deleteAcc, updateImage} from "../scripts/SettingsScript"
import z3_firebase from "../scripts/firebase"
import swal from 'sweetalert'
import TaskSetting from "./TaskSetting"

/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = { isEditable: false, image: "", routine: null, sleepGoal: null};
    }

    // retrieves user's profile image to display in settings
    getUserImage(currentComponent){
        fetch('http://sleepwebapp.wpi.edu:5000/user')
            .then(response => response.json())
            .then(data => currentComponent.setState({
                image: data.image
            }));
    }

    componentDidMount(){
        let currentComponent = this;
        this.getProvider(currentComponent);
        this.getRoutine(currentComponent);
        this.getUserImage(currentComponent);
        this.getSleepGoal(currentComponent);
    }

    // determines which provider the user is using to login: Google, Facebook, or with a password
    getProvider(currentComponent){
        z3_firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.providerData.forEach(function (profile) {
                    if(profile.providerId !== "password"){
                        currentComponent.hide();
                    }
                });
            }
        });
    }

    // hides edit password, email, profile picture options when
    // the user signs in with Google and Facebook
    hide(){
        var elements = document.getElementsByClassName("Hidden");

        for (var i = 0; i < elements.length; i++){
            elements[i].style.display = "none";
        }
    }

    // Bedtime Routine: show, add, delete routine
    getRoutine(currentComponent) {
        fetch('http://sleepwebapp.wpi.edu:5000/getRoutine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( r => {
            return r.json();
        }).then(r => {
            currentComponent.setState({routine : r})
        });
    }
    listRoutine(){
        let list = [];
        if(this.state.routine !== null){
            console.log(this.state.routine)
            for(let i = 0; i < this.state.routine.length; i++){
                var task = this.state.routine[i];
                list.push(<TaskSetting id={task.task_id} taskTitle={task.title} taskMin={task.minutes}/>);
            }
        }
        return list;
    }
    addRoutine() {
        // prompt to enter a new routine
        swal({
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
            swal({
                title: "Add a Routine: Enter Duration",
                text: "Please enter the number of minutes of your new task:",
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "0 if the task is not timed",
                        type: "number",
                    }
                },
                buttons: true,
            }).then((minutes) => {
                if(task !== null && minutes !== null){
                    const data = JSON.stringify({
                        minutes: minutes,
                        task: task
                    });
                    fetch('http://sleepwebapp.wpi.edu:5000/addRoutine', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then(r => {
                        console.log("Added Routine: ", r.status);
                        this.getRoutine(this)
                    })
                }
            });
        });
    }

    // sleep goal
    getSleepGoal(currentComponent){
        fetch('http://sleepwebapp.wpi.edu:5000/getSleepGoal', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( r => {
            return r.json();
        }).then(r => {
            console.log(r.sleepGoal);
            currentComponent.setState({sleepGoal : r.sleepGoal})
        });
    }
    addSleepGoal(){
        swal({
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
            const data = JSON.stringify({
                goal: goal,
            });
            fetch('http://sleepwebapp.wpi.edu:5000/addSleepGoal', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(r => {
                console.log("Added Goal: ", r.status);
                this.getSleepGoal(this)
            })
        });
    }

    render(){
        return (
            <div class = "content settings" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 class = "blueHeader"> Modify your settings</h1>
                    <hr class = "hr-settings"/>
                    <h3 className="blueHeader"> Set Sleep Goal </h3>
                    <p className="blueHeader">Current Sleep Goal: {this.state.sleepGoal}</p>
                    <button className='btn' id = "extended" onClick={this.addSleepGoal.bind(this)}>
                        Edit Sleep Goal
                    </button>

                    <h3 class = "blueHeader Hidden"> Change password </h3>
                    <div class = "flex-row-nowrap Hidden">
                        <p class = "blueHeader width80"> Enter new password: </p>
                        <input id="chgPwd-NewPwd" className='editMe' type="password" placeholder='new password'/>
                    </div>
                    <div className="flex-row-nowrap Hidden">
                        <p className="blueHeader width80"> Re-enter new password: </p>
                        <input id="chgPwd-NewPwd2" className='editMe' type="password" placeholder='new password'/>
                    </div>
                    <p className="Hidden" style={{color: "#ff6666", marginTop: "10px", size: "10pt"}}>
                        Password needs to be at least 6 characters long</p>

                    <button className='btn Hidden' id = "extended" onClick={updatePwd}>
                        Confirm
                    </button><br className="Hidden"/><br className="Hidden"/>

                    <h3 className="blueHeader Hidden"> Change email </h3>
                    <div className="flex-row-nowrap Hidden">
                        <p className="blueHeader width80"> Enter new email: </p>
                        <input id="chgEmail-NewEmail" className='editMe' placeholder='example@gmail.com'/>
                    </div>
                    <div className="flex-row-nowrap Hidden">
                        <p className="blueHeader width80"> Re-enter new email: </p>
                        <input id="chgEmail-NewEmail2" className='editMe' placeholder='example@gmail.com'/>
                    </div>

                    <button className='btn Hidden' id="extended" onClick={updateEmail}>
                        Confirm
                    </button><br className="Hidden"/><br className="Hidden"/>

                    <h3 className="blueHeader Hidden"> Change Profile Image </h3>
                    <div className="flex-row-nowrap Hidden">
                        <img id="chgImg" style={{marginRight: "20px"}} className="profile_pic" src={this.state.image} alt=""/>
                        <input id="chgImageURL" className='editMe' type="text" placeholder='https://images.com/example.png'/>
                    </div>

                    <button className='btn Hidden' id="extended" onClick={updateImage}>
                        Confirm
                    </button><br className="Hidden"/><br className="Hidden"/>

                    <h1 className="blueHeader"> Account Access</h1>
                    <hr className="hr-settings"/>
                    <div class = "flex-row-nowrap">
                        <button className='btn' id = "extended">
                            Remove FitBit Access
                        </button>
                    </div>

                    <h1 className="blueHeader"> Modify your Bedtime Routine</h1>
                    <hr className="hr-settings"/>

                    <div className="list-group" class ="width300">
                        {this.listRoutine()}
                        <button className={'btn'} onClick={this.addRoutine.bind(this)}> Add Task </button>
                    </div>

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
export default UserSettings;
