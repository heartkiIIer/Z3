import React, { Component } from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";

class sleep extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 500){
            this.state = {
                padding: '75px 75px 40px'
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%'
            };
        }
    }

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
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
            <div className="content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div className="logsleepInner" id="page-wrap">
                        <div class = "new-time" align='center'>
                            <h2 className="newsleepHeader" align='center'>Waking up?</h2>
                            <a href="/LogWake"><button className='btn'>Log wake time</button></a>
                            <br/>
                            <hr/>
                            <br/>
                            <h2 className="newsleepHeader" align='center'>Going to Sleep?</h2>
                            <a href="/LogSleep"><button className='btn'>Log sleep time</button></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default sleep;