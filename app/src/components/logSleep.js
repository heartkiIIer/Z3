import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";
import swal from "sweetalert";
import {InfoPopUp} from "../scripts/FitbitScript";

class LogSleep extends React.Component{
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

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
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

    setAsleepTrue(){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({
                asleep: true,
                uid: uid
            });
            fetch('https://sleepwebapp.wpi.edu:5000/addAsleep', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(r => {
                console.log("Added asleep boolean: ", r.status);
                this.getAsleep(this)
            })
        });
    }

    myFunction() {
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/newSleep/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( () => {
                // this.setAsleepTrue();
                console.log("Completed");
                swal({
                    title: "Success",
                    icon: "success",
                    text: "Successfully logged sleep time."
                }).then(()=>{
                    window.location.replace("https://sleepwebapp.wpi.edu/logWake");
                });
            })
        });
    }

    render(){
        this.resize();
        return (
            <div className="content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div className="inner" id="page-wrap">
                        <div class = "time" align='center'>
                            <h1 className="sleepHeader" align='center'>Are you going to sleep now?</h1>
                            <button className='btn' onClick={() => this.myFunction()}>Goodnight</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default LogSleep;
