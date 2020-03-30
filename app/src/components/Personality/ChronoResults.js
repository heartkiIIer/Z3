import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/PersonalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../SideMenu";
import {getUserID} from '../../scripts/login'

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
                padding: '17% 17% 5%',
                chronoAnswers: []
            };
        }
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
        this.getChronoResults(currentComponent);
    }
    //fetch the logged in user's chronotype quiz answers
    getChronoResults(currentComponent){
        //retrieve logged in user's ID from Firebase
        let idPromise = getUserID();
        idPromise.then(uid =>{
            const data = JSON.stringify({uid: uid});
            //request chronotype of user data from the server and database
            fetch('https://sleepwebapp.wpi.edu:5000/getChronoAnswers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                //set user's chronotype answers as a state to calculated and rendered their score on page
                currentComponent.setState({chronoAnswers : r});
            });
        });
    }
    //takes in a value and sets the "opposite" number in a set of {1, 2, 3, 4}
    // for example if the input value is 1 the output value would be 4
    reverseScore4(value){
        if(value === 4)
            return 1;
        else if(value === 3)
            return 2;
        else if(value === 2)
            return 3;
        else
            return 4;
    }
    //takes in a value and sets the "opposite" number in a set of {1, 2, 3, 4. 5}
    reverseScore5(value){
        if(value === 5)
            return 1;
        else if(value === 4)
            return 2;
        else if(value === 3)
            return 3;
        else if(value === 2)
            return 4;
        else
            return 5;
    }
    //takes the answers to the chronotype quiz and calculate the
    calculateScore(){
        if(this.state.chronoAnswers.length === 0){
            return "NaN"; //user has not taken the chronotype quiz, no answers stored in the database
        }
        //grabs the users most recent chronotype quiz answers
        var qAnswers = this.state.chronoAnswers[this.state.chronoAnswers.length-1];
        var score = this.reverseScore5(qAnswers.q1); //match evening type answers to have lower score
        score += this.reverseScore5(qAnswers.q2); //match evening type answers to have lower score
        score += qAnswers.q3;
        score += qAnswers.q4;
        score += qAnswers.q5;
        score += this.reverseScore4(qAnswers.q6); //match evening type answers to have lower score
        score += this.reverseScore5(qAnswers.q7); //match evening type answers to have lower score
        score += this.reverseScore4(qAnswers.q8); //match evening type answers to have lower score
        score += this.reverseScore4(qAnswers.q9); //match evening type answers to have lower score
        score += this.reverseScore4(qAnswers.q10); //match evening type answers to have lower score
        score += qAnswers.q11;
        score += this.reverseScore4(qAnswers.q12); //match evening type answers to have lower score
        score += this.reverseScore4(qAnswers.q13); //match evening type answers to have lower score
        return score;
    }
    //returns a short message based on the user's chronotype score
    getMessage(){
        var score = this.calculateScore();
        if(score === "NaN"){ //there is no score so no message
            return "";
        }
        //lower score indicate evening type and higher score indicate morning type
        if(score < 22)
            return "You are definitely an evening type (or a night owl as some would say)!";
        else if(score > 44)
            return "You are definitely a morning type (or a lark as some would say)!";
        else if(score < 33)
            return "You tend towards an evening type but fall somewhere in between a morning or evening type.";
        else
            return "You tend towards a morning type but fall somewhere in between a morning or evening type.";
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
                    <br/>

                    <h3 className="blueHeader">Chronotype Score: {this.calculateScore()}</h3>
                    <h4 className="blueHeader">{this.getMessage()}</h4>

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
