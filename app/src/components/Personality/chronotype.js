import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";
import swal from 'sweetalert'

class Chronotype extends React.Component {
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
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

    submitChrono(){
        var ele = document.getElementsByTagName('input');
        let values = [];
        for(let i = 0; i < ele.length; i++) {
            if(ele[i].type="radio") {
                if(ele[i].checked) {
                    console.log(ele[i].name + ": " + ele[i].value);
                    values.push(ele[i].value);
                }
            }
        }
        if(values.length === 13){
            const data = JSON.stringify({
                q1: values[0],
                q2: values[1],
                q3: values[2],
                q4: values[3],
                q5: values[4],
                q6: values[5],
                q7: values[6],
                q8: values[7],
                q9: values[8],
                q10: values[9],
                q11: values[10],
                q12: values[11],
                q13: values[12],
            });
            fetch('http://sleepwebapp.wpi.edu:5000/submitChronoAnswers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(r => {
                console.log("Submitted Chronotype Quiz", r.status);
                window.open("http://sleepwebapp.wpi.edu:3000/chronoResults", "_self");
            })
        }
        else{
            swal({
                title: "Please make sure all questions are answers and submit again",
                icon: "error"
            })
        }
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
            <div className = "content chronotype2" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div style={containerStyle} className="inner" id="page-wrap">
                    <h1 className="blueHeader">Chronotype Survey</h1>
                    <hr className="hr-settings"/>
                    <h5>
                        Find where you fall on the scale from morning to evening
                        type by answering the questions below
                    </h5><br/>

                    <form id="chronotype" method="post">
                        <div id="q1" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    1. Considering your own "feeling best" rhythm, at what time
                                    would you get up if you were entirely free to plan your day?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques1" value="1" id="ans1A" required/>
                                    <label for="ans1A">5:00-6:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques1" value="2" id="ans1B"/>
                                    <label for="ans1B">6:30-7:45 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques1" value="3" id="ans1C"/>
                                    <label for="ans1C">7:45-9:45 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques1" value="4" id="ans1D"/>
                                    <label for="ans1D">9:45-11:00 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques1" value="5" id="ans1E"/>
                                    <label for="ans1E">11:00 a.m.-12:00 (noon)</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q2" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    2. Considering your only "feeling best" rhythm, at what time would
                                    you go to bed if you were entirely free to plan your evening?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques2" value="1" id="ans2A" required/>
                                    <label for="ans2A">8:00-9:00 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques2" value="2" id="ans2B"/>
                                    <label for="ans2B">9:00-10:15 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques2" value="3" id="ans2C"/>
                                    <label for="ans2C">10:15 p.m.-12:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques2" value="4" id="ans2D"/>
                                    <label for="ans2D">12:30 a.m.-1:45 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques2" value="5" id="ans2E"/>
                                    <label for="ans2E">1:45 a.m.-3:00 a.m</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q3" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    3. Assuming normal circumstance, how easy do you find
                                    getting up in the morning?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques3" value="1" id="ans3A" required/>
                                    <label for="ans3A">Not at all easy</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques3" value="2" id="ans3B"/>
                                    <label for="ans3B">Slightly easy</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques3" value="3" id="ans3C"/>
                                    <label for="ans3C">Fairly easy</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques3" value="4" id="ans3D"/>
                                    <label for="ans3D">Very easy</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q4" class="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    4. How alert do you feel during the first half
                                    hour after having awakened in the morning?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques4" value="1" id="ans4A" required/>
                                    <label for="ans4A">Not at all alert</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques4" value="2" id="ans4B"/>
                                    <label for="ans4B">Slightly alert</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques4" value="3" id="ans4C"/>
                                    <label for="ans4C">Fairly alert</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques4" value="4" id="ans4D"/>
                                    <label for="ans4D">Very alert</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q5" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    5. During the first half hour after having awakened in the
                                    morning, how tired do you feel?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques5" value="1" id="ans5A" required/>
                                    <label for="ans5A">Very tired</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques5" value="2" id="ans5B"/>
                                    <label for="ans5B">Fairly tired</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques5" value="3" id="ans5C"/>
                                    <label for="ans5C">Fairly refreshed</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques5" value="4" id="ans5D"/>
                                    <label for="ans5D">Very refreshed</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q6" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    6. You have decided to engage in some physical exercise. A friend suggests
                                    that you do this one hour twice a week and the best time for him is
                                    7:00-8:00 a.m. Bearing in mind nothing else but your own "feeling best"
                                    rhythm, how do you think you would perform?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques6" value="1" id="ans6A" required/>
                                    <label for="ans6A">Would be in good form</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques6" value="2" id="ans6B"/>
                                    <label for="ans6B">Would be in a reasonable form</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques6" value="3" id="ans6C"/>
                                    <label for="ans6C">Would find it difficult</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques6" value="4" id="ans6D"/>
                                    <label for="ans6D">Would find it very difficult</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q7" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    7. At what time in the evening do you feel tired
                                    and, as a result, in need of sleep?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques7" value="1" id="ans7A" required/>
                                    <label for="ans1A">8:00-9:00 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques7" value="2" id="ans7B"/>
                                    <label for="ans7B">9:00-10:15 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques7" value="3" id="ans7C"/>
                                    <label for="ans7C">10:15 p.m.-12:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques7" value="4" id="ans7D"/>
                                    <label for="ans7D">12:30 a.m.-1:45 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques7" value="5" id="ans7E"/>
                                    <label for="ans7E">1:45 a.m.-3:00 a.m</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q8" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    8. You wish to be at your peak performance for a test which
                                    you know is going to be mentally exhasting and lasting for
                                    two hours. You are entirely free to plan your day, and considering
                                    only you own "feeling best" rhythm, which ONE of the four testing
                                    times would you choose?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques8" value="1" id="ans8A" required/>
                                    <label for="ans8A">8:00-10:00 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques8" value="2" id="ans8B"/>
                                    <label for="ans8B">11:00 a.m.-1:00 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques8" value="3" id="ans8C"/>
                                    <label for="ans8C">3:00-5:00 p.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques8" value="4" id="ans8D"/>
                                    <label for="ans8D">7:00-9:00 p.m</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q9" class="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    9. One hears about "morning" and "evening" types of people.
                                    Which ONE of these types do you consider yourself to be?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques9" value="1" id="ans9A" required/>
                                    <label for="ans9A">Definitively a morning type</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques9" value="2" id="ans9B"/>
                                    <label for="ans9B">More a morning than an evening type</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques9" value="3" id="ans9C"/>
                                    <label for="ans9C">More an evening than a morning type</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques9" value="4" id="ans9D"/>
                                    <label for="ans9D">Definitively an evening type</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q10" class="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    10. When would you prefer to rise (provided you have a full day's
                                    work - 8 hours) if you were totally free to arrange your time?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques10" value="1" id="ans10A" required/>
                                    <label for="ans10A">Before 6:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques10" value="2" id="ans10B"/>
                                    <label for="ans10B">6:30-7:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques10" value="3" id="ans10C"/>
                                    <label for="ans10C">7:30-8:30 a.m</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques10" value="4" id="ans10D"/>
                                    <label for="ans10D">8:30 a.m. or later</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q11" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    11. If you always had to rise at 6:00 a.m.,
                                    what do you think it would be like?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques11" value="1" id="ans11A" required/>
                                    <label for="ans11A">Very difficult and unpleasant</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques11" value="2" id="ans11B"/>
                                    <label for="ans11B">Rather difficult and unpleasant</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques11" value="3" id="ans11C"/>
                                    <label for="ans11C">A little unpleasant but no great problem</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques11" value="4" id="ans11D"/>
                                    <label for="ans11D">Easy and not unpleasant</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q12" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    12. How long a time does it usually take before you
                                    "recover your senses" in the morning after rising
                                    from a night's sleep?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques12" value="1" id="ans12A" required/>
                                    <label for="ans12A">0-10 minutes</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques12" value="2" id="ans12B"/>
                                    <label for="ans12B">11-20 minutes</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques12" value="3" id="ans12C"/>
                                    <label for="ans12C">21-40 minutes</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques12" value="4" id="ans12D"/>
                                    <label for="ans12D">more than 40 minutes</label>
                                </div>
                            </fieldset>
                        </div>
                        <br/>
                        <div id="q13" className="row">
                            <fieldset>
                                <h5 className="blueHeader">
                                    13. Please indicate to what extent you are a morning
                                    or evening active individual?
                                </h5>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques13" value="1" id="ans13A" required/>
                                    <label for="ans13A">Pronounced morning active (morning alert and evening tired)</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques13" value="2" id="ans13B"/>
                                    <label for="ans13B">To some extent, morning active</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques13" value="3" id="ans13C"/>
                                    <label for="ans13C">To some extent, evening active</label>
                                </div>
                                <div>
                                    <input className="lmh_options" type="radio" name="ques13" value="4" id="ans13D"/>
                                    <label for="ans13D">Pronounced evening active (morning tired and evening alert)</label>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                    <button className="btn" onClick={this.submitChrono}>Submit</button>
                </div>
            </div>
        );
    };
}
export default Chronotype;
