import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import SideBar from "./sideMenu";
import MobileBedtimeRoutine from "./MobileBedtimeRoutine";

class BedtimeProgressBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        if(this.props.timer){
            return(
                <div style={{ width: "390px" }}>
                    <CircularProgressbarWithChildren value={this.props.stage/this.props.stages} styles={buildStyles({
                        pathColor: "mediumpurple",
                        textSize: 10
                    })}>
                        <div style={{ marginTop: -5 }}>
                            <h1>{this.props.title}</h1>
                        </div>
                        <div style={{ marginTop: -5 }}>
                            <h1><span id = "timer">{this.props.time}</span> minutes</h1>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>)
        }
        else{
            return(
                <div style={{width: "390px" }}>
                    <CircularProgressbar value={this.props.stage/this.props.stages} text={this.props.title} styles={buildStyles({
                        pathColor: "mediumpurple",
                        textSize: 10
                    })}/>
                </div>
            );
        }
    }
}
export default BedtimeProgressBar;