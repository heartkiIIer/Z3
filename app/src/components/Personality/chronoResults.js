import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";

class ChronoResults extends React.Component {
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                chronoAnswers: []
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
                chronoAnswers: []
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

    componentDidMount(){
        let currentComponent = this;
        this.getChronoResults(currentComponent);
    }

    getChronoResults(currentComponent){
        fetch('http://sleepwebapp.wpi.edu:5000/getChronoAnswers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( r => {
            return r.json();
        }).then(r => {
            currentComponent.setState({chronoAnswers : r});
            console.log(r);
        });
    }

    calculateScore(){
        if(this.state.chronoAnswers.length === 0){
            return "NaN";
        }
        var score = 40;
        return score;
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
            <div className = "content chronotype" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div style={containerStyle} className="inner" id="page-wrap">
                    <h1 className="blueHeader">Chronotype Results</h1>
                    <hr className="hr-settings"/>

                    <h3 className="blueHeader">Chronotype Score: {this.calculateScore()}</h3>

                    <div className="d-flex justify-content-between">
                        <Link to="/chronotype">
                            <button className="btn">Retake Chronotype Test</button>
                        </Link>
                        <Link to="/personalityIntro">
                            <button className="btn">Done</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
}
export default ChronoResults;
