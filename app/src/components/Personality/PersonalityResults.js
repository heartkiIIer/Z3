import React, {SyntheticEvent} from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';

class PersonalityResults extends React.Component {
    constructor(props) {
        super(props);
        this.openURL = this.openURL.bind(this);
    }

    openURL(event: SyntheticEvent<any>): void {
        window.open("https://www.truity.com/test/big-five-personality-test", "_blank", "width=1000, height=600");
    }

    render(){
        return (
            <div className = "content personality">
                <div className = "inner">
                    <h1 className="blueHeader">Your Big 5 Personality Results</h1>
                    <hr className="hr-settings"/>

                    <h5 className="blueHeader"><b>Openness</b></h5>
                    <p id="o_score">Score: <span>getOpenness</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Conscientiousness</b></h5>
                    <p id="c_score">Score: <span>getConscientiousness</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Extraversion</b></h5>
                    <p id="e_score">Score: <span>getExtraversion</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Agreeableness</b></h5>
                    <p id="a_score">Score: <span>getAgreeableness</span></p>
                    <br/>
                    <h5 className="blueHeader"><b>Neuroticism</b></h5>
                    <p id="n_score">Score: <span>getNeuroticism</span></p>

                    <Link to="/personality">
                        <button className="btn" onClick={(e) => this.openURL(e)}>Retake Personality Test</button>
                    </Link><br/>
                    <Link to="/personalityIntro">
                        <button className="btn">Done</button>
                    </Link>

                </div>
            </div>
        );
    };
}
export default PersonalityResults;
