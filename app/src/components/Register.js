import React, { Component } from 'react';
import '../styles/Register.css'


class Register extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                width: "50%",
            };
        }
        else{
            this.state = {
                width: "80%",
            };
        }
    }
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    width: "80%"
                });
            }
            else {
                this.setState({
                    width: "50%"
                })
            }
        })
    }
    render() {
        this.resize();
        const styles = {
            containerStyle:{
                width: this.state.width,
            }
        };
        const { containerStyle } = styles;
        return(
            <div id="App">
                <div className="container" id={"page-wrap"}>
                    <div id="Heading" className="row featurette">
                        <div style={containerStyle} id="Register">
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
