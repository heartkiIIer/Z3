import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";
import {getUserID} from "../scripts/login";

class MindfulYoga extends React.Component {
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
            };
        }
        else{
            this.state = {
                padding: '17% 17% 5%',
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
                    padding: '17% 17% 5%'
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
        const styles = {
            containerStyle:{
                padding: this.state.padding,
            }
        };
        const { containerStyle } = styles;
            return (
                <div class = "content modules" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                        <div style={containerStyle} className="inner" id="page-wrap">
                            <h1 class = "blueHeader"> Mindful Yoga</h1>
                            <hr class = "hr-settings"/>
                            <br/>
                            <p>Grab a chair and follow this video for a mindful yoga routine.</p>
                            <br/>
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/9PPO7mWRRD4"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                            <br/><br/>
                            <p><b>Video Description:</b> In this version the camera follows Jenny more closely as she
                                does the chair modification of each pose while Dr. Lynn Rossy, Health Psychologist
                                for Healthy for Life guides you through the practice of mindful yoga.  Mindful hatha
                                yoga consists of gentle stretching and strengthening exercises, done slowly, with
                                moment-to-moment awareness of breathing and of the sensations that arise as you put
                                your body into various postures.</p>

                            <hr className="hr-settings"/>
                            <br/>
                            <a href="https://www.umassmed.edu/psychiatry/resources/mindfulness/resources/">Source</a>
                        </div>
                    </div>
                </div>
            );
    }
}
export default MindfulYoga;