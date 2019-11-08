import React from 'react';
import '../styles/home.css'

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row">
                <div class="col-lg-6">
                    <ul className="circle">
                        <li>
                            <span id="sleepIcon" className="dot_h">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="iconImages_h sleepIconImg"></div>
                                        </div>
                                        <div className="flip-card-back">
                                            <span className="dot_h text d-flex align-items-center justify-content-center">
                                                Log Your Sleep
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </li>
                        <li>
                            <span id="logIcon_h" className="dot_h">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="iconImages_h logIconImg_h"></div>
                                        </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h text d-flex align-items-center justify-content-center">
                                            Log Your Exercise, Caffeine, and Stress Level
                                         </span>
                                    </div>
                                 </div>
                               </div>
                            </span>
                        </li>
                        <li>
                            <span id="mindIcon_h" className="dot_h">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="iconImages_h mindIconImg_h"></div>
                                        </div>
                                        <div className="flip-card-back">
                                            <span className="dot_h text d-flex align-items-center justify-content-center">
                                                Mindfulness Modules
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </li>
                        <li>
                            <span id="perIcon" className="dot_h">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="iconImages_h perIconImg"></div>
                                        </div>
                                        <div className="flip-card-back">
                                            <span className="dot_h text d-flex align-items-center justify-content-center">
                                                Personality
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </li>
                        <li>
                            <span id="bedIcon" className="dot_h">
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <div className="iconImages_h bedIconImg"></div>
                                        </div>
                                        <div className="flip-card-back">
                                            <span className="dot_h text d-flex align-items-center justify-content-center">
                                                Your Bedtime Routine
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div id="dailyInfo" className="d-flex justify-content-center">
                        <h2>Home</h2>
                    </div>
                </div>
            </div>
        );
    };
}
export default Home;
