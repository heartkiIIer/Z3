import React from 'react';
import '../styles/home.css'

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row">
                <h1>Home Page</h1>
                <ul className="circle">
                    <li>
                        <span id="calIcon_h" className="dot_h">
                            <div className="iconImages_h calIconImg_h"></div>
                        </span>
                    </li>
                    <li>
                        <span id="exerIcon_h" className="dot_h">
                            <div className="iconImages_h exerIconImg_h"></div>
                        </span>
                    </li>
                    <li>
                        <span id="mindIcon_h" className="dot_h">
                            <div className="iconImages_h mindIconImg_h"></div>
                        </span>
                    </li>
                    <li>
                        <span id="bedIcon" className="dot_h">
                            <div className="iconImages_h bedIconImg"></div>
                        </span>
                    </li>
                    <li>
                        <span id="coffeeIcon" className="dot_h">
                            <div className="iconImages_h coffeeIconImg"></div>
                        </span>
                    </li>
                    <li>
                        <span id="fitbitIcon" className="dot_h">
                            <div className="iconImages_h fitbitIconImg"></div>
                        </span>
                    </li>
                    <li>
                        <span id="sleepIcon" className="dot_h">
                            <div className="iconImages_h sleepIconImg"></div>
                        </span>
                    </li>
                    <li>
                        <span id="perIcon" className="dot_h">
                            <div className="iconImages_h perIconImg"></div>
                        </span>
                    </li>
                </ul>
            </div>
        );
    };
}
export default Home;
