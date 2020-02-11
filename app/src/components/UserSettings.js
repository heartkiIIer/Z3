import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SaveButton from "../resources/icons/save-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";
import SideBar from "./sideMenu";
import CalendarButtons from "./CalendarButtons";
import EmptyCheckbox from "../resources/icons/square-regular.svg";
import CheckedBox from "../resources/icons/check-square-solid.svg";
import AddButton from "../resources/icons/plus-circle-solid.svg";
import {updatePwd, updateEmail, deleteAcc, updateImage} from "../scripts/SettingsScript"


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {
    constructor(props){
        super(props)
        this.state = { isEditable: false, image: "" };
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
        if(this.state.isEditable == false){
            this.setState( {isEditable : true}, () => {this.changeState()})
        }
        else{
            this.setState( {isEditable : false}, () => {this.changeState()})
        }
    }

    addItem(id){
        document.getElementById("here").innerHTML =  '<button id = "4" type="button" class="list-group-item list-group-item-action"> <div class="align-check-and-label"> <div class="checkbox checkbox-circle checkbox-primary "> <input type="checkbox" id="checkbox4"/> <label htmlFor="checkbox4"/> </div> <p> Meditate </p> <img class = "delete"/></div> </button>'
    }

    getUserImage(){
        fetch('http://localhost:5000/user')
            .then(response => response.json())
            .then(data => this.setState({
                image: data.image
            }));
    }

    render(){
        this.getUserImage();
        return (
            <div class = "content settings" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <h1 class = "blueHeader"> Modify your settings</h1>
                    <hr class = "hr-settings"/>
                    <h3 class = "blueHeader"> Change password </h3>
                    <div class = "flex-row-nowrap">
                        <p class = "blueHeader width80"> Enter new password: </p>
                        <input id="chgPwd-NewPwd" className='editMe' type="password" placeholder='new password'/>
                    </div>
                    <div className="flex-row-nowrap">
                        <p className="blueHeader width80"> Re-enter new password: </p>
                        <input id="chgPwd-NewPwd2" className='editMe' type="password" placeholder='new password'/>
                    </div>
                    <br/>
                    <button className='btn' id = "extended" onClick={updatePwd}>
                        Confirm
                    </button>

                    <h3 className="blueHeader"> Change email </h3>
                    <div className="flex-row-nowrap">
                        <p className="blueHeader width80"> Enter new email: </p>
                        <input id="chgEmail-NewEmail" className='editMe' placeholder='example@gmail.com'/>
                    </div>
                    <div className="flex-row-nowrap">
                        <p className="blueHeader width80"> Re-enter new email: </p>
                        <input id="chgEmail-NewEmail2" className='editMe' placeholder='example@gmail.com'/>
                    </div>
                    <br/>
                    <button className='btn' id="extended" onClick={updateEmail}>
                        Confirm
                    </button>

                    <h3 className="blueHeader"> Change Profile Image </h3>
                    <div className="flex-row-nowrap">
                        <img id="chgImg" style={{marginRight: "20px"}} className="profile_pic" src={this.state.image} alt=""/>
                        <input id="chgImageURL" className='editMe' type="text" placeholder='https://images.com/example.png'/>
                    </div>
                    <br/>
                    <button className='btn' id="extended" onClick={updateImage}>
                        Confirm
                    </button>

                    <h1 className="blueHeader"> Account Access</h1>
                    <hr className="hr-settings"/>
                    <div class = "flex-row-nowrap">
                        <CalendarButtons/>
                        <button className='btn' id = "extended">
                            Remove FitBit Access
                        </button>
                    </div>

                    <h1 className="blueHeader"> Modify your Bedtime Routine</h1>
                    <hr className="hr-settings"/>
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
                        Delete your account
                    </button>
                </div>
            </div>
        );
    };
}
export default UserSettings;
