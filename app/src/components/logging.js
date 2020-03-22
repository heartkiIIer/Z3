import React from 'react';
import "../styles/ItsBedtime.css";
import "../styles/logging.css";
import {Tabs} from "./sliders";
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";

class logging extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                maxWidth: '700px'
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
                maxWidth: '550px'
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
                    maxWidth: '550px'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px',
                    maxWidth: '700px'
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
                        <Tabs/>
                    </div>
            </div>
        )
    }
}

export default logging
