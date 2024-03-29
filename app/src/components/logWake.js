import React, { Component } from 'react';
import '../styles/logSleep.css'
import '../styles/ItsBedtime.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";
import swal from "sweetalert";
import {InfoPopUp} from "../scripts/FitbitScript";


class LogWake extends React.Component{

    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
            };
        }
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
        window.addEventListener('resize', this.updateDimensions);
        InfoPopUp();
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '10% 10% 5%'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px'
                })
            }
        })
    }

    myFunction() {
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getLatestSleep/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( s => {
                return s.json();
            }).then(s => {
                //if there is already a wake entry send error
                if(s.length === 0){
                    swal({
                        text: "You either do not have a sleep time entry or have already submitted a wake time.",
                        icon: "error"
                    });
                    return;
                }
                if (s[0].end_sleep !== null) {
                    swal({
                        text: "You either do not have a sleep time entry or have already submitted a wake time.",
                        icon: "error"
                    });
                    return;
                }
                fetch('https://sleepwebapp.wpi.edu:5000/newWake/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data
                }).then( r => {
                    swal({
                        title: "Success",
                        icon: "success",
                        text: "Successfully logged wake time."
                    }).then(()=>{
                        window.location.replace("https://sleepwebapp.wpi.edu/home");
                    });
                    console.log("Completed")
                })
            });
        });
    }

    // returns true if the input is invalid and false if the input is valid
    static invalidTimeInput(time){
        let vaildInput = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if(time === null){
            return false;
        }

        return time.length !== 5 || //string length of valid input is 5 as format is HH:MI so anything outside of that is invalid
            !vaildInput.slice(0, 3).includes(time[0]) || //check if first character is 0, 1, or 2
            !vaildInput.includes(time[1]) || //check if second character is 0-9
            time[2] !== ':' || //check if third character is ':'
            !vaildInput.slice(0, 6).includes(time[3]) || //check if fourth character is 0-5
            !vaildInput.includes(time[4]); //check if last character is 0-9
    }

    myFunctionTwo() {
        // prompt to enter Wake up time
        swal({ //prompt user to enter the time
            title: "Enter wake up time",
            text: "Please enter the time you woke up in military time, any input not in the specified format will NOT be recorded.",
            content: {
                element: "input",
                attributes: {
                    placeholder: "HH:MM (e.g. 07:30)",
                    type: "text"
                }
            },
            buttons: true,
        }).then((time) => {
            if(time === ""){ //user clicked okay with nothing as input
                swal({
                    text: "No time was inputted",
                    icon: "error"
                });
            }
            else if(LogWake.invalidTimeInput(time)){
                swal({
                    title: "Invalid Input",
                    text: "Please make sure the input is a valid numeric time with the format HH:MM. Example: 09:30",
                    icon: "error"
                });
            }
            else if(time !== null) { // user clicked okay with something in the input field
                let idPromise = getUserID();
                idPromise.then(uid=>{
                    const data = JSON.stringify({uid: uid});
                    //get time user last went to sleep
                    fetch('https://sleepwebapp.wpi.edu:5000/getLatestSleep/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then( s => {
                        return s.json();
                    }).then(s => {
                        //if there is already a wake entry send error
                        if(s.length === 0){
                            swal({
                                text: "You either do not have a sleep time entry or have already submitted a wake time.",
                                icon: "error"
                            });
                            return;
                        }
                        if(s[0].end_sleep !== null){
                            swal({
                                text: "You either do not have a sleep time entry or have already submitted a wake time.",
                                icon: "error"
                            });
                            return;
                        }
                        //get todays date
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        today = yyyy + '/' + mm + '/' + dd + ' ';
                        //declare Date obj for todays date and entered wake up time
                        var fullDate = new Date(today+time+':00');
                        console.log(s);
                        console.log(s[0]);
                        var sleep = s[0]["start_sleep"];
                        console.log(sleep);
                        //declare Date obj for date and time user last went to sleep
                        var sleepDate = new Date(sleep);
                        console.log(sleepDate);
                        //check if wake up time before sleep time
                        console.log(sleepDate.getTime());
                        if(fullDate.getTime() < sleepDate.getTime()){
                            swal({
                                text: "Time entered is earlier than time you went to sleep.",
                                icon: "error"
                            });
                        } else if (fullDate.getTime() > new Date().getTime()) {
                            swal({
                                text: "Time entered cannot be later than current time.",
                                icon: "error"
                            });
                        }
                        //submit wake time
                        else if(fullDate.getTime() >= sleepDate.getTime()) {
                            idPromise.then(uid => {
                                const data = JSON.stringify({
                                    uid: uid,
                                    time: today + time + ':00'
                                });
                                fetch('https://sleepwebapp.wpi.edu:5000/newWakeByTime', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: data
                                }).then(r => {
                                    swal({
                                        title: "Success",
                                        icon: "success",
                                        text: "Successfully logged wake time."
                                    }).then(() => {
                                        window.location.replace("https://sleepwebapp.wpi.edu/home");
                                    });
                                    console.log("Completed")
                                })
                            });
                        }
                    });

                });
            }
        });
    }

    render(){
        //this.updateDimensions();
        this.resize();
        return (
            <div className = "content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div className = "sleepInner" id="page-wrap">
                    <div class = "time" align='center'>
                        <h1 className="wakeHeader" align='center'>Good Morning!</h1>
                        <h3 className="wakeHeaderTwo" align='center'>What time did you wake up?</h3>
                        <button className='btn' id="extended2" onClick={() => this.myFunction()}>I just woke up</button>
                        <h3 className="wakeHeaderThree" align='center'>or</h3>
                        <button className='btn' id="extended2" onClick={() => this.myFunctionTwo()}>At a different time</button>
                    </div>
                </div>
                </div>
            </div>
        );
    };
}

export default LogWake;
