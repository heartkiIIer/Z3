import React from 'react';
import "../styles/ItsBedtime.css";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class PersonalityIntro extends React.Component {

    render(){
        return (
            <div class = "content settings">
                <div class = "inner">
                    <div class="grid-container">
                        <div class="grid-x align-center">
                            <div class="cell small-12">
                                <h2><b>What is your personality?</b></h2>
                            </div>
                        </div>

                        <h5 class="text-center">Take this FREE quiz. It will tell you how open, conscientious, agreeable, extraverted, and neurotic you are. This will help personalize the SleepHealth app specifically for you!</h5>
                        <div class="small-12 large-6 center cell">
                            <input id="take-quiz" name="take-quiz" type="button" class="button large expanded default-button-login shadow-d2" value="Take the Big 5 Personality Test"/>
                        </div>
                        <h5 class="text-center">When you are done taking the quiz, click on the button below to report your scores for the Big Five Personality Test</h5>
                        <div class="small-12 large-6 cell">
                            <input id="report-personality" name="report-personality" type="button" class="button large expanded default-button-login shadow-d2" value="Report Personality Scores"/>
                        </div>

                    </div>
                </div>

            </div>
        );
    };
}
export default PersonalityIntro;
