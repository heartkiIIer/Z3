import React from 'react';
import '../../styles/Landing.css'
import {Link} from 'react-router-dom';

class Landing extends React.Component {
    render(){
        return (
            <div>
                <div>
                    <div style={{paddingBottom: "75px"}} id="Heading" className="row featurette">
                        <div className="box col-md-6 order-md-1">
                            <div id="login">
                                <h2 className="whiteText">Login</h2>
                                <form>
                                    <input className="inp" type="text" name="username" placeholder="Username or Email"/>
                                    <input className="inp" type="password" name="password" placeholder="Password"/>
                                    <Link to="/Home">
                                        <button className="btn" id="loginbtn">Login</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                        <div style={{marginTop: "75px", paddingTop: "50px"}} className=" box col-md-6 order-md-1 d-flex align-items-start">
                            <div id="title">
                                <h1 className="whiteText">Z<sup>3</sup></h1>
                                <h3 className="whiteText">Stabilize your sleep and bring sleep back into your control! </h3>
                                <div>
                                    <Link to="/Register">
                                        <button style={{marginRight: "20px"}} className="btn" id="joinbtn">Join Us!
                                            Register Here
                                        </button>
                                    </Link>
                                    <a href={"#features"}>
                                        <button className="btn" id="morebtn">Learn What We Are All About</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a name="features">
                        <div style={{backgroundColor: "#141629", paddingTop: "75px", paddingBottom: "75px"}} className="row">
                            <div className='col-md-4 my-auto'>
                                <a href={"#calFeature"}>
                                    <span id="calIcon" className="dot">
                                        <div className="iconImages calIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Routines</h2>
                            </div>
                            <div style={{paddingTop: "50px"}} className='col-md-4 my-auto'>
                                <a href={"#exerFeature"}>
                                    <span id="exerIcon" className="dot">
                                        <div className="iconImages exerIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Activity Log</h2>
                            </div>
                            <div style={{paddingTop: "50px"}} className='col-md-4 my-auto'>
                                <a href={"#mindFeature"}>
                                    <span id="mindIcon" className="dot">
                                        <div className="iconImages mindIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Mindfulness and Personality</h2>
                            </div>
                        </div>
                    </a>
                    <a name="calFeature">
                        <div style={{paddingBottom: "75px"}} id="CalSch" className="row featurette featureInfo">
                            <h1 className="featureTitle whiteText">Calendar and Routines</h1>
                            <h3 className="whiteText sidePadding">
                                Keep track of all your calendar events and plan ahead
                                so no more all-nighters. Let your body sleep! Set a nightly
                                bedtime routine and make it a habit! <br/><br/>
                                Z<sup>3</sup> allows for you to enter you schedule and view everything
                                in a calendar. You can also sync your google or outlook
                                calendar! Z<sup>3</sup> has a feature where it will send you friendly
                                reminders to help you stay on a consistent sleep schedule.
                            </h3>
                        </div>
                    </a>

                    <a name="exerFeature">
                        <div style={{paddingBottom: "75px"}} id="Exercise" className="row featurette featureInfo text-right">
                            <h1 className="featureTitle whiteText">Exercise and Activity Trackers</h1>
                            <h3 className="whiteText sidePadding">
                                Get walking or do some exercise! Get fit and improve
                                your sleep. That is hitting two birds in one stone! <br/><br/>
                                Z<sup>3</sup> allows you to sync it up to your fitness tracker to track
                                both exercise and sleep! If you do not own a fitness tracker, do not fret!
                                There are options to self log your sleep hours and exercise amount.
                            </h3>
                        </div>
                    </a>

                    <a name="mindFeature">
                        <div style={{paddingBottom: "75px"}} id="MindPerson" className="row featurette featureInfo">
                            <h1 className="featureTitle whiteText">Mindfulness and Personality</h1>
                            <h3 className="whiteText sidePadding">
                                Open up your mind and learning more about yourself
                                through our Mindfulness Modules and Personality Test. Learn how
                                mindfulness and Personality can effects your sleep! <br/><br/>
                            </h3>
                        </div>
                    </a>
                </div>
            </div>
        );
    };
}
export default Landing;