import React from 'react';
import '../styles/home.css'

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row">
                <div class="col-lg-6">
                    <ul className="circle">
                        <li>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <span id="sleepIcon" className="dot_h">
                                            <div className="iconImages_h sleepIconImg"></div>
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h d-flex align-items-center justify-content-center">
                                            Log Sleep
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <span id="logIcon_h" className="dot_h">
                                            <div className="iconImages_h logIconImg_h"></div>
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h d-flex align-items-center justify-content-center">
                                            Log others
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <span id="mindIcon_h" className="dot_h">
                                            <div className="iconImages_h mindIconImg_h"></div>
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h d-flex align-items-center justify-content-center">
                                            Mindfulness
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <span id="perIcon" className="dot_h">
                                            <div className="iconImages_h perIconImg"></div>
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h d-flex align-items-center justify-content-center">
                                            Personality
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <span id="bedIcon" className="dot_h">
                                            <div className="iconImages_h bedIconImg"></div>
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <span className="dot_h d-flex align-items-center justify-content-center">
                                            Bedtime
                                        </span>
                                    </div>
                                </div>
                            </div>
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
