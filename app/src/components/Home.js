import React from 'react';
import '../styles/home.css'
import HomeIcon from "./HomeIcon.js";

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row d-flex align-items-center">
                <div class="col-lg-6">
                    <div id="sleepDuration" className="d-flex align-items-center justify-content-center">
                        <div>
                            <h1>Your Sleep Hours:</h1>
                            <h1>8 Hours</h1>
                        </div>
                    </div>
                    <ul className="circle">
                        <li>
                            <HomeIcon spanID={"sleepIcon_h"}
                                      iconClass={"iconImages_h sleepIconImg"}
                                      iconInfo={"Log Your Sleep"}/>
                        </li>
                        <li>
                            <HomeIcon spanID={"logIcon_h"}
                                      iconClass={"iconImages_h logIconImg_h"}
                                      iconInfo={"Log Your Exercise, Caffeine, and Stress Level"}/>
                        </li>
                        <li>
                            <HomeIcon spanID={"mindIcon_h"}
                                      iconClass={"iconImages_h mindIconImg_h"}
                                      iconInfo={"Mindfulness Modules"}/>
                        </li>
                        <li>
                            <HomeIcon spanID={"perIcon"}
                                      iconClass={"iconImages_h perIconImg"}
                                      iconInfo={"Personality Test"}/>
                        </li>
                        <li>
                            <HomeIcon spanID={"bedIcon"}
                                      iconClass={"iconImages_h bedIconImg"}
                                      iconInfo={"Your Bedtime Routine"}/>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div id="dailyInfo">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <h2>Fun Fact of the Day:</h2>
                                    <h3>Did you know?</h3>
                                </div>
                                <div className="carousel-item">
                                    <h2>Weather Today: Bright and Sunny!</h2>
                                    <h4 style={{color: "white"}}>We suggest opening the blinds and/or curtains and let
                                        in some sunshine.</h4>
                                </div>
                                <div className="carousel-item">
                                    <h2>Suggestion of the Day:</h2>
                                    <h3>Exams are coming up. Study hard but don't forget to
                                        get enough hours of sleep!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default Home;
