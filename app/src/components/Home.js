import React from 'react';
import '../styles/home.css'

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row">
                <h1>Home Page</h1>
                <div className="circleContainer row justify-content-between align-content-between">
                    <div className="col-md-4">
                        <span id="calIcon_h" className="dot_h">
                            <div className="iconImages_h calIconImg_h"></div>
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span id="exerIcon_h" className="dot_h d-flex justify-content-center">
                            <div className="iconImages_h exerIconImg_h"></div>
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span id="mindIcon_h" className="dot_h d-flex justify-content-end">
                            <div className="iconImages_h mindIconImg_h"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="bedIcon" className="dot_h">
                            <div className="iconImages_h bedIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span className="dot_h text-center">
                            <p>Show weather here</p>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="coffeeIcon" className="dot_h">
                            <div className="iconImages_h coffeeIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="fitbitIcon" className="dot_h">
                            <div className="iconImages_h fitbitIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="sleepIcon" className="dot_h">
                            <div className="iconImages_h sleepIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="perIcon" className="dot_h">
                            <div className="iconImages_h perIconImg"></div>
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}
export default Home;
