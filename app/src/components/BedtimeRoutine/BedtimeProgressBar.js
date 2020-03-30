import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import {CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import swal from "sweetalert"

const h1 = {
    fontSize: '25px',
    color: '#3e98c7'
}

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
                width: '210px',
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
                            swal({
                                title: "Time is up!",
                                text: "Your timer has finished. Please click next item to continue your bedtime routine."
                            });
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
                    width: '210px'
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
                            <b><h1 style={h1}>{this.props.title}</h1></b>
                        </div>
                        <br/>
                        <div style={{ marginTop: -5 }}>
                            <h1 style={h1}><span id = "timer">{this.props.minutes.toString() + ':00' }</span> minutes</h1>
                        </div>
                    </CircularProgressbarWithChildren>
                </div>)
        }
        else{
            return(
                <div style={containerStyle}>
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