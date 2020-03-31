import React, {SyntheticEvent} from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";
import {getUserID} from "../../scripts/login";

class PersonalityResults extends React.Component {
    constructor(props) {
        super(props);
        this.openURL = this.openURL.bind(this);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                personality: null
            };
        }
        else{
            this.state = {
                padding: '17% 17% 5%',
                personality: null
            };
        }
    }
    //opens the URL of the personality test in a separate window
    openURL(event: SyntheticEvent<any>): void {
        window.open("https://www.truity.com/test/big-five-personality-test", "_blank", "width=1000, height=600");
    }
    //re-adjust padding of content div if the page is less than 700 px wide
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
    componentDidMount(){
        let currentComponent = this;
        this.getPersonality(currentComponent);
    }
    //retrieves personality scores from the database
    getPersonality(currentComponent){
        let idPromise = getUserID(); //get signed in user's ID
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            //request to get user's personality scores
            fetch('https://sleepwebapp.wpi.edu:5000/getPersonality', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                //stores personality scores in state
                currentComponent.setState({personality : r});
            });
        });
    }
    //translate number values of the personality score to match low, medium, or high
    getValue(perScore){
        if(perScore === 1)
            return "low";
        else if (perScore === 5)
            return "medium";
        else
            return "high";
    }
    //return the user's openness score
    getOpenness(){
        if(this.state.personality !== null){
            var perScore = this.state.personality[this.state.personality.length-1];
            return this.getValue(perScore.openness);
        }
        return "NaN" //no score available
    }
    //return the user's conscientiousness score
    getConscientiousness(){
        if(this.state.personality !== null){
            var perScore = this.state.personality[this.state.personality.length-1];
            return this.getValue(perScore.conc);
        }
        return "NaN" //no score available
    }
    //return the user's extraversion score
    getExtraversion(){
        if(this.state.personality !== null){
            var perScore = this.state.personality[this.state.personality.length-1];
            return this.getValue(perScore.extraver);
        }
        return "NaN" //no score available
    }
    //return the user's agreeableness score
    getAgreeableness(){
        if(this.state.personality !== null){
            var perScore = this.state.personality[this.state.personality.length-1];
            return this.getValue(perScore.agree);
        }
        return "NaN" //no score available
    }
    //return the user's neuroticism score
    getNeuroticism(){
        if(this.state.personality !== null){
            var perScore = this.state.personality[this.state.personality.length-1];
            return this.getValue(perScore.neuro);
        }
        return "NaN" //no score available
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
            <div className = "content personality" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div style={containerStyle} className="inner" id="page-wrap">
                    <h1 className="blueHeader">Your Big 5 Personality Results</h1>
                    <hr className="hr-settings"/>
                    <br/>

                    <h5 className="blueHeader"><b>Openness</b></h5>
                    <p id="o_score">Score: <span>{this.getOpenness()}</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Conscientiousness</b></h5>
                    <p id="c_score">Score: <span>{this.getConscientiousness()}</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Extraversion</b></h5>
                    <p id="e_score">Score: <span>{this.getExtraversion()}</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Agreeableness</b></h5>
                    <p id="a_score">Score: <span>{this.getAgreeableness()}</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Neuroticism</b></h5>
                    <p id="n_score">Score: <span>{this.getNeuroticism()}</span></p>

                    <div className="d-flex justify-content-between">
                        <Link to="/personality">
                            <button className="btn" onClick={(e) => this.openURL(e)}>Retake Personality Test</button>
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
export default PersonalityResults;
