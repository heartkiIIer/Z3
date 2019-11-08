import React from 'react';
import '../styles/landing.css'

class Landing extends React.Component {
    render(){
        return (
            <div>
                <div className="container">
                    <div id="Heading" className="row featurette">
                        <div className="col-md-6 order-md-1">
                            <div id="login">
                                <h2>Login</h2>
                                <form>
                                    <input type="text" name="username" placeholder="Username or Email"/>
                                    <input type="password" name="password" placeholder="Password"/>
                                    <button id="loginbtn">Login</button>
                                </form>
                            </div>
                        </div>
                        <div id="title" className="col-md-6 order-md-1">
                            <h1>Z<sup>3</sup></h1>
                            <h3>Stabilize your sleep and bring sleep back into your control! </h3>
                            <button id="joinbtn">Join Us</button>
                        </div>
                    </div>

                    <div id="Features" className="row">
                        <div className='col-md-4 my-auto'>
                            <a href={"#calFeature"}>
                                <span id="calIcon" className="dot">
                                    <div className="iconImages calIconImg"></div>
                                </span>
                            </a>
                            <h2>Routines</h2>
                        </div>
                        <div className='col-md-4 my-auto'>
                            <a href={"#exerFeature"}>
                                <span id="exerIcon" className="dot">
                                    <div className="iconImages exerIconImg"></div>
                                </span>
                            </a>
                            <h2>Activity Log</h2>
                        </div>
                        <div className='col-md-4 my-auto'>
                            <a href={"#mindFeature"}>
                                <span id="mindIcon" className="dot">
                                    <div className="iconImages mindIconImg"></div>
                                </span>
                            </a>
                            <h2>Mindfulness and Personality</h2>
                        </div>
                    </div>
                    <a name="calFeature">
                        <div id="CalSch" className="row featurette featureInfo">
                            <h1 className="featureTitle">Calendar and Routines</h1>
                            <div className="col-md-6">
                                <div className="image-wrapper float-left pr-3 iconImages calIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3>
                                        Keep track of all your calendar events and plan ahead
                                        so no more all-nighters. Let your body sleep! Set a nightly
                                        bedtime routine and make it a habit! <br/><br/>
                                        Z<sup>3</sup> allows for you to enter you schedule and view everything
                                        in a calendar. You can also sync your google or outlook
                                        calendar! Z<sup>3</sup> has a feature where it will send you friendly
                                        reminders to help you stay on a consistent sleep schedule.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a name="exerFeature">
                        <div id="Exercise" className="row featurette featureInfo text-right">
                            <h1 className="featureTitle">Exercise and Activity Trackers</h1>
                            <div className="col-md-6 align-self-end">
                                <div className="image-wrapper float-right pr-3 iconImages exerIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3>
                                        Get walking or do some exercise! Get fit and improve
                                        your sleep. That is hitting two birds in one stone! <br/><br/>
                                        Z<sup>3</sup> allows you to sync it up to your fitness tracker to track
                                        both exercise and sleep! If you do not own a fitness tracker, do not fret!
                                        There are options to self log your sleep hours and exercise amount.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a name="mindFeature">
                        <div id="MindPerson" className="row featurette featureInfo">
                            <h1 className="featureTitle">Mindfulness and Personality</h1>
                            <div className="col-md-6">
                                <div className="image-wrapper float-left pr-3 iconImages mindIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3>
                                        Open up your mind and learning more about yourself
                                        through our Mindfulness Modules and Personality Test. Learn how
                                        mindfulness and Personality can effects your sleep! <br/><br/>

                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    };
}
export default Landing;