import React from 'react';
import '../styles/home.css'
import HomeIcon from "./HomeIcon.js";
import {Link} from 'react-router-dom';
import {logout, getUserID, getUserImage, getUserName} from '../scripts/login'
import swal from 'sweetalert'
import WeatherHome from './weather'
import {OAUTH} from "../scripts/FitbitScript";

const h2 = {
    fontSize: '22px !important'
}

const h3 = {
    fontSize: '18px !important'
}

//TODO
// call the checkSavedState to determine where to send them
// what is received is all the rows for that user that are missing a wakeup time
// the one with the highest entry_id is the most recent
// date is in postgres timestamp
// verify the date as yesterday or today if so -> logWake

class Home extends React.Component {
    constructor(props) {
        super(props);
        if (window.innerWidth >= 775) {
            this.state = {
                name: "",
                image: "",
                perMessage: { //default message if the user has not taken the personality and chronotype quizzes
                    subject: ".  .  . ",
                    message: "Take the two quizzes under Personality Test! \n We will make some reminder/suggestions based on your personality."
                },
                weather: null,
                fitbit: false,
                asleep: false,
                zipcode: "01609"
            }
        } else {
            this.state = {
                name: "",
                image: "",
                perMessage: { //default message if the user has not taken the personality and chronotype quizzes
                    subject: "Personality and Chronotype:",
                    message: "Take the two quizzes under Personality Test! \n We will make some reminder/suggestions based on your personality."
                },
                weather: null,
                fitbit: false,
                asleep: false,
                zipcode: "01609"
            }
        }
    }
    componentDidMount(){
        let currentComponent = this;
        let idPromise = getUserID();
        //if no user signed in redirect them back to landing
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        });
        this.getUser(currentComponent);
        this.getPersonalityBasedMessage(currentComponent);
        this.getZipcode(currentComponent);
        this.getUseFitbit(currentComponent);
        this.getAsleep(currentComponent);
    }
    //get signed in user's display name and image from firebase
    getUser(currentComponent) {
        let namePromise = getUserName();
        namePromise.then(name=>{
            currentComponent.setState({ name : name })
        });

        let imgPromise = getUserImage();
        imgPromise.then(url=>{
            currentComponent.setState({ image : url })
        });
    }
    //takes in a value and sets the "opposite" number in a set of {1, 2, 3, 4}
    // for example if the input value is 1 the output value would be 4
    static reverseScore4(value){
        if(value === 4)
            return 1;
        else if(value === 3)
            return 2;
        else if(value === 2)
            return 3;
        else
            return 4;
    }
    //takes in a value and sets the "opposite" number in a set of {1, 2, 3, 4. 5}
    static reverseScore5(value){
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
    //takes the answers to the chronotype quiz and calculate the
    static calculateScore(chronoAnswers){
        if(chronoAnswers.length === 0){
            return null; //user has not taken the chronotype quiz, no answers stored in the database
        }
        //grabs the user's latest chronotype quiz results if user submitted multiple times
        var qAnswers = chronoAnswers[chronoAnswers.length-1];
        var score = Home.reverseScore5(qAnswers.q1); //match evening type answers to have lower score
        score += Home.reverseScore5(qAnswers.q2); //match evening type answers to have lower score
        score += qAnswers.q3;
        score += qAnswers.q4;
        score += qAnswers.q5;
        score += Home.reverseScore4(qAnswers.q6); //match evening type answers to have lower score
        score += Home.reverseScore5(qAnswers.q7); //match evening type answers to have lower score
        score += Home.reverseScore4(qAnswers.q8); //match evening type answers to have lower score
        score += Home.reverseScore4(qAnswers.q9); //match evening type answers to have lower score
        score += Home.reverseScore4(qAnswers.q10); //match evening type answers to have lower score
        score += qAnswers.q11;
        score += Home.reverseScore4(qAnswers.q12); //match evening type answers to have lower score
        score += Home.reverseScore4(qAnswers.q13); //match evening type answers to have lower score
        return score;
    }
    //return the user's latest personality scores if they submitted multiple times
    static getRecentPersonality(personalityResults){
        if(personalityResults !== null){
            return personalityResults[personalityResults.length-1];
        }
        return null
    }
    //get message based on personality and chronotype results (Holly's Personality reminders)
    getPersonalityBasedMessage(currentComponent){
        let idPromise = getUserID(); //get signed in user's ID
        idPromise.then(uid=>{
            const data = JSON.stringify({ uid: uid });
            //get personality results
            fetch('https://sleepwebapp.wpi.edu:5000/getPersonality', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                let perScore = Home.getRecentPersonality(r);
                //get chronotype results
                fetch('https://sleepwebapp.wpi.edu:5000/getChronoAnswers', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data
                }).then( r => {
                    return r.json();
                }).then(r => {
                    var chrono = Home.calculateScore(r);
                    if(typeof perScore !== "undefined" && chrono !== null){
                        const data = JSON.stringify({
                            chrono: chrono,
                            open : perScore.openness,
                            cons : perScore.conc,
                            extr: perScore.extraver,
                            agree: perScore.agree,
                            neuro: perScore.neuro
                        });
                        //get message based on chronotype and personality
                        fetch('https://sleepwebapp.wpi.edu:5000/getMessage', {
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

        });
    }

    getAsleep(currentComponent){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getAsleep', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length !== 0){
                    currentComponent.setState({asleep : r[0].asleep})
                }
            });
        });
    }

    setSleepState(){
        if(this.getAsleep()===true){
            return <Link to="/logSleep"><HomeIcon spanID={"sleepIcon_h"} iconClass={"iconImages_h sleepIconImg"} iconInfo={"Log Your Sleep"}/></Link>
        }
        else if(this.getAsleep() === false){
            return <Link to="/logWake"><HomeIcon spanID={"sleepIcon_h"} iconClass={"iconImages_h sleepIconImg"} iconInfo={"Log Your Sleep"}/></Link>
        }
        else{
            return <Link to="/logSleep"><HomeIcon spanID={"sleepIcon_h"} iconClass={"iconImages_h sleepIconImg"} iconInfo={"Log Your Sleep"}/></Link>
        }
    }

    //gets weather information from the weatheropen API
    getWeather(currentComponent, zipcode){
        let key = "018f2f13d72d615f6e4a3cd93e72b859"; //API specific Key
        //request basic weather data using zip code to determine a location
        fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&appid='+key
        ).then( r => {
            return r.json();
        }).then(r => {
            currentComponent.setState({weather: r});
        });
    }
    //displays weather information on home page
    displayWeather(){
        if(this.state.weather !== null){
            if(this.state.weather.cod !== 200) //no city found or invalid zip code
                return <h3 style={h3} className="whiteText">{this.state.weather.message}</h3>
            return <WeatherHome style={h3}
                city={this.state.weather.name}
                weather={this.state.weather.weather[0]}
                main={this.state.weather.main}
                wind={this.state.weather.wind}
            />
        }
    }
    //allow user to change zip code to see weather of different location. Current default is Worcester, MA
    changeZip(){
        //prompt user to input zip code
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
            if(zipcode !== null && zipcode !== ""){
                let idPromise = getUserID();
                idPromise.then(uid=>{
                    const data = JSON.stringify({uid: uid, zipcode: zipcode});
                    fetch('https://sleepwebapp.wpi.edu:5000/addZipcode', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then(() => {
                        this.getWeather(this, zipcode);
                    });
                });
            }
        })
    }
    //grab zipcode from database under user to use as location for weather infomation
    getZipcode(currentComponent){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getZipcode', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length !== 0){
                    if(r[0].zipcode === null){
                        currentComponent.getWeather(currentComponent, currentComponent.state.zipcode)
                    }
                    else {
                        currentComponent.setState({zipcode: r[0].zipcode});
                        currentComponent.getWeather(currentComponent, r[0].zipcode)
                    }
                }
            });
        });
    }

    displayFunFact(){
        let rand = Math.floor(Math.random() * 29);
        switch (rand) {
            case 0:
                return <h3 style={h3} className="whiteText">Man is the only mammal that willingly delays sleep.
                    (SleepFoundation.org)</h3>
            case 1:
                return <h3 style={h3} className="whiteText">One of the primary causes of excessive sleepiness among
                    Americans is self-imposed sleep deprivation. (SleepFoundation.org)</h3>
            case 2:
                return <h3 style={h3} className="whiteText">People who don’t get enough sleep are more likely to have
                    bigger appetites due to the fact that their leptin levels
                    (leptin is an appetite-regulating hormone) fall, promoting appetite increase.
                    (SleepFoundation.org)</h3>
            case 3:
                return <h3 style={h3} className="whiteText">There are individual differences in the need to nap. Some
                    adults and children need to nap. However, the majority of
                    teenagers probably nap in the afternoon because they are not sleeping enough at night.
                    (SleepFoundation.org)</h3>
            case 4:
                return <h3 style={h3} className="whiteText">Snoring is the primary cause of sleep disruption for
                    approximately 90 million American adults;
                    37 million on a regular basis. (SleepFoundation.org)</h3>
            case 5:
                return <h3 style={h3} className="whiteText">The body never adjusts to shift work.
                    (SleepFoundation.org)</h3>
            case 6:
                return <h3 style={h3} className="whiteText">We naturally feel tired at two different times of the day:
                    about 2:00 AM and 2:00 PM. It is this natural dip
                    in alertness that is primarily responsible for the post-lunch dip. (SleepFoundation.org)</h3>
            case 7:
                return <h3 style={h3} className="whiteText">Exercising regularly makes it easier to fall asleep and
                    contributes to sounder sleep. However, exercising
                    sporadically or right before going to bed will make falling asleep more difficult.
                    (SleepFoundation.org)</h3>
            case 8:
                return <h3 style={h3} className="whiteText">According to the International Classifications of Sleep
                    Disorders, shift workers are at increased risk
                    for a variety of chronic illnesses such as cardiovascular and gastrointestinal diseases.
                    (SleepFoundation.org)</h3>
            case 9:
                return <h3 style={h3} className="whiteText">Caffeine has been called the most popular drug in the world.
                    All over the world people consume caffeine
                    on a daily basis in coffee, tea, cocoa, chocolate, some soft drinks, and some drugs
                    (SleepFoundation.org)</h3>
            case 10:
                return <h3 style={h3} className="whiteText">According to the results of NSF's 2008 Sleep in America
                    poll, 36 percent of American drive drowsy or fall
                    asleep while driving. (SleepFoundation.org)</h3>
            case 11:
                return <h3 style={h3} className="whiteText">Seasonal affective disorder is believed to be influenced by
                    the changing patterns of light and darkness that
                    occur with the approach of winter. (SleepFoundation.org)</h3>
            case 12:
                return <h3 style={h3} className="whiteText">Somniphobia is the fear of sleep. (restonic.org)</h3>
            case 13:
                return <h3 style={h3} className="whiteText">The sensation of falling when half asleep and jerking
                    yourself awake is called "hypnic jerks". (dreams.co.uk)</h3>
            case 14:
                return <h3 style={h3} className="whiteText">Pain tolerance is reduced by sleep deprivation.
                    (dreams.co.uk)</h3>
            case 15:
                return <h3 style={h3} className="whiteText">Sleeping on your front can aid digestion.
                    (dreams.co.uk)</h3>
            case 16:
                return <h3 style={h3} className="whiteText">Ideally falling asleep at night should take you 10-15
                    minutes. (dreams.co.uk)</h3>
            case 17:
                return <h3 style={h3} className="whiteText">Sleep deprivation will kill you more quickly than food
                    deprivation. (dreams.co.uk)</h3>
            case 18:
                return <h3 style={h3} className="whiteText">Avoid alcohol, cigarettes, and heavy meals in the evening.
                    Try
                    a light snack 45 minutes before bed if you are still hungry. (SleepFoundation.org)</h3>
            case 19:
                return <h3 style={h3} className="whiteText">Stick to a sleep schedule of the same bedtime and wake up
                    time, even on the weekends. (SleepFoundation.org)</h3>
            case 20:
                return <h3 style={h3} className="whiteText">A relaxing, routine activity right before bedtime conducted
                    away from bright lights helps separate your
                    sleep time from activities that can cause excitement, stress or anxiety which can make it more
                    difficult to fall asleep,
                    get sound and deep sleep or remain asleep.. (SleepFoundation.org)</h3>
            case 21:
                return <h3 style={h3} className="whiteText">If you have trouble sleeping, avoid naps, especially in the
                    afternoon.
                    Power napping may help you get through the day, but if you find that you can't fall asleep at
                    bedtime,
                    eliminating even short catnaps may help. (SleepFoundation.org)</h3>
            case 22:
                return <h3 style={h3} className="whiteText">Having your bedroom be cool – between 60 and 67 degrees,
                    provides a better environment for sleep. (SleepFoundation.org)</h3>
            case 23:
                return <h3 style={h3} className="whiteText">Make sure your mattress is comfortable and supportive. The
                    one you have been using for years may have exceeded its life expectancy –
                    about 9 or 10 years for most good quality mattresses. (SleepFoundation.org)</h3>
            case 24:
                return <h3 style={h3} className="whiteText">Avoid bright light in the evening and expose yourself to
                    sunlight in the morning. This will
                    keep your circadian rhythms in check. (SleepFoundation.org)</h3>
            case 25:
                return <h3 style={h3} className="whiteText">If you have trouble sleeping, avoid electronics before bed
                    or in the middle of the night. (SleepFoundation.org)</h3>
            case 26:
                return <h3 style={h3} className="whiteText">Record your sleep in a Sleep Diary to help you better
                    evaluate common patterns or issues you
                    may see with your sleep or sleeping habits. (SleepFoundation.org)</h3>
            case 27:
                return <h3 style={h3} className='whiteText'>Light therapy can both increase total sleep time while also
                    having antidepressant effects. (Driver & Taylor, 2000, p. 397) So go out and get some sunlight!</h3>
            case 28:
                return <h3 style={h3} className="whiteText">Participants in a light therapy study had an increase in
                    total sleep time by about 54 minutes. (Driver & Taylor, 2000, p. 397) So go bath in some natural
                    light!</h3>
        }
    }

    //grab fitbit boolean from database to check if the user has set true to use their fitbit
    getUseFitbit(currentComponent){
        let idPromise = getUserID();
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            fetch('https://sleepwebapp.wpi.edu:5000/getUseFitbit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length !== 0){
                    currentComponent.setState({fitbit: r[0].fitbit});
                }
            });
        });
    }
    //set report link to grab fitbit data if fitbit value is true, otherwise link to report page
    usefitbit(){
        if(this.state.fitbit){
            window.location.assign(OAUTH); //authenticate user for fibit and grab fitbit data
        }
        else {
            window.location.assign("https://sleepwebapp.wpi.edu/report");
        }
    }

    render(){
        return (
            <div id="homepage" className="row d-flex align-items-center">
                <div id="setting_link">
                    <div className="d-flex align-items-center">
                        <img className="profile_pic" src={this.state.image} alt=""/>
                        <h3 style={{color: "#7339AB", marginLeft: "10px"}}>Welcome <b>{this.state.name}</b></h3>
                    </div>
                    <div>
                        <button id="logout_icon" className="float-right" onClick={logout}></button>
                        <Link to="/settings">
                            <div id="setting_icon" className="float-right"></div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6 circleview" >
                    <ul className="circle">
                        <li>
                            <Link to="/sleep">
                                <HomeIcon spanID={"sleepIcon_h"}
                                          iconClass={"iconImages_h sleepIconImg"}
                                          iconInfo={"Log Your Sleep"}/>
                            </Link>
                        </li>
                        <li>
                            <a onClick={this.usefitbit.bind(this)}>
                                <HomeIcon spanID={"reportIcon_h"}
                                          iconClass={"iconImages_h reportIconImg"}
                                          iconInfo={"Personal Report"}/>
                            </a>
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
                        <li className="noevents">
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
                                    <h2 style={h2} className="whiteText">Fun Fact of the Day:</h2>
                                    {this.displayFunFact()}
                                </div>
                                <div className="carousel-item text-center">
                                    {this.displayWeather()}
                                    <button style={{marginTop: "20px", background: "transparent", border: "2px solid white"}} onClick={this.changeZip.bind(this)}>Change Location</button>
                                </div>
                                <div className="carousel-item text-center">
                                    <h2 style={h2} className="whiteText">{"Based on your personality results, you should: "}</h2>
                                    <h2 style={h2} className="whiteText">{this.state.perMessage.subject}</h2>
                                    <h4 style={h3} className="whiteText">{this.state.perMessage.message}</h4>
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
