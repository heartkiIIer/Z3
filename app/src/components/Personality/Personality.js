import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";

class Personality extends React.Component{
    render(){
        return (
            <div className="content personality" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div className="inner" id="page-wrap">
                    <h1 className="blueHeader">Your Personality Scores</h1>
                    <hr className="hr-settings"/>
                    <h5>
                        Use the results from the Big 5 quiz to fill
                        in your scores below.
                    </h5>
                    <br/>
                    <form id="personality" method="post">
                        <h5 className="blueHeader">Openness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="low" id="low_o"/>
                                <label for="low_o">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="medium" id="medium_o"/>
                                <label for="medium_o">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="high" id="high_o"/>
                                <label for="high_o">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Conscientiousness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="low" id="low_c"/>
                                <label for="low_c">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="medium" id="medium_c"/>
                                <label for="medium_c">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="high" id="high_c"/>
                                <label for="high_c">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Extraversion</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="low" id="low_e"/>
                                <label for="low_e">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="medium" id="medium_e"/>
                                <label for="medium_e">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="high" id="high_e"/>
                                <label for="high_e">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Agreeableness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="low" id="low_a"/>
                                <label for="low_a">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="medium" id="medium_a"/>
                                <label for="medium_a">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="high" id="high_a"/>
                                <label for="high_a">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Neuroticism</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="low" id="low_n"/>
                                <label for="low_n">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="medium" id="medium_n"/>
                                <label for="medium_n">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="high" id="high_n"/>
                                <label for="high_n">High</label>
                            </div>
                        </div>

                    </form>
                    <Link to="/personalityResults">
                        <button className="btn">Submit Personality Scores</button>
                    </Link>
                </div>
                </div>
            </div>
        );
    };
}

export default Personality;