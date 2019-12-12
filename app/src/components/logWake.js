import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";

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
    render(){
        this.resize();
        return (
            <div class = "content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div class = "sleepInner" id="page-wrap">
                    <div class = "time" align='center'>
                        <h1 className="wakeHeader" align='center'>Ready to start your day?</h1>
                        <a href="/logSleep"><button className='btn' id="extended2" onClick="myFunction()">I Just Woke Up</button></a>
                        <form>
                            <input className="inp2" type="time" name="usr_time" placeholder="Hour"/>
                            <br/>
                            <a href="/logSleep"><button className='btn' onClick="myFunction()">I Woke Up At This Time</button></a>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default LogWake;