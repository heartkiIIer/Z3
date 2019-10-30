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
                        <div className='col-lg-4'>
                            <span className="dot"></span>
                            <h2>Organize Stuff</h2>
                            <p>Hello</p>
                        </div>
                        <div className='col-lg-4'>
                            <span className="dot"></span>
                            <h2>Organize Stuff</h2>
                            <p>Hello</p>
                        </div>
                        <div className='col-lg-4'>
                            <span className="dot"></span>
                            <h2>Organize Stuff</h2>
                            <p>Hello</p>
                        </div>
                    </div>

                    <div id="CalSch" className="row featurette">
                        <h1>Calendar</h1>
                    </div>

                    <div id="Exercise" className="row featurette">
                        <h1>Exercise</h1>
                    </div>

                    <div id="MindPerson" className="row featurette">
                        <h1>Mindfulness</h1>
                    </div>
                </div>
            </div>
        );
    };
}
export default Landing;