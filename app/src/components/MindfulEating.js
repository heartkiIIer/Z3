import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";
import {getUserID} from "../scripts/login";

class MindfulEating extends React.Component {
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
                    <div className="middle" >
                        <div style={containerStyle} className="inner" id="page-wrap">
                            <h1 class = "blueHeader"> Mindful Eating</h1>
                            <hr class = "hr-settings"/>
                            <br/>
                            <p>Watch this video to learn more about mindful eating!</p>
                            <br/>

                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/oEJ6HT11w3s"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                            <br/><br/>
                            <p><b>Video Description:</b> UW Health psychologist Shilagh Mirgain explains how you can develop
                                healthier eating habits by using the technique of mindful eating. If you really savor
                                and enjoy your food, you're more likely to eat less and feel more satisfied.</p>

                            <hr className="hr-settings"/>
                            <br/>
                            <a href="https://www.youtube.com/watch?v=oEJ6HT11w3s&feature=emb_title">Source</a>
                        </div>
                    </div>
                </div>
            );

    };

}
export default MindfulEating;