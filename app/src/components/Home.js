import React, {SyntheticEvent} from 'react';
import '../styles/home.css'
import HomeIcon from "./HomeIcon.js";
import {Link} from 'react-router-dom';
import logout from '../scripts/login'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Invalid User",
            image: ""
        };
    }
    // //get User profile information
    getUser() {
        fetch('sleepwebapp.wpi.edu:5000/user')
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                image: data.image
            }));
    }
    render(){
        this.getUser();
        return (
            <div id="homepage" className="row d-flex align-items-center">
                <div id="setting_link">
                    <div className="d-flex align-items-center">
                        <img className="profile_pic" src={this.state.image} alt=""/>
                        <h3 style={{color: "#7339AB", marginLeft: "10px"}}>Welcome {this.state.name}</h3>
                    </div>
                    <div>
                        <button id="logout_icon" onClick={logout}></button>
                        <Link to="/settings">
                            <div id="setting_icon" className="float-right"></div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <ul className="circle">
                        <li>
                            <Link to="/logSleep">
                                <HomeIcon spanID={"sleepIcon_h"}
                                          iconClass={"iconImages_h sleepIconImg"}
                                          iconInfo={"Log Your Sleep"}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/report">
                                <HomeIcon spanID={"reportIcon_h"}
                                          iconClass={"iconImages_h reportIconImg"}
                                          iconInfo={"Personal Report"}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/logging">
                            <HomeIcon spanID={"logIcon_h"}
                                      iconClass={"iconImages_h logIconImg_h"}
                                      iconInfo={"Log Your Exercise, Caffeine, & Stress"}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/mindfulnessModules">
                            <HomeIcon spanID={"mindIcon_h"}
                                      iconClass={"iconImages_h mindIconImg_h"}
                                      iconInfo={"Mindfulness Modules"}/>
                            </Link>
                        </li>
                        <li>
                            <Link to="personalityIntro">
                            <HomeIcon spanID={"perIcon"}
                                      iconClass={"iconImages_h perIconImg"}
                                      iconInfo={"Personality Test"}/>
                            </Link>
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
                        <div id="carouselExampleIndicators" className="carousel slide d-flex align-items-center" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item text-center active">
                                    <h2 className="whiteText">Fun Fact of the Day:</h2>
                                    <h3 className="whiteText">Did you know?</h3>
                                </div>
                                <div className="carousel-item text-center">
                                    <h2 className="whiteText">Weather Today: Bright and Sunny!</h2>
                                    <h4 className="whiteText">We suggest opening the blinds and/or curtains and let
                                        in some sunshine.</h4>
                                </div>
                                <div className="carousel-item text-center">
                                    <h2 className="whiteText">Suggestion of the Day:</h2>
                                    <h3 className="whiteText">Exams are coming up. Study hard but don't forget to
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
