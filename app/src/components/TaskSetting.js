import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import EmptyCheckbox from "../resources/icons/square-regular.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg"
import SaveButton from "../resources/icons/save-solid.svg"

class TaskSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false
        }
    }

    //deletes the routine from bedtime routine list
    deleteRoutine(e) {
        e.preventDefault();
        const data = JSON.stringify({entryId: this.props.id});
        fetch('https://sleepwebapp.wpi.edu:5000/deleteRoutine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            window.location.reload();
        });
    }
    //returns labels for the the bedtime routine task
    taskLabel(){
        if(this.state.edit) {
            return [<input id={"edittask" + this.props.id} type="text" value={this.props.taskTitle}/>,
                <input id={"editminutes" + this.props.id} type="text" value={this.props.taskMin}/>];
        }
        else{
            if(this.props.taskMin !== 0){ //task is timed, state minutes
                return <p>{this.props.taskMin + " minutes of " + this.props.taskTitle}</p>;
            }
            return <p>{this.props.taskTitle}</p>; //task is not timed, just state task
        }
    }
    //edit the task from bedtime routine list
    editRoutine(e){
        let minutes = document.getElementById("editminutes"+this.props.id).value;
        let task = document.getElementById("edittask"+this.props.id).value;
        e.preventDefault();
        const data = JSON.stringify({
            entryId: this.props.id,
            minutes: minutes,
            task: task
        });
        fetch('https://sleepwebapp.wpi.edu:5000/editRoutine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            window.location.reload();
        });
    }
    //return edit button if edit is false, otherwise return save button
    getbutton(){
        if(this.state.edit){
            return <img style={{marginLeft: "10px"}} src={SaveButton} onClick={this.editRoutine.bind(this)}/>
        }
        else{
            return <img style={{marginLeft: "10px"}} src={EditButton} onClick={this.toggleEdit.bind(this)}/>;
        }

    }
    toggleEdit(e){
        e.preventDefault();
        this.setState({edit: true});
    }

    render(){
        console.log("hello");
        return (
            <div className="d-flex flex-row">
                <button id={"task" + this.props.id } type="button" className="list-group-item list-group-item-action" disabled={true}>
                    <div className="align-check-and-label">
                        <img src={EmptyCheckbox} id={"checbox" + this.props.id} className="bedtime-checkbox"/>
                        {this.taskLabel()}
                    </div>
                </button>
                {this.getbutton()}
                <img style={{marginLeft: "10px"}} src={DeleteButton} onClick={this.deleteRoutine.bind(this)}/>
            </div>
        );
    };
}
export default TaskSetting;