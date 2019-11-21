import React, {SyntheticEvent} from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';

class PersonalityIntro extends React.Component {
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
                    <h1 className="blueHeader">What is Your Personality?</h1>
                    <hr className="hr-settings"/>
                    <h3 className="blueHeader">What does "Big Five Personality" mean?</h3>
                    <h5>
                        The Big Five encompasses five characteristics: openness, conscientiousness,
                        extraversion, agreeableness, and neuroticism.<br/><br/>
                        Take this FREE quiz. It will tell you how open, conscientious,
                        agreeable, extraverted, and neurotic you are. This will help
                        personalize the Z<sup>3</sup> app specifically for you!
                        When you are done taking the quiz, report your scores for the
                        Big Five Personality Test
                    </h5>
                    <Link to="/personality">
                        <button className="test_btn person_img shadow p-3 mb-5" onClick={(e) => this.openURL(e)}>Personailty Test</button>
                    </Link>

                    <br/><br/>

                    <h1 className="blueHeader">What is Your Chonotype?</h1>
                    <hr className="hr-settings"/>
                    <h3 className="blueHeader">What does "Chronotype" mean?</h3>
                    <h5>
                        Chronotype tells you whether you are a morning or evening type. A
                        short survey will help you find out your chronotype!
                    </h5>
                    <Link to="/chronotype">
                        <button className="test_btn chrono_img shadow p-3 mb-5">Chronotype Test</button>
                    </Link>
                </div>

            </div>
        );
    };
}
export default PersonalityIntro;