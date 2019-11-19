import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';

/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class PersonalityIntro extends React.Component {

    render(){
        return (
            <div class = "content personality">
                <div class = "inner">
                    <h1 className="blueHeader">What is Your Personality?</h1>
                    <hr className="hr-settings"/>
                    <h2 className="blueHeader">What does "Big Five Personality" mean?</h2>
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
                        <button>Personailty Test</button>
                    </Link>

                    <br/><br/><br/><br/>

                    <h1 className="blueHeader">What is Your Chonotype?</h1>
                    <hr className="hr-settings"/>
                    <h5>
                        Find out whether you are more of a morning person or a night person
                        with this quiz!
                    </h5>
                    <Link to="/chronotype">
                        <button>Chronotype Test</button>
                    </Link>
                </div>

            </div>
        );
    };
}
export default PersonalityIntro;
