import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";

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
            fetch('http://sleepwebapp.wpi.edu:5000/newSleep/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                console.log("Completed")
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
                            <a href="/logWake"><button className='btn' onClick={() => this.myFunction()}>Goodnight</button></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default LogSleep;