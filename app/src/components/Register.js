import React from 'react';
import '../styles/Register.css'

class Register extends React.Component{
    render() {
        return(
            <div>
                <div className="container">
                    <div id="Heading" className="row featurette">
                        <div className="col-md-6 order-md-1">
                            <div id="Register">
                                <h2>Join Us</h2>
                                <form>
                                    First Name:
                                    <input type="text" name="first-name" placeholder="john"/>
                                    Last Name:
                                    <input type="text" name="last-name" placeholder="doe"/>
                                    Email:
                                    <input type="text" name="email" placeholder="john.doe@gmail.com"/>
                                    Username:
                                    <input type="text" name="username" placeholder="john123"/>
                                    Password:
                                    <input type="password" name="password"/>
                                    <button id="register-btn">Register</button>
                                </form>
                            </div>
                        </div>
                        <div id="title" className="col-md-6 order-md-1">
                            <h1>Z<sup>3</sup></h1>
                            <h3>Join us and take back control of your sleeping habits</h3>
                            <button id="learn-btn">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;