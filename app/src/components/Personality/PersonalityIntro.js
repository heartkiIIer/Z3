import React, {SyntheticEvent} from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';
import SideBar from "../sideMenu";
import {getUserID} from "../../scripts/login";

class PersonalityIntro extends React.Component {
    constructor(props) {
        super(props);
        this.openURL = this.openURL.bind(this); // eww js
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
                takenperson: false,
                takenchrono: false
            };
        }
        else{
            this.state = {
                padding: '17% 17% 5%',
                takenperson: false,
                takenchrono: false
            };
        }
    }
    componentDidMount() {
        let idPromise = getUserID();
        //if no user signed in redirect them back to landing
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        });
        let currentcomponent = this;
        this.personalitytaken(currentcomponent);
        this.chornotaken(currentcomponent);
    }

    //opens the URL page of the personality test in a different window.
    openURL(){
        if(!this.state.takenperson) {
            window.open("https://www.truity.com/test/big-five-personality-test", "_blank", "width=1000, height=600");
        }
    }
    //re-adjust padding of content div if the page is less than 700 px wide
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '17% 17% 5%'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px'
                })
            }
        })
    }
    //stores a boolean stating if the user has taken the personality test
    personalitytaken(currentcomponent){
        let idPromise = getUserID(); //get signed in user's ID
        idPromise.then(uid=>{
            const data = JSON.stringify({uid: uid});
            //request to get user's personality scores
            fetch('https://sleepwebapp.wpi.edu:5000/getPersonality', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length > 0){
                    currentcomponent.setState({takenperson: true});
                }
            });
        });
    }
    //stores a boolean stating if the user has taken the chronotype test
    chornotaken(currentcomponent){
        let idPromise = getUserID();
        idPromise.then(uid =>{
            const data = JSON.stringify({uid: uid});
            //request chronotype of user data from the server and database
            fetch('https://sleepwebapp.wpi.edu:5000/getChronoAnswers', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then( r => {
                return r.json();
            }).then(r => {
                if(r.length > 0){
                    currentcomponent.setState({takenchrono: true});
                }
            });
        });
    }
    //redirect to test or results based on if user has taken test
    getredirect(){
        let redirectURL = ["/personality", "/chronotype"];
        if(this.state.takenperson){
            redirectURL[0] = "/personalityResults";
        }
        if(this.state.takenchrono){
            redirectURL[1] = "/chronoResults";
        }
        console.log(redirectURL);
        return redirectURL;
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
            <div className = "content personality" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div style={containerStyle} className="inner" id="page-wrap">
                    <h1 className="blueHeader">What is Your Personality?</h1>
                    <hr className="hr-settings"/>
                    <br/>
                    <h3 className="blueHeader">What does "Big Five Personality" mean?</h3>
                    <h5>
                        The Big Five encompasses five characteristics: openness, conscientiousness,
                        extraversion, agreeableness, and neuroticism.<br/><br/>
                        Take this FREE quiz. It will tell you how open, conscientious,
                        agreeable, extraverted, and neurotic you are. This will help
                        personalize the Z<sup>3</sup> app specifically for you!
                        When you are done taking the quiz, report your scores for the
                        Big Five Personality Test
                    </h5>
                    <Link to={this.getredirect()[0]}>
                        <button className="test_btn person_img shadow p-3 mb-5" onClick={(e) => this.openURL(e)}>Personailty Test</button>
                    </Link>

                    <br/><br/>

                    <h1 className="blueHeader">What is Your Chonotype?</h1>
                    <hr className="hr-settings"/>
                    <br/>
                    <h3 className="blueHeader">What does "Chronotype" mean?</h3>
                    <h5>
                        Chronotype tells you whether you are a morning or evening type. A
                        short survey will help you find out your chronotype!
                    </h5>
                    <Link to={this.getredirect()[1]}>
                        <button className="test_btn chrono_img shadow p-3 mb-5">Chronotype Test</button>
                    </Link>
                </div>
                </div>
            </div>
        );
    };
}
export default PersonalityIntro;
