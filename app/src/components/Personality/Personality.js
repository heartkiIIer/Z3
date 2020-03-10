import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";
import swal from 'sweetalert'
import {getUserID} from "../../scripts/login";

class Personality extends React.Component{
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
    submitPersonality() {
        var ele = document.getElementsByTagName('input');
        let values = [];
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].type = "radio") {
                if (ele[i].checked) {
                    console.log(ele[i].name + ": " + ele[i].value);
                    values.push(ele[i].value);
                }
            }
        }
        if (values.length === 5) {
            let idPromise = getUserID();
            idPromise.then(uid=>{
                const data = JSON.stringify({
                    open: values[0],
                    cons: values[1],
                    extra: values[2],
                    agree: values[3],
                    neuro: values[4],
                    uid: uid
                });
                fetch('https://sleepwebapp.wpi.edu:5000/submitPersonality', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data
                }).then(r => {
                    console.log("Submitted Personailty Results", r.status);
                    window.open("https://sleepwebapp.wpi.edu/personalityResults", "_self");
                })
            });
        } else {
            swal({
                title: "Please make sure all fields are filled and submit again",
                icon: "error"
            })
        }
    }

    render(){
        this.resize();
        const styles = {
            containerStyle:{
                padding: this.state.padding,
            }
        };
        const { containerStyle } = styles;
        return (
            <div className="content personality" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                <div style={containerStyle} className="inner" id="page-wrap">
                    <h1 className="blueHeader">Your Personality Scores</h1>
                    <hr className="hr-settings"/>
                    <br/>
                    <h5>
                        Use the results from the Big 5 quiz to fill
                        in your scores below.
                    </h5>
                    <br/>
                    <form id="personality" method="post">
                        <h5 className="blueHeader">Openness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="1" id="low_o"/>
                                <label for="low_o">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="5" id="medium_o"/>
                                <label for="medium_o">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="open" value="10" id="high_o"/>
                                <label for="high_o">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Conscientiousness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="1" id="low_c"/>
                                <label for="low_c">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="5" id="medium_c"/>
                                <label for="medium_c">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="cons" value="10" id="high_c"/>
                                <label for="high_c">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Extraversion</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="1" id="low_e"/>
                                <label for="low_e">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="5" id="medium_e"/>
                                <label for="medium_e">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="extr" value="10" id="high_e"/>
                                <label for="high_e">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Agreeableness</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="1" id="low_a"/>
                                <label for="low_a">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="5" id="medium_a"/>
                                <label for="medium_a">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="agree" value="10" id="high_a"/>
                                <label for="high_a">High</label>
                            </div>
                        </div>

                        <br/>
                        <h5 className="blueHeader">Neuroticism</h5>
                        <div className="options d-flex justify-content-around">
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="1" id="low_n"/>
                                <label for="low_n">Low</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="5" id="medium_n"/>
                                <label for="medium_n">Medium</label>
                            </div>
                            <div>
                                <input className="lmh_options" type="radio" name="neur" value="10" id="high_n"/>
                                <label for="high_n">High</label>
                            </div>
                        </div>

                    </form>
                    <button className="btn" onClick={this.submitPersonality}>Submit Personality Scores</button>
                </div>
                </div>
            </div>
        );
    };
}

export default Personality;