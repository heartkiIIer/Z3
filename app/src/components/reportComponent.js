import React, { Component } from 'react';

class reportComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                    <hr className="hr-settings"/>
                    <h1 className="blueHeader">{this.props.date}</h1>
                    <div className="day" class="flex-report">
                        <div className="goalProg">
                            <p>Average Sleep:</p>
                            <h1 className="timeHeader">{this.props.sleep} hrs</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">{this.props.stress}</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">{this.props.exer} min</h1>
                            <p>Average Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">{this.props.caf} Cups</h1>
                        </div>
                    </div>
            </div>
        );
    };
}
export default reportComponent;