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
    }

    getSleepTime(){
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
            }).then( r => {
                return r.json();
            }).then(r => {
            })
        });
    }


    myFunctionTwo() {
        // prompt to enter Wake up time
        swal({ //prompt user to enter the time
            title: "Enter wake up time",
            text: "Please enter the time you woke up",
            content: {
                element: "input",
                attributes: {
                    placeholder: "HH:MM ex:07:30",
                    type: "text"
                }
            },
            buttons: true,
        }).then((time) => {
            if(time === ""){ //user clicked okay with nothing as input
                swal({
                    text: "No task was inputed",
                    icon: "error"
                });
            }
            else if(time !== null) { // user clicked okay with something in the input field
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
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();
                        today = yyyy + '/' + mm + '/' + dd + ' ';
                        var fullDate = new Date(today+time+':00');
                        var sleepDate = new Date(s);
                        if(fullDate.getTime() < sleepDate.getTime){
                            swal({
                                text: "Time entered is earlier than time you went to sleep",
                                icon: "error"
                            });
                        }
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
