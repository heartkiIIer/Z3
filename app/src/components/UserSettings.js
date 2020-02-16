import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SaveButton from "../resources/icons/save-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";
import SideBar from "./sideMenu";
// import CalendarButtons from "./CalendarButtons";
import EmptyCheckbox from "../resources/icons/square-regular.svg";
import CheckedBox from "../resources/icons/check-square-solid.svg";
import AddButton from "../resources/icons/plus-circle-solid.svg";
import {updatePwd, updateEmail, deleteAcc, updateImage} from "../scripts/SettingsScript"
import z3_firebase from "../scripts/firebase"
import swal from 'sweetalert'

/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = { isEditable: false, image: "", routine: null};
    }

    toggleCheckbox(element){
        if(document.getElementById(element) != null){
            if(document.getElementById(element).src.includes('check-square-solid')){
                document.getElementById(element).src = EmptyCheckbox;
            }
            else {
                document.getElementById(element).src = CheckedBox;
            }
        }
    }

    deleteItem(id){
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);

    }

    changeState(){
        console.log(this.state.isEditable);

        if(this.state.isEditable){
            document.getElementById("editAndSave").src = SaveButton;

            for(var i = 0; i < document.getElementsByClassName("align-check-and-label").length; i++){
                document.getElementsByTagName("p").item(i).innerHTML = "<input class = 'editMe' placeholder ='placeholder'/>";
                document.getElementsByClassName("delete").item(i).src = DeleteButton;
                document.getElementsByClassName("add").item(0).src = AddButton;

            }

        }
        else{
            document.getElementById("editAndSave").src = EditButton;
            for(var i = 0; i < document.getElementsByClassName("align-check-and-label").length; i++){
                document.getElementsByTagName("p").item(i).innerHTML = "hi";
                document.getElementsByClassName("delete").item(i).src = "";
                document.getElementsByClassName("add").item(0).src = "";
            }
        }
    }

    toggleEditableState(){
        if(this.state.isEditable === false){
            this.setState( {isEditable : true}, () => {this.changeState()})
        }
        else{
            this.setState( {isEditable : false}, () => {this.changeState()})
        }
    }

    addItem(id){
        document.getElementById("here").innerHTML =  '<button id = "4" type="button" class="list-group-item list-group-item-action"> <div class="align-check-and-label"> <div class="checkbox checkbox-circle checkbox-primary "> <input type="checkbox" id="checkbox4"/> <label htmlFor="checkbox4"/> </div> <p> Meditate </p> <img class = "delete"/></div> </button>'
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
    // the user signs in with Google or Facebook
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
        var routineList = "";
        for(let i = 0; i < this.state.routine.length; i++){
            var task = this.state.routine[i];
            if(task.minutes === 0){
                routineList += '<p>' + this.state.routine[i].title + '</p>';
            }
            else{
                routineList += '<p>' + this.state.routine[i].minutes + ' minutes of ' + this.state.routine[i].title+ '</p>';
            }
        }
        document.getElementById("here").innerHTML = routineList;
    }
    addRoutine() {
        // prompt to enter a new routine
        swal({
            title: "Add a Routine",
            text: "Please enter the number of minutes of your new task: ",
            content: {
                element: "input",
                attributes: {
                    placeholder: "20",
                    type: "text"
                }
            },
            buttons: true,
        }).then((minutes) => {
            swal({
                title: "Add a Routine",
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
                console.log("Task: ", task);
                console.log("Minutes", minutes);

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
                    })
                }
            });
        });
    }
    deleteRoutine(entryId) {
        const data = JSON.stringify({entryId: entryId});
        fetch('http://sleepwebapp.wpi.edu:5000/deleteRoutine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            console.log("Deleted Routine: ", r.status);
        });
    }

    render(){
        if(this.state.routine !== null){
            this.listRoutine()
        }
        return (
            <div class = "content settings" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 class = "blueHeader Hidden"> Modify your settings</h1>
                    <hr class = "hr-settings Hidden"/>
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

                    <button className={'btn'} onClick={this.addRoutine}>+</button>

                    <div className="list-group" class ="width300">
                        <button id="1" type="button" className="list-group-item list-group-item-action"
                                onClick={() => this.toggleCheckbox("checkbox1")}>
                            <div className="align-check-and-label">
                                <img src={EmptyCheckbox} className="bedtime-checkbox" id="checkbox1"/>
                                <p> 10 minutes of reading </p>
                                <img className="delete" onClick={() => this.deleteItem(1)}/>
                            </div>
                        </button>
                        <button id="2" type="button" className="list-group-item list-group-item-action"
                                onClick={() => this.toggleCheckbox("checkbox2")}>
                            <div className="align-check-and-label">
                                <img src={EmptyCheckbox} id="checkbox2" className="bedtime-checkbox"/>
                                <p> Brush teeth </p>
                                <img className="delete" onClick={() => this.deleteItem(2)}/>
                            </div>
                        </button>
                        <button id="3" type="button" className="list-group-item list-group-item-action"
                                onClick={() => this.toggleCheckbox("checkbox3")}>
                            <div className="align-check-and-label">
                                <img src={EmptyCheckbox} id="checkbox3" className="bedtime-checkbox"/>
                                <p> Meditate </p>
                                <img className="delete" onClick={() => this.deleteItem(3)}/>

                            </div>
                        </button>
                        <div id="here"/>
                        <img className="add" onClick={()=> this.addItem(4)}/>
                    </div>
                    <img id = "editAndSave" src = {EditButton} onClick={() => this.toggleEditableState()}/>

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
