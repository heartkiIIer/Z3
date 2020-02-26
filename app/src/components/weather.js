import React from 'react';

class WeatherHome extends React.Component {
    constructor(props){
        super(props);
    }

    KelvintoFahrenheit(temp){
        return Math.floor((temp - 273.15) * 9 / 5 + 32);
    }

    render(){
        return (
            <div>
                <h2 className="whiteText">Today's Weather</h2>
                <h5 className="whiteText">Location: {this.props.city}</h5>
                <h4 className="whiteText" style={{marginTop: "20 px"}}>{this.props.weather.description.charAt(0).toUpperCase() + this.props.weather.description.slice(1)}</h4>
                <h4 className="whiteText">Current Temperature: {this.KelvintoFahrenheit(this.props.main.temp)}&#x2109</h4>
                <h5 className="whiteText">Feels like: {this.KelvintoFahrenheit(this.props.main.feels_like)}&#x2109</h5>
                <h4 className="whiteText" style={{marginTop: "20 px"}}>Wind speed: {Math.floor(this.props.wind.speed * 2.237)} MPH</h4>
            </div>
        );
    };
}

export default WeatherHome;