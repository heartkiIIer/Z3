import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileExampleModule from "./MobileExampleModule";

class MindfulnessOverview extends React.Component {
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
                            <h1 class = "blueHeader"> Mindfulness Overview</h1>
                            <hr class = "hr-settings"/>
                            <p>     Mindfulness has been described as “The awareness that emerges through paying attention
                                on purpose, in the present moment, and non-judgmentally to the unfolding of experience
                                moment to moment.” - Jon Kabat-Zinn, 2003</p>
                            <br/>
                            <p>     A growing body of research supports the effectiveness of mindfulness-based interventions
                                for mental health conditions such as, depression, anxiety, and addictions, as well as
                                problems such as stress and chronic pain. Mindfulness skills allow people to be aware
                                of their symptoms and respond with self-compassion and wisdom. In combination with
                                cognitive-behavioral skills this can be a very effective treatment for overcoming symptoms
                                and reducing the suffering caused by them. This approach has also been shown to reduce
                                the chance of a recurrence of the problems in the future. Beyond helping with symptoms,
                                mindfulness can also be part of a holistic approach to wellness through self-care and
                                personal responsibility for one’s health and well-being.</p>
                            <hr className="hr-settings"/>
                            <a href="https://www.umassmed.edu/psychiatry/resources/mindfulness/">Source</a>
                        </div>
                    </div>
                </div>
            );
        }
    };
}
export default MindfulnessOverview;