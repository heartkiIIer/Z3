import React from 'react';
import '../styles/home.css'

class Home extends React.Component {
    render(){
        return (
            <div id="homepage" className="row">
                <h1>Home Page</h1>
                <div className="circleContainer row justify-content-between align-content-between">
                    <div className="col-md-4">
                        <span id="calIcon" className="dot">
                            <div className="iconImages calIconImg"></div>
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span id="exerIcon" className="dot d-flex justify-content-center">
                            <div className="iconImages exerIconImg"></div>
                        </span>
                    </div>
                    <div className="col-md-4">
                        <span id="mindIcon" className="dot d-flex justify-content-end">
                            <div className="iconImages mindIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="bedIcon" className="dot">
                            <div className="iconImages bedIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span className="dot text-center">
                            <p>Show weather here</p>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="coffeeIcon" className="dot">
                            <div className="iconImages coffeeIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="fitbitIcon" className="dot">
                            <div className="iconImages fitbitIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="sleepIcon" className="dot">
                            <div className="iconImages sleepIconImg"></div>
                        </span>
                    </div>
                    <div className='col-md-4'>
                        <span id="perIcon" className="dot">
                            <div className="iconImages perIconImg"></div>
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}
export default Home;
