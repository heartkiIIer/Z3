import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";

class MindfulYoga extends React.Component {
    constructor(props){
        super(props)
        var mobile;
        if(window.innerWidth >= 700){
            mobile = false;
        }
        else{
            mobile = true;
        }
        this.state = { isEditable: false, stage: 0, isMobile: mobile};
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    mobile: true
                });
            }
            else {
                this.setState({
                    mobile: false
                })
            }
        })
    }
    render(){
        this.resize();
        if(this.state.isMobile){
            return (
                <MobileExampleModule/>
            );
        }
        else{
            return (
                <div class = "content modules" id="App">
                    <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div className="middle">
                        <div className="inner" id="page-wrap">
                            <h1 class = "blueHeader"> Mindful Yoga</h1>
                            <hr class = "hr-settings"/>
                            <p>Grab a chair and follow this video for a mindful yoga routine.</p>

                            <hr className="hr-settings"/>

                            <iframe width="560" height="315" src="https://www.youtube.com/embed/9PPO7mWRRD4"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>

                            <p>Video Description: In this version the camera follows Jenny more closely as she
                                does the chair modification of each pose while Dr. Lynn Rossy, Health Psychologist
                                for Healthy for Life guides you through the practice of mindful yoga.  Mindful hatha
                                yoga consists of gentle stretching and strengthening exercises, done slowly, with
                                moment-to-moment awareness of breathing and of the sensations that arise as you put
                                your body into various postures.    While you will be following Rossy's instructions,
                                it is very important to simultaneously listen to your own body in order to discover
                                your version of each posture--honoring the wisdom of your body and what it tells you
                                about how to move into a posture, how long to hold it, and if you need to move out of
                                a posture before Rossy say to, then do so.  If you find yourself unable to do a particular
                                posture, please feel free to skip it. We always recommend that you check with your health
                                care provider before starting a new practice of physical activity.</p>

                            <hr className="hr-settings"/>
                            <a href="https://www.umassmed.edu/psychiatry/resources/mindfulness/">Source</a>
                        </div>
                    </div>
                </div>
            );
        }
    };
}
export default MindfulYoga;