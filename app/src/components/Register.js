import React, { Component } from 'react';
import '../styles/Register.css'
import { Navbar, Nav} from 'react-bootstrap';
import SideBar from "./sideMenu";


class Register extends React.Component{
    render() {
        return(
            <div id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="container" id={"page-wrap"}>
                    <div id="Heading" className="row featurette">
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
                </div>
                <footer>
                    <p>sleeeeeeep</p>
                </footer>
            </div>
        )
    }
}
export default Register;
