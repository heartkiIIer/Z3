import React from 'react';
import "../../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../../styles/ItsBedtime.css";
import SaveButton from "../../resources/icons/save-solid.svg";
import EditButton from "../../resources/icons/edit-solid.svg";
import DeleteButton from "../../resources/icons/minus-circle-solid.svg";
import AddButton from "../../resources/icons/plus-circle-solid.svg";
import EmptyCheckbox from "../../resources/icons/square-regular.svg";
import CheckedBox from "../../resources/icons/check-square-solid.svg"
import SideBar from "../sideMenu";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class ItsBedtime extends React.Component {
    constructor(props){
        super(props)
        this.state = { isEditable: false };
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

    componentDidMount() {
        setTimeout(function () {
            document.getElementById("outer-circle").style.opacity = 100;
        }, 250);
    }

    deleteItem(id){
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);

    }

    changeState(){
        console.log(this.state.isEditable);

        if(this.state.isEditable){
            document.getElementById("editAndSave").src = SaveButton;

            for(var i = 0; i < document.getElementsByTagName("p").length; i++){
                document.getElementsByTagName("p").item(i).innerHTML = "<input class = 'editMe' placeholder ='placeholder'/>";
                document.getElementsByClassName("delete").item(i).src = DeleteButton;
                document.getElementsByClassName("add").item(0).src = AddButton;

            }

        }
        else{
            document.getElementById("editAndSave").src = EditButton;
            for(var i = 0; i < document.getElementsByTagName("p").length; i++){
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

    render(){

        return (
            <div class = "content personality" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" id="page-wrap">
                    <div class = "itsBedtime">
                       <div class = "outer-circle" id = "outer-circle">
                           <div className="inner-circle">
                               It's Bedtime
                           </div>
                       </div>
                        <hr class = "bedtime-hr"/>
                        <img id = "editAndSave" src = {EditButton} onClick={() => this.toggleEditableState()}/>
                        <div className="list-group">
                            <button id = "1" type="button" className="list-group-item list-group-item-action" onClick={() => this.toggleCheckbox("checkbox1")}>
                                <div class = "align-check-and-label">
                                    <img src={EmptyCheckbox} class = "bedtime-checkbox" id = "checkbox1"/>
                                    <p> 10 minutes of reading </p>
                                    <img className="delete" onClick={()=> this.deleteItem(1)}/>
                                </div>
                            </button>
                            <button id = "2" type="button" className="list-group-item list-group-item-action"
                                    onClick={() => this.toggleCheckbox("checkbox2")}>
                                <div className="align-check-and-label">
                                    <img src={EmptyCheckbox} id = "checkbox2" class = "bedtime-checkbox" />
                                    <p> Brush teeth </p>
                                    <img class = "delete" onClick={()=> this.deleteItem(2)}/>
                                </div>
                            </button>
                            <button id = "3" type="button" className="list-group-item list-group-item-action"
                                    onClick={() => this.toggleCheckbox("checkbox3")}>
                                <div className="align-check-and-label">
                                    <img src={EmptyCheckbox} id = "checkbox3" class = "bedtime-checkbox" />
                                    <p> Meditate </p>
                                    <img className="delete" onClick={()=> this.deleteItem(3)}/>

                                </div>
                            </button>
                            <div id = "here"/>
                        </div>
                        <img className="add" onClick={()=> this.addItem(4)}/>
                    </div>
                </div>
            </div>
        );
    };
}
export default ItsBedtime;
