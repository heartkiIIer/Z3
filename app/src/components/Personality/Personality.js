import React from 'react';
import "../../styles/ItsBedtime.css";

class Personality extends React.Component{
    render(){
        return (
            <div className="content">
                <div className="inner">
                    <div class="grid-container">
                        <div class="grid-x">
                            <div class="cell small-12">
                                <h2><b>Report Your Personality Scores</b></h2>
                            </div>
                        </div>
                        <h5 class="text-center">Use the results from the Big 5 quiz to fill in your scores below.</h5>

                        <form id="personality" method="post">

                            <div class="grid-x align-center">
                                <div class="small-12 cell">
                                    <h5><span data-tooltip aria-haspopup="true" class="has-tip" title="originality, open-mindedness, and creativity">Openness</span></h5>
                                </div>
                                <div class="small-12 large-3 cell">
                                    <div class="input-group text-center">
                                        <input type="radio" class="input-group-field" name="open" value="low" id="low_o"/><label for="low_o">Low</label>
                                            <input type="radio" class="input-group-field" name="open" value="medium" id="medium_o"/><label for="medium_o">Medium</label>
                                                <input type="radio" class="input-group-field" name="open" value="high" id="high_o"/><label for="high_o">High</label>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-x align-center">
                                <div class="small-12 cell">
                                    <h5><span data-tooltip aria-haspopup="true" class="has-tip" title="reliable, well-organized, and hardworking">Conscientiousness</span></h5>
                                </div>
                                <div class="small-12 large-3 cell">
                                    <div class="input-group text-center">
                                        <input type="radio" class="input-group-field" name="cons" value="low" id="low_c"/><label for="low_c">Low</label>
                                            <input type="radio" class="input-group-field" name="cons" value="medium" id="medium_c"/><label for="medium_c">Medium</label>
                                                <input type="radio" class="input-group-field" name="cons" value="high" id="high_c"/><label for="high_c">High</label>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-x align-center">
                                <div class="small-12 cell">
                                    <h5><span data-tooltip aria-haspopup="true" class="has-tip" title="sociable, affectionate, cheerful, and assertive">Extraversion</span></h5>
                                </div>
                                <div class="small-12 large-3 cell">
                                    <div class="input-group text-center">
                                        <input type="radio" class="input-group-field" name="extr" value="low" id="low_e"/><label for="low_e">Low</label>
                                            <input type="radio" class="input-group-field" name="extr" value="medium" id="medium_e"/><label for="medium_e">Medium</label>
                                                <input type="radio" class="input-group-field" name="extr" value="high" id="high_e"/><label for="high_e">High</label>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-x align-center">
                                <div class="small-12 cell">
                                    <h5><span data-tooltip aria-haspopup="true" class="has-tip" title="softhearted, sympathetic, and trusting">Agreeableness</span></h5>
                                </div>
                                <div class="small-12 large-3 cell">
                                    <div class="input-group text-center">
                                        <input type="radio" class="input-group-field" name="agree" value="low" id="low_a"/><label for="low_a">Low</label>
                                            <input type="radio" class="input-group-field" name="agree" value="medium" id="medium_a"/><label for="medium_a">Medium</label>
                                                <input type="radio" class="input-group-field" name="agree" value="high" id="high_a"/><label for="high_a">High</label>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-x align-center">
                                <div class="small-12 cell">
                                    <h5><span data-tooltip aria-haspopup="true" class="has-tip" title="self-consciousness, insecurity, and tendency to worry">Neuroticism</span></h5>
                                </div>
                                <div class="small-12 large-3 cell">
                                    <div class="input-group text-center">
                                        <input type="radio" class="input-group-field" name="neur" value="low" id="low_n"/><label for="low_n">Low</label>
                                            <input type="radio" class="input-group-field" name="neur" value="medium" id="medium_n"/><label for="medium_n">Medium</label>
                                                <input type="radio" class="input-group-field" name="neur" value="high" id="high_n"/><label for="high_n">High</label>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div class="grid-x align-center">
                            <div class="small-12 large-6 cell">
                                <input id="submit-personality" name="submit-personality" type="button" class="button large expanded default-button-login shadow-d2" value="Submit Personality Scores" style={{margin: "0 auto"}}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    };
}

export default Personality;