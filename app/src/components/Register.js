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
                                <input type="text" name="first-name" placeholder="First Name"/>
                                <input type="text" name="last-name" placeholder="Last Name"/>
                                <input type="text" name="email" placeholder="Email"/>
                                <input type="text" name="username" placeholder="Username"/>
                                <input type="password" name="Password" placeholder="Username"/>
                                <br/>
                                <button className='btn' id="extended">Register</button>
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
