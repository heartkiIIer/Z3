import React from 'react';
import "../styles/ItsBedtime.css";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class PersonalityResults extends React.Component {

    render(){
        return (
            <div class = "content settings">
                <div class = "inner">
                    <div class="grid-container">
                        <div class="grid-x">
                            <div class="cell small-12">
                                <h2><b>Your Big 5 Personality Results</b></h2>
                            </div>
                        </div>

                        <div class="grid-x align-center">
                            <div class="small-12 cell text-center">
                                <h5><b>Openness</b></h5>
                                <p id="o_score">Score: <span>getOpenness</span></p>
                            </div>
                        </div>

                        <div class="grid-x align-center">
                            <div class="small-12 cell text-center">
                                <h5><b>Conscientiousness</b></h5>
                                <p id="c_score">Score: <span>getConscientiousness</span></p>
                            </div>
                        </div>
                        <div class="grid-x align-center">
                            <div class="small-12 cell text-center">
                                <h5><b>Extraversion</b></h5>
                                <p id="e_score">Score: <span>getExtraversion</span></p>
                            </div>
                        </div>
                        <div class="grid-x align-center">
                            <div class="small-12 cell text-center">
                                <h5><b>Agreeableness</b></h5>
                                <p id="a_score">Score: <span>getAgreeableness</span></p>
                            </div>
                        </div>
                        <div class="grid-x align-center">
                            <div class="small-12 cell text-center">
                                <h5><b>Neuroticism</b></h5>
                                <p id="n_score">Score: <span>getNeuroticism</span></p>
                            </div>
                        </div>

                        <div class="grid-x">
                            <div class="small-12 medium-12 large-4 cell">
                                <input id="resubmit-pers" name="resubmit-pers" type="button" class="button large expanded default-button-login shadow-d2" value="Retake Personality Test"/>
                            </div>
                            <div class="small-12 medium-12 large-4 large-offset-4 cell">
                                <input id="return-dashboard" name="return-dashboard" type="button" class="button large expanded default-button-login shadow-d2" value="Done"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default PersonalityResults;
