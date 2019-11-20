import React from 'react';
import "../../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class Chronotype extends React.Component {

    render(){
        return (
            <div class = "content chronotype">
                <div class = "inner">
                    <div class="grid-x align-center">
                        <h3 class="text-center">Chronotype Survey</h3>
                        <h5>Find where you fall on the scale from morning to evening type by answering the questions below</h5>
                    </div>

                    <div class="grid-x grid-x-margin align-middle">
                        <div class="large-2 cell">
                            <input id="backBtn" name="backBtn" type="button" class="button large expanded default-button-login shadow-d2" value="Back"/>
                        </div>

                        <form id="chronotype" method="post" class="large-6 large-offset-1 cell">
                            <input type="hidden" id="currQues" name="currQues" value="0"/>
                                <div id="q1" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>1. Considering your own "feeling best" rhythm, at what time would you get up if you were entirely free to plan your day?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques1" value="1" id="ans1A" required/><label for="ans1A">5:00-6:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques1" value="2" id="ans1B"/><label for="ans1B">6:30-7:45 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques1" value="3" id="ans1C"/><label for="ans1C">7:45-9:45 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques1" value="4" id="ans1D"/><label for="ans1D">9:45-11:00 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques1" value="5" id="ans1E"/><label for="ans1E">11:00 a.m.-12:00 (noon)</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q2" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>2. Considering your only "feeling best" rhythm, at what time would you go to bed if you were entirely free to plan your evening?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques2" value="1" id="ans2A" required/><label for="ans2A">8:00-9:00 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques2" value="2" id="ans2B"/><label for="ans2B">9:00-10:15 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques2" value="3" id="ans2C"/><label for="ans2C">10:15 p.m.-12:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques2" value="4" id="ans2D"/><label for="ans2D">12:30 a.m.-1:45 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques2" value="5" id="ans2E"/><label for="ans2E">1:45 a.m.-3:00 a.m</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q3" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>3. Assuming normal circumstance, how easy do you find getting up in the morning?</legend>
                                        <div class="large-6 cell">
                                            <input type="radio" name="ques3" value="1" id="ans3A" required/><label for="ans3A">Not at all easy</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques3" value="2" id="ans3B"/><label for="ans3B">Slightly easy</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques3" value="3" id="ans3C"/><label for="ans3C">Fairly easy</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques3" value="4" id="ans3D"/><label for="ans3D">Very easy</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q4" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>4. How alert do you feel during the first half hour after having awakened in the morning?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques4" value="1" id="ans4A" required/><label for="ans4A">Not at all alert</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques4" value="2" id="ans4B"/><label for="ans4B">Slightly alert</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques4" value="3" id="ans4C"/><label for="ans4C">Fairly alert</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques4" value="4" id="ans4D"/><label for="ans4D">Very alert</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q5" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>5. During the first half hour after having awakened in the morning, how tired do you feel?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques5" value="1" id="ans5A" required/><label for="ans5A">Very tired</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques5" value="2" id="ans5B"/><label for="ans5B">Fairly tired</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques5" value="3" id="ans5C"/><label for="ans5C">Fairly refreshed</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques5" value="4" id="ans5D"/><label for="ans5D">Very refreshed</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q6" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>6. You have decided to engage in some physical exercise. A friend suggests that you do this one hour twice a week and the best time for him is 7:00-8:00 a.m. Bearing in mind nothing else but your own "feeling best" rhythm, how do you think you would perform?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques6" value="1" id="ans6A" required/><label for="ans6A">Would be in good form</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques6" value="2" id="ans6B"/><label for="ans6B">Would be in a reasonable form</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques6" value="3" id="ans6C"/><label for="ans6C">Would find it difficult</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques6" value="4" id="ans6D"/><label for="ans6D">Would find it very difficult</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q7" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>7. At what time in the evening do you feel tired and, as a result, in need of sleep?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques7" value="1" id="ans7A" required/><label for="ans1A">8:00-9:00 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques7" value="2" id="ans7B"/><label for="ans7B">9:00-10:15 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques7" value="3" id="ans7C"/><label for="ans7C">10:15 p.m.-12:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques7" value="4" id="ans7D"/><label for="ans7D">12:30 a.m.-1:45 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques7" value="5" id="ans7E"/><label for="ans7E">1:45 a.m.-3:00 a.m</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q8" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>8. You wish to be at your peak performance for a test which you know is going to be mentally exhasting and lasting for two hours. You are entirely free to plan your day, and considering only you own "feeling best" rhythm, which ONE of the four testing times would you choose?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques8" value="1" id="ans8A" required/><label for="ans8A">8:00-10:00 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques8" value="2" id="ans8B"/><label for="ans8B">11:00 a.m.-1:00 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques8" value="3" id="ans8C"/><label for="ans8C">3:00-5:00 p.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques8" value="4" id="ans8D"/><label for="ans8D">7:00-9:00 p.m</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q9" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>9. One hears about "morning" and "evening" types of people. Which ONE of these types do you consider yourself to be?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques9" value="1" id="ans9A" required/><label for="ans9A">Definitively a morning type</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques9" value="2" id="ans9B"/><label for="ans9B">More a morning than an evening type</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques9" value="3" id="ans9C"/><label for="ans9C">More an evening than a morning type</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques9" value="4" id="ans9D"/><label for="ans9D">Definitively an evening type</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q10" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>10. When would you prefer to rise (provided you have a full day's work - 8 hours) if you were totally free to arrange your time?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques10" value="1" id="ans10A" required/><label for="ans10A">Before 6:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques10" value="2" id="ans10B"/><label for="ans10B">6:30-7:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques10" value="3" id="ans10C"/><label for="ans10C">7:30-8:30 a.m</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques10" value="4" id="ans10D"/><label for="ans10D">8:30 a.m. or later</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q11" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>11. If you always had to rise at 6:00 a.m., what do you think it would be like?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques11" value="1" id="ans11A" required/><label for="ans11A">Very difficult and unpleasant</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques11" value="2" id="ans11B"/><label for="ans11B">Rather difficult and unpleasant</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques11" value="3" id="ans11C"/><label for="ans11C">A little unpleasant but no great problem</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques11" value="4" id="ans11D"/><label for="ans11D">Easy and not unpleasant</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q12" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>12. How long a time does it usually take before you "recover your senses" in the morning after rising from a night's sleep?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques12" value="1" id="ans12A" required/><label for="ans12A">0-10 minutes</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques12" value="2" id="ans12B"/><label for="ans12B">11-20 minutes</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques12" value="3" id="ans12C"/><label for="ans12C">21-40 minutes</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques12" value="4" id="ans12D"/><label for="ans12D">more than 40 minutes</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div id="q13" class="row question">
                                    <fieldset class="large-12 cell">
                                        <legend>13. Please indicate to what extent you are a morning or evening active individual?</legend>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques13" value="1" id="ans13A" required/><label for="ans13A">Pronounced morning active (morning alert and evening tired)</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques13" value="2" id="ans13B"/><label for="ans13B">To some extent, morning active</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques13" value="3" id="ans13C"/><label for="ans13C">To some extent, evening active</label>
                                        </div>
                                        <div class="large-12 cell">
                                            <input type="radio" name="ques13" value="4" id="ans13D"/><label for="ans13D">Pronounced evening active (morning tired and evening alert)</label>
                                        </div>
                                    </fieldset>
                                </div>
                        </form>

                        <div class="large-2 large-offset-1 cell" id="nextDiv">
                            <input id="nextBtn" name="nextBtn" type="button" class="button large expanded default-button-login shadow-d2" value="Next"/>
                        </div>

                    </div>

                    <div class="grid-x">
                        <div class="progress" id="progressClass" role="progressbar" tabindex="0" aria-valuenow="50" aria-valuemin="0" aria-valuetext="50 percent" aria-valuemax="100">
                            <div id="progressBar" class="progress-meter"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default Chronotype;
