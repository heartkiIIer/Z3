import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the an example modules page.
 * */

class ExampleModule extends React.Component {
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
                        <h2>Subtopic 1</h2>
                        <p>This audio from the UCSD Center for Mindfulness will lead you in a 5 minute mindfulness meditation exersize.</p>

                        <hr className="hr-settings"/>
                        <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay"
                                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/665221820&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                    </div>
                    </div>
                </div>
            );
        }
    };
}
export default ExampleModule;
