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
                <h2>Today's Weather</h2>
                <h5>Location: {this.props.city}</h5>
                <h4>{this.props.weather.description}</h4>
                <h4>Current Temperature: {this.KelvintoFahrenheit(this.props.main.temp)} F</h4>
                <h5>Feels like: {this.KelvintoFahrenheit(this.props.main.feels_like)} F</h5>
                <h4>Wind speed: {this.props.wind.speed * 2.237}</h4>
            </div>
        );
    };
}
export default weather;