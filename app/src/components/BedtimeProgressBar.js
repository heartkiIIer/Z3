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
        this.state = {timer: null, timerRunning: false};
        if(window.innerWidth >= 700){
            this.state = {
                width: '390px',
            };
        }
        else{
            this.state = {
                width: '200px',
            };
        }
    }

    componentDidMount() {
        console.log("mounted")
        if(this.props.timer){
            this.startTimer(this.props.minutes*60)
        }
    }

    componentWillUnmount() {
        if(this.props.timer){
            clearInterval(this.state.timer, ()=>{
                this.setState({timerRunning: false})}
            )
        }
    }

    startTimer(duration) {
        console.log("start timer")

        if(!this.state.timerRunning){
            this.setState({
                timerRunning: true
            }, ()=>{
                var alerted = 0;
                var timer = duration, minutes, seconds;
                var interval = setInterval(function () {
                    minutes = parseInt(timer / 60, 10);
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    if(document.getElementById('timer')!=null) {
                        document.getElementById('timer').innerText = minutes + ":" + seconds;
                    }
                    if (--timer < 0) {
                        timer = 0;
                        if(alerted === 0){
                            alert("Your timer has finished!");
                            alerted++;
                        }
                        return;
                    }
                }, 1000)
                this.setState({timer: interval})
            })
        }
        else{
            console.log("clear interval")
            clearInterval(this.state.timer, ()=>{
                this.setState({timerRunning: false})}
            )
            this.startTimer(duration)
        }
    }
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    width: '200px'
                });
            }
            else {
                this.setState({
                    width: '390px'
                })
            }
        })
    }

    render(){
        this.resize();
        const styles = {
            containerStyle:{
                width: this.state.width,
            }
        };
        const { containerStyle } = styles;
        if(this.props.timer){
            return(
                <div style={containerStyle}>
                    <CircularProgressbarWithChildren value={(this.props.stage/this.props.stages)*100} styles={buildStyles({
                        pathColor: "mediumpurple",
                        textSize: 10
                    })}>
                        <div style={{ marginTop: -5 }}>
                            <h1>{this.props.title}</h1>
                        </div>
                        <div style={{ marginTop: -5 }}>
                            <h1><span id = "timer">{this.props.minutes.toString() + ':00' }</span> minutes</h1>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>)
        }
        else{
            return(
                <div style={{width: "390px" }}>
                    <CircularProgressbar value={(this.props.stage/this.props.stages)*100} text={this.props.title} styles={buildStyles({
                        pathColor: "mediumpurple",
                        textSize: 10
                    })}/>
                </div>
            );
        }
    }
}
export default BedtimeProgressBar;