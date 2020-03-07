import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";
import {getUserID} from "../scripts/login";

class mindfulLeadership extends React.Component {
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
                            <h1 class = "blueHeader"> Mindful Leadership</h1>
                            <hr class = "hr-settings"/>
                            <p>This video from the discusses how mindfulness can be applied to build stronger leadership skills.</p>

                            <hr className="hr-settings"/>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/v0CNZLIkIqw"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>

                            <hr className="hr-settings"/>
                            <a href="https://www.youtube.com/watch?v=v0CNZLIkIqw&feature=emb_title">Source</a>
                        </div>
                    </div>
                </div>
            );
        }
    };
}
export default mindfulLeadership;