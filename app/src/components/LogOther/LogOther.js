import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/LogOther.css";
import {AllTabs} from "./AllTabs";
import SideBar from "../sideMenu";
import {getUserID} from "../../scripts/login";
import {InfoPopUp} from "../../scripts/FitbitScript";

/**
 * @author Shine Linn Thant
 * This component renders the Log Exercise, Caffeine, and Stress page.
 * */

class LogOther extends React.Component{
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

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        });
        window.addEventListener('resize', this.updateDimensions);
        InfoPopUp();
        // document.getElementById('page-wrap').children[5].children[0].children[0].className= 'item'
        // document.getElementById('page-wrap').children[5].children[0].children[1].id= 'active'
        // document.getElementById('page-wrap').children[5].children[0].children[1].className= 'active item'
        // console.log(document.getElementById('active'))
        // document.getElementById('active').click()
        // document.getElementById('active').click()
        // document.getElementById('active').click()
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

    render() {
        this.resize();
        const styles = {
            containerStyle:{
                padding: this.state.padding,
            }
        };
        const { containerStyle } = styles;

        return(
            <div class="content logging-background" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                    <div style={containerStyle} className="inner " id="page-wrap">
                        <h1 className="blueHeader">Logging </h1>
                        <hr className="hr-settings"/>
                        <br/>
                        <h4>Log your exercise, caffeine, & stress</h4>
                        <br/>
                        <AllTabs/>
                    </div>
            </div>
        )
    }
}

export default LogOther
