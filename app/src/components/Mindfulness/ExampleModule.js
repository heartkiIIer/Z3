import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "../SideMenu";
import MobileExampleModule from "./MobileExampleModule";
import {getUserID} from "../../scripts/login";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the an example modules page.
 * */

class ExampleModule extends React.Component {
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
                <div class = "content modules" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                    <div className="inner" id="page-wrap">
                        <h1 class = "blueHeader"> 5-minute Meditation</h1>
                        <hr class = "hr-settings"/>
                        <br/>
                        <p>This audio from the UCSD Center for Mindfulness will lead you in a 5 minute mindfulness meditation exercise.</p>
                        <br/>
                        <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/665221820&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"/>
                        <hr className="hr-settings"/>
                        <br/>
                        <a href="https://medschool.ucsd.edu/som/fmph/research/mindfulness/programs/mindfulness-programs/MBSR-programs/Pages/audio.aspx">Source</a>
                    </div>
                    </div>
                </div>
            );
    };
}
export default ExampleModule;
