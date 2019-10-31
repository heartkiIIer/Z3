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
                                    Username or Email:
                                    <input type="text" name="username" placeholder="john or john157@gmail.com"/>
                                    Password:
                                    <input type="password" name="password"/>
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
                            <span id="calIcon" className="dot">
                                <div className="iconImages calIconImg"></div>
                            </span>
                            <h2>Calendar and Routines</h2>
                        </div>
                        <div className='col-md-4 my-auto'>
                            <span id="exerIcon" className="dot">
                                <div className="iconImages exerIconImg"></div>
                            </span>
                            <h2>Exercise and Activity Trackers</h2>
                        </div>
                        <div className='col-md-4 my-auto'>
                            <span id="mindIcon" className="dot">
                                <div className="iconImages mindIconImg"></div>
                            </span>
                            <h2>Mindfulness and Personality</h2>
                        </div>
                    </div>

                    <div id="CalSch" className="row featurette featureInfo">
                        <h1 className="featureTitle">Calendar and Routines</h1>
                        <div className="col-md-6">
                            <div className="image-wrapper float-left pr-3 iconImages calIconImg icon"></div>
                            <div className="single-post-content-wrapper p-3">
                                <h3>
                                    Keep track of all your calendar events and plan ahead
                                    so no more all-nighters. Let your body sleep! Set a nightly
                                    bedtime routine and make it a habit!
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div id="Exercise" className="row featurette featureInfo text-right">
                        <h1 className="featureTitle">Exercise and Activity Trackers</h1>
                        <div className="col-md-6 align-self-end">
                            <div className="image-wrapper float-right pr-3 iconImages exerIconImg icon"></div>
                            <div className="single-post-content-wrapper p-3">
                                <h3>
                                    Get walking or do some exercise! Getting fit and improve
                                    your sleep. Two birds in one stone. Sync it up with fitbit
                                    and let the device do all the tracking for you.
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div id="MindPerson" className="row featurette featureInfo">
                        <h1 className="featureTitle">Mindfulness and Personality</h1>
                        <div className="col-md-6">
                            <div className="image-wrapper float-left pr-3 iconImages mindIconImg icon"></div>
                            <div className="single-post-content-wrapper p-3">
                                <h3>
                                    Open up your mind and learning more about yourself
                                    through our Mindfulness Modules and Personality Test
                                    how that effects your sleep behaviors
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default Landing;