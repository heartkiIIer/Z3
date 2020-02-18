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
    reverseScore5(value){
        if(value === 5)
            return 1;
        else if(value === 4)
            return 2;
        else if(value === 2)
            return 4;
        else
            return 5;
    }

    calculateScore(){
        if(this.state.chronoAnswers.length === 0){
            return "NaN";
        }
        var qAnswers = this.state.chronoAnswers[this.state.chronoAnswers.length-1];
        console.log(qAnswers);
        var score = this.reverseScore5(qAnswers.q1);
        score += this.reverseScore5(qAnswers.q2);
        score += qAnswers.q3;
        score += qAnswers.q4;
        score += qAnswers.q5;
        score += this.reverseScore4(qAnswers.q6);
        score += this.reverseScore5(qAnswers.q7);
        score += this.reverseScore4(qAnswers.q8);
        score += this.reverseScore4(qAnswers.q9);
        score += this.reverseScore4(qAnswers.q10);
        score += qAnswers.q11;
        score += this.reverseScore4(qAnswers.q12);
        score += this.reverseScore4(qAnswers.q13);

        console.log(this.reverseScore5(qAnswers.q1));
        console.log(this.reverseScore5(qAnswers.q2));
        console.log(qAnswers.q3);
        console.log(qAnswers.q4);
        console.log(qAnswers.q5);
        console.log(this.reverseScore4(qAnswers.q6));
        console.log(this.reverseScore5(qAnswers.q7));
        console.log(this.reverseScore4(qAnswers.q8));
        console.log(this.reverseScore4(qAnswers.q9));
        console.log(this.reverseScore4(qAnswers.q10));
        console.log(qAnswers.q11);
        console.log(this.reverseScore4(qAnswers.q12));
        console.log(this.reverseScore4(qAnswers.q13));


        return score;
    }

    getMessage(){
        var score = this.calculateScore();
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
