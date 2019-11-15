import React from 'react';
import '../styles/home.css'
import HomeIcon from "./HomeIcon.js";
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row d-flex align-items-center">
                <div class="col-lg-6">
                    <ul className="circle">
                        <li>
                            <Link to="/logSleep">
                                <HomeIcon spanID={"sleepIcon_h"}
                                          iconClass={"iconImages_h sleepIconImg"}
                                          iconInfo={"Log Your Sleep"}/>
                            </Link>
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
                            <Link to="/bedtimeRoutine">
                                <HomeIcon spanID={"bedIcon"}
                                          iconClass={"iconImages_h bedIconImg"}
                                          iconInfo={"Your Bedtime Routine"}/>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div id="dailyInfo">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
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
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default Home;
