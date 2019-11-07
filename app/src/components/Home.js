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
                                <div className="iconImages_h sleepIconImg"></div>
                            </span>
                        </li>
                        <li>
                            <span id="logIcon_h" className="dot_h">
                                <div className="iconImages_h logIconImg_h"></div>
                            </span>
                        </li>
                        <li>
                            <span id="mindIcon_h" className="dot_h">
                                <div className="iconImages_h mindIconImg_h"></div>
                            </span>
                        </li>
                        <li>
                            <span id="perIcon" className="dot_h">
                                <div className="iconImages_h perIconImg"></div>
                            </span>
                        </li>
                        <li>
                            <span id="bedIcon" className="dot_h">
                                <div className="iconImages_h bedIconImg"></div>
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
