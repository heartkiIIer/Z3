import React from 'react';

class weather extends React.Component {
    constructor(props){
        super(props);
    }

    KelvintoFahrenheit(temp){
        return (temp - 273.15) * 9 / 5 + 32;
    }

    render(){
        return (
            <div>
                <h2 className="whiteText">Today's Weather</h2>
                <h5 className="whiteText">Location: {this.props.city}</h5>
                <h4 className="whiteText">{this.props.weather.description}</h4>
                <h4 className="whiteText">Current Temperature: {this.KelvintoFahrenheit(this.props.main.temp)} F</h4>
                <h5 className="whiteText">Feels like: {this.KelvintoFahrenheit(this.props.main.feels_like)} F</h5>
                <h4 className="whiteText">Wind speed: {this.props.wind.speed * 2.237}</h4>
            </div>
        );
    };
}

export default weather;