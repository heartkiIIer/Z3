import React, { Component } from 'react';

class ReportComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                    <hr className="hr-report"/>
                    <br/>
                    <h1 className="blueHeader">{this.props.date}</h1>
                    <br/>
                    <div className="day" class="flex-report" id = {this.props.id}>
                        <div className="goalProg">
                            <p>Total Sleep:</p>
                            <h1 className="timeHeader">{this.props.sleep} hrs</h1>
                            <p>Average Stress Level:</p>
                            <h1 className="smallTimeHeader">{this.props.stress}</h1>
                        </div>
                        <div className="percentage">
                            <p>Total Exercise:</p>
                            <h1 className="smallTimeHeader">{this.props.exer} min</h1>
                            <p>Total Caffeine Consumption:</p>
                            <h1 className="smallTimeHeader">{this.props.caf} Cups</h1>
                        </div>
                    </div>
            </div>
        );
    };
}
export default ReportComponent;