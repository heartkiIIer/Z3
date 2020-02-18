import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";

class MindfulEating extends React.Component {
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
                            <h1 class = "blueHeader"> Mindful Eating</h1>
                            <hr class = "hr-settings"/>
                            <p>Watch this video to learn more about mindful eating!</p>

                            <hr className="hr-settings"/>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/oEJ6HT11w3s"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            <p>Video Description: UW Health psychologist Shilagh Mirgain explains how you can develop
                                healthier eating habits by using the technique of mindful eating. If you really savor
                                and enjoy your food, you're more likely to eat less and feel more satisfied.</p>
                        </div>
                    </div>
                </div>
            );
        }
    };
}
export default MindfulEating;