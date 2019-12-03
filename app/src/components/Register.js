import React, { Component } from 'react';
import '../styles/Register.css'


class Register extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
            };
        }
    }
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '10% 10% 5%'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px'
                })
            }
        })
    }
    render() {
        this.resize();
        return(
            <div id="App">
                <div className="container" id={"page-wrap"}>
                    <div id="Heading" className="row featurette">
                        <div id="Register">
                            <h2>Join Us</h2>
                            <form>
                                <input className="inp" type="text" name="first-name" placeholder="First Name"/>
                                <input className="inp" type="text" name="last-name" placeholder="Last Name"/>
                                <input className="inp" type="text" name="email" placeholder="Email"/>
                                <input className="inp" type="text" name="username" placeholder="Username"/>
                                <input className="inp" type="password" name="Password" placeholder="Password"/>
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
