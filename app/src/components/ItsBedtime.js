import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SaveButton from "../resources/icons/save-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the It's Bedtime routine page.
 * */

/*
* TODO
*  3. Editable todo list
*               - delete
*               - add
* **/

class ItsBedtime extends React.Component {
    constructor(props){
        super(props)
        this.state = { isEditable: false };
    }

    toggleCheckbox(element){
        if(document.getElementById(element).checked === true){
            document.getElementById(element).checked = false;
        }
        else {
            document.getElementById(element).checked = true;
        }
    }

    componentDidMount() {
        setTimeout(function () {
            document.getElementById("outer-circle").style.opacity = 100;
        }, 250);
    }

    changeState(){
        console.log(this.state.isEditable);

        if(this.state.isEditable){
            document.getElementById("editAndSave").src = SaveButton;

            for(var i = 0; i < document.getElementsByTagName("p").length; i++){
                document.getElementsByTagName("p").item(i).innerHTML = "<input></input>";
                document.getElementsByClassName("delete").item(i).src = DeleteButton;

            }

        }
        else{
            document.getElementById("editAndSave").src = EditButton;
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

    render(){
        return (
            <div class = "content">
                <div class = "inner">
                    <div class = "itsBedtime">
                       <div class = "outer-circle" id = "outer-circle">
                           <div className="inner-circle">
                               It's Bedtime
                           </div>
                       </div>
                        <hr/>
                        <img id = "editAndSave" src = {EditButton} onClick={() => this.toggleEditableState()}/>
                        <div className="list-group">
                            <button id = "1" type="button" className="list-group-item list-group-item-action" onClick={() => this.toggleCheckbox("checkbox1")}>
                                <div class = "align-check-and-label">
                                    <div class = "checkbox checkbox-circle checkbox-primary ">
                                        <input type="checkbox" id = "checkbox1"/>
                                        <label for="checkbox1"/>
                                    </div>
                                    <p> 10 minutes of reading </p>
                                    <img className="delete"/>
                                </div>
                            </button>
                            <button id = "2" type="button" className="list-group-item list-group-item-action"
                                    onClick={() => this.toggleCheckbox("checkbox2")}>
                                <div className="align-check-and-label">
                                    <div className="checkbox checkbox-circle checkbox-primary ">
                                        <input type="checkbox" id="checkbox2"/>
                                        <label htmlFor="checkbox2"/>
                                    </div>
                                    <p> Brush teeth </p>
                                    <img class = "delete"/>
                                </div>
                            </button>
                            <button id = "3" type="button" className="list-group-item list-group-item-action"
                                    onClick={() => this.toggleCheckbox("checkbox3")}>
                                <div className="align-check-and-label">
                                    <div className="checkbox checkbox-circle checkbox-primary ">
                                        <input type="checkbox" id="checkbox3"/>
                                        <label htmlFor="checkbox3"/>
                                    </div>
                                    <p> Meditate </p>
                                    <img className="delete"/>

                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default ItsBedtime;
