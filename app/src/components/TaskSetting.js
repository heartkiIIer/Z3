import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import EmptyCheckbox from "../resources/icons/square-regular.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";

class TaskSetting extends React.Component {
    constructor(props){
        super(props);
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

    taskLabel(){
        if(this.props.taskMin === 0){
            return this.props.taskMin + " minutes of " + this.props.taskTitle;
        }
        return this.props.taskTitle;
    }

    render(){
        return (
            <div>
                <button id={"task" + this.props.id } type="button" className="list-group-item list-group-item-action">
                    <div className="align-check-and-label">
                        <img src={EmptyCheckbox} id={"checbox" + this.props.id} className="bedtime-checkbox"/>
                        <p>{this.taskLabel()}</p>
                        <img src={DeleteButton} onClick={this.deleteRoutine(this.props.id)}/>
                    </div>
                </button>
            </div>
        );
    };
}
export default TaskSetting;