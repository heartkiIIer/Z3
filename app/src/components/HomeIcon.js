import React from 'react';
import '../styles/home.css'

class HomeIcon extends React.Component {
    render(){
        return (
            <span id={this.props.spanID} className="dot_h">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className={this.props.iconClass}></div>
                        </div>
                        <div className="flip-card-back">
                            <span className="dot_h text d-flex align-items-center justify-content-center">
                                {this.props.iconInfo}
                            </span>
                        </div>
                    </div>
                </div>
            </span>
        );
    };
}
export default HomeIcon;