import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";


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
      // window.addEventListener('resize', this.updateDimensions);
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

    setAsleepFalse(){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({
                asleep: false,
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
            fetch('https://sleepwebapp.wpi.edu:5000/newWake/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                this.setAsleepFalse();
                console.log("Completed")
            })
        });
    }
    render(){
        //this.updateDimensions();
        this.resize();
        return (
            <div className = "content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div className = "inner" id="page-wrap">
                    <div class = "time" align='center'>
                        <h1 className="wakeHeader" align='center'>Good Morning!</h1>
                        <h3 className="wakeHeaderTwo" align='center'>What time did you wake up?</h3>
                        <a href="/logSleep"><button className='btn' id="extended2" onClick={() => this.myFunction()}>I just woke up</button></a>
                        <h3 className="wakeHeaderThree" align='center'>or</h3>
                        <form>
                            <input className="inp2" type="time" name="usr_time" defaultValue="07:00"/>
                            <a href="/logSleep"><button className='btn' onClick={() => this.myFunction()}>At This Time</button></a>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        );
    };
}

export default LogWake;
