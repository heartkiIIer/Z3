import React from 'react';
import '../../styles/Landing.css'
import {Link} from 'react-router-dom';
import '../scripts/firebase'
import '../scripts/Login'
import {getUserID} from "../scripts/Login";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        if (window.innerWidth >= 775){
            this.state = {
                display: "",
                paddingTop50: "",
                paddingTop75: "",
                paddingBottom: "",
                marginTop75: "",
                className: "container",
                alignStart: "",
                height: "75vh",
                width: "100vw"
            };
        }
        else {
            this.state = {
                display: "none",
                paddingTop50: "50px",
                paddingTop75: "75px",
                paddingBottom: "75px",
                marginTop75: "75px",
                className: "",
                alignStart: "d-flex align-items-start",
                height: "",
                width: "104.2%"
            };
        }
    }
    componentDidMount() {
        let idPromise = getUserID();
        //if user is signed in redirect them to homepage
        idPromise.then(id =>{
            window.location.replace("https://sleepwebapp.wpi.edu/home");
        });
    }
    //re-adjust sizing of contents if the page is less than 700 px wide
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 775){
                this.setState({
                    display: "none",
                    paddingTop50: "50px",
                    paddingTop75: "75px",
                    paddingBottom: "75px",
                    marginTop75: "75px",
                    className: "",
                    alignStart: "d-flex align-items-start",
                    height: "",
                    width: "104.2%"
                });
            }
            else {
                this.setState({
                    display: "",
                    paddingTop50: "",
                    paddingTop75: "",
                    paddingBottom: "",
                    marginTop75: "",
                    alignStart: "",
                    className: "container",
                    height: "75vh",
                    width: "100vw"
                });
            }
        })
    }
    render(){
        this.resize();
        const styles = {
            containerStyle:{
                width: this.state.width,
                paddingBottom: this.state.paddingBottom
            }
        };
        const { containerStyle } = styles;
        return (
            <div>
                <div className={this.state.className}>
                    <div style={containerStyle} id="Heading" className="row featurette">
                        <div className="box col-md-6 order-md-1">
                            <div id="login">
                                <form>
                                    <div id="firebaseui-auth-container"></div>
                                    <div className="whiteText" id="loader">Loading...</div>
                                </form>
                            </div>
                        </div>
                        <div style={{marginTop: this.state.marginTop75, paddingTop: this.state.paddingTop50}} className={"box col-md-6 order-md-1" + this.state.alignStart}>
                            <div id="title">
                                <h1 className="whiteText">Z<sup>3</sup></h1>
                                <h3 className="whiteText">Stabilize your sleep and bring sleep back into your control! </h3>
                                <div>
                                    <a href={"#features"}>
                                        <button className="btn" id="morebtn">Learn What We Are All About</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a name="features">
                        <div style={{backgroundColor: "#141629", height: this.state.height, paddingTop: this.state.paddingTop75, paddingBottom: this.state.paddingBm75}} className="row">
                            <div className='col-md-4 my-auto'>
                                <a href={"#calFeature"}>
                                    <span id="calIcon" className="dot">
                                        <div className="iconImages calIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Routines</h2>
                            </div>
                            <div style={{paddingTop: this.state.paddingTop50}} className='col-md-4 my-auto'>
                                <a href={"#exerFeature"}>
                                    <span id="exerIcon" className="dot">
                                        <div className="iconImages exerIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Activity Log</h2>
                            </div>
                            <div style={{paddingTop: this.state.paddingTop50}} className='col-md-4 my-auto'>
                                <a href={"#mindFeature"}>
                                    <span id="mindIcon" className="dot">
                                        <div className="iconImages mindIconImg"></div>
                                    </span>
                                </a>
                                <h2 className="whiteText">Mindfulness and Personality</h2>
                            </div>
                        </div>
                    </a>
                    <a name="calFeature">
                        <div style={{paddingBottom: this.state.paddingBm75}} id="CalSch" className="row featurette featureInfo">
                            <h1 className="featureTitle whiteText">Calendar and Routines</h1>
                            <div className="col-md-6">
                                <div style={{display: this.state.display}} className="image-wrapper float-left pr-3 iconImages calIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3 className="whiteText sidePadding">
                                        Keep a nightly routine with or bedtime routine tracker.
                                        Set your nightly tasks and we will time you to make sure you are getting to bed
                                        consistently and the right way.<br/><br/>
                                        Sync Z<sup>3</sup> with your Google Calendar and view all the events you have coming up
                                        and rate them on stress level. Z<sup>3</sup> We will allow you to visualize your stress level in order to
                                        accurately adjust your sleep habits.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a name="exerFeature">
                        <div style={{paddingBottom: this.state.paddingBm75}} id="Exercise" className="row featurette featureInfo text-right">
                            <h1 className="featureTitle whiteText">Exercise and Activity Trackers</h1>
                            <div className="col-md-6 align-self-end">
                                <div style={{display: this.state.display}} className="image-wrapper float-right pr-3 iconImages exerIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3 className="whiteText sidePadding">
                                        Did you know that exercise has an effect on your quality of sleep?
                                        Keeping track of your exercise will allow you to take control of your sleep health.<br/><br/>
                                        Z<sup>3</sup> allows you to sync it up to your fitness tracker to track
                                        both exercise and sleep! If you do not own a fitness tracker, do not fret!
                                        There are options to self log your sleep hours and exercise amount.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a name="mindFeature">
                        <div style={{paddingBottom: this.state.paddingBm75}} id="MindPerson" className="row featurette featureInfo">
                            <h1 className="featureTitle whiteText">Mindfulness and Personality</h1>
                            <div className="col-md-6">
                                <div style={{display: this.state.display}} className="image-wrapper float-left pr-3 iconImages mindIconImg icon"></div>
                                <div className="single-post-content-wrapper p-3">
                                    <h3 className="whiteText sidePadding">
                                        Are you more of a morning or night person?
                                        How do other traits of your personality line up with your sleep habits?
                                        Take our personality tests and see how your personality affects your sleep needs.
                                        <br/><br/>
                                        Take physical steps to improve your sleep.
                                        We offer in depth mindfulness activities to help calm your body and mind before bed!<br/><br/>

                                    </h3>
                                </div>
                            </div>
                        </div>
                    </a>

                </div>
            </div>

        );
    }
}
export default Landing;