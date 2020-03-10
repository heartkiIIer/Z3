import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import Tile from "./Tile.js";
import SideBar from "./sideMenu";
import MobileMindfulnessModules from "./MobileMindfulnessModules";
import {getUserID} from "../scripts/login";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the mindfulness modules page.
 * */

class MindfulnessModules extends React.Component {
    constructor(props){
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                tilePaddingLeft: '40px'
            };
        }
        else{
            this.state = {
                padding: '17% 17% 5%',
                tilePaddingLeft: '25px'
            };
        }
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        })
        window.addEventListener('resize', this.updateDimensions);
    }


    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '17% 17% 5%',
                    tilePaddingLeft: '25px'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px',
                    tilePaddingLeft: '40px'
                })
            }
        })
    }

    render() {
        this.resize();
        const styles = {
            containerStyle:{
                padding: this.state.padding,
            }
        };
        const { containerStyle } = styles;

        const style = {
            containerStyles:{
                paddingLeft: this.state.tilePaddingLeft,
            }
        };
        const { containerStyles } = style;

        return (
            <div class="content modules" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div style={containerStyle} className="inner" id="page-wrap">
                        <h1 class="blueHeader"> Mindfulness Modules</h1>
                        <hr class="hr-settings"/>
                        <br/>
                        <h4>Explore mindfulness topics: proven to improve sleep!</h4>
                        
                        <div style={containerStyles} class="flex-row-wrap">
                            <a href="/MindfulnessOverview">
                                <Tile name="Mindfulness Overview"/>
                            </a>
                            <a href="/MindfulYoga">
                                <Tile name="Mindful Yoga"/>
                            </a>
                            <a href="/ExampleModule">
                                <Tile name="5 Minute Meditation"/>
                            </a>
                            <a href="/BodyScanMeditation">
                                <Tile name="10 Minute Meditation"/>
                            </a>
                            <a href="/MindfulEating">
                                <Tile name="Mindful Eating"/>
                            </a>
                            <a href="/mindfulLeadership">
                                <Tile name="Mindful Leadership"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MindfulnessModules;
