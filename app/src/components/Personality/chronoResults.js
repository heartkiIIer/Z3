import React from 'react';
import "../../styles/ItsBedtime.css";
import "../../styles/personalityIntro.css";
import {Link} from 'react-router-dom';

class ChronoResults extends React.Component {

    render(){
        return (
            <div className = "content chronotype">
                <div className = "inner">
                    <h1 className="blueHeader">Chronotype Results</h1>
                    <hr className="hr-settings"/>

                    <h3 className="blueHeader">Chronotype Score: 41</h3>

                    <div className="d-flex justify-content-between">
                        <Link to="/chronotype">
                            <button className="btn">Retake Chronotype Test</button>
                        </Link>
                        <Link to="/personalityIntro">
                            <button className="btn">Done</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };
}
export default ChronoResults;
