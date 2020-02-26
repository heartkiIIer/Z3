import React, {SyntheticEvent} from 'react';
import '../styles/home.css'
import HomeIcon from "./HomeIcon.js";
import {Link} from 'react-router-dom';
import logout from '../scripts/login'
import swal from 'sweetalert'
import weather from './weather'

//TODO
// call the checkSavedState to determine where to send them
// what is received is all the rows for that user that are missing a wakeup time
// the one with the highest entry_id is the most recent
// date is in postgres timestamp
// verify the date as yesterday or today if so -> logWake

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Invalid User",
            image: "",
            perMessage: {
                subject: "Personality and Chronotype:",
                message: "Take the two quizzes under Personality Test! \n We will make some reminder/suggestions based on your personality."
            },
            weather: null
        };
    }
    componentDidMount(){
        let currentComponent = this;
        this.getUser(currentComponent);
        this.getPersonalityBasedMessage(currentComponent);
        this.getWeather(currentComponent, "009");
    }

    // //get User profile information
    getUser(currentComponent) {
        fetch('http://sleepwebapp.wpi.edu:5000/user')
            .then(response => response.json())
            .then(data => currentComponent.setState({
                name: data.name,
                image: data.image
            }));
    }
    reverseScore4(value){
        if(value === 4)
            return 1;
        else if(value === 3)
            return 2;
        else if(value === 2)
            return 3;
        else
            return 4;
    }
    reverseScore5(value){
        if(value === 5)
            return 1;
        else if(value === 4)
            return 2;
        else if(value === 3)
            return 3;
        else if(value === 2)
            return 4;
        else
            return 5;
    }
    calculateScore(chronoAnswers){
        if(chronoAnswers.length === 0){
            return null;
        }
        var qAnswers = chronoAnswers[chronoAnswers.length-1];
        var score = this.reverseScore5(qAnswers.q1);
        score += this.reverseScore5(qAnswers.q2);
        score += qAnswers.q3;
        score += qAnswers.q4;
        score += qAnswers.q5;
        score += this.reverseScore4(qAnswers.q6);
        score += this.reverseScore5(qAnswers.q7);
        score += this.reverseScore4(qAnswers.q8);
        score += this.reverseScore4(qAnswers.q9);
        score += this.reverseScore4(qAnswers.q10);
        score += qAnswers.q11;
        score += this.reverseScore4(qAnswers.q12);
        score += this.reverseScore4(qAnswers.q13);
        return score;
    }
    getRecentPersonality(personalityResults){
        if(personalityResults !== null){
            return personalityResults[personalityResults.length-1];
        }
        return null
    }

    getPersonalityBasedMessage(currentComponent){
        fetch('http://sleepwebapp.wpi.edu:5000/getPersonality', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then( r => {
            return r.json();
        }).then(r => {
            let perScore = currentComponent.getRecentPersonality(r);
            fetch('http://sleepwebapp.wpi.edu:5000/getChronoAnswers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then( r => {
                return r.json();
            }).then(r => {
                var chrono = currentComponent.calculateScore(r);
                if(typeof perScore !== "undefined" && chrono !== null){
                    const data = JSON.stringify({
                        chrono: chrono,
                        open : perScore.openness,
                        cons : perScore.conc,
                        extr: perScore.extraver,
                        agree: perScore.agree,
                        neuro: perScore.neuro
                    });
                    fetch('http://sleepwebapp.wpi.edu:5000/getMessage', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then( r => {
                        return r.json();
                    }).then(r => {
                        currentComponent.setState({perMessage : r});
                    });
                }
            });

        });
    }
    getWeather(currentComponent, zipcode){
        let key = "4e527c0cbe65468e44c55d0cb68d6b16";
        fetch('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid='+key
        ).then( r => {
            return r.json();
        }).then(r => {
            currentComponent.setState({weather: r});
        });
    }
    displayWeather(){
        if(this.state.weather !== null){
            if(this.state.weather.cod !== 200)
                return <h3 className="whiteText">{this.state.weather.message}</h3>
            return <weather
                city={this.state.weather.name}
                weather={this.state.weather.weather[0]}
                main={this.state.weather.main}
                wind={this.state.weather.wind}
            />
        }
    }
    changeZip(){
        swal({
            title: "Weather Location",
            text: "Please enter the zip code of the location you would like the weather for: ",
            content: {
                element: "input",
                attributes: {
                    placeholder: "03741",
                    type: "text",
                }
            },
            buttons: true,
        }).then((zipcode) => {
            this.getWeather(this, zipcode);
        })
    }

    render(){
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
                                    <h4 className="whiteText">Did you know?</h4>
                                </div>
                                <div className="carousel-item text-center">
                                    {this.displayWeather()}
                                    <button style={{background: "transparent", border: "2px solid white"}} onClick={this.changeZip.bind(this)}>Change Location</button>
                                </div>
                                <div className="carousel-item text-center">
                                    <h2 className="whiteText">{this.state.perMessage.subject}</h2>
                                    <h4 className="whiteText">{this.state.perMessage.message}</h4>
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
