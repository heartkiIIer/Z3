import React from 'react';
import "../styles/ItsBedtime.css";
import "../styles/logging.css";
import Tabs from "./sliders";
import SideBar from "./sideMenu";

class logging extends React.Component{
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
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '10% 10% 5%'
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
                <div className="middle">

                    <div style={containerStyle} className="inner " id="page-wrap">
                        <h1 className="blueHeader">Logging </h1>
                        <hr className="hr-settings"/>
                        <h4>Log your exercise, caffeine, & stress</h4>
                        <br/>
                        <Tabs/>

                    </div>
                </div>
            </div>
        )
    }
}

export default logging
