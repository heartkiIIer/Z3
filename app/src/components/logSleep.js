import React, { Component } from 'react';
import '../styles/ItsBedtime.css'
import TimePicker from 'react-time-picker';

class LogSleep extends React.Component{
    state = {
        time: '10:00',
    }

    onChange = time => this.setState({ time })

    render(){
        return (
            <div class = "content settings">
                <div class = "inner">
                    <h1 class = "blueHeader" align='center'>Log Sleep</h1>
                    <div class = "time" align='center'>
                        <h3 class = "blueHeader" align='center'> When did you go to sleep?</h3>
                        <TimePicker
                            onChange={this.onChange}
                            value={this.state.time}
                        />
                    </div>
                    <div className="time" align='center'>
                        <h3 className="blueHeader" align='center'> When did you wake up?</h3>
                        <TimePicker
                            onChange={this.onChange}
                            value={this.state.time}
                        />
                    </div>
                    <div className="time" align='center'>
                        <h3 className="blueHeader" align='center'>Total time asleep:</h3>
                    </div>
                </div>
            </div>
        );
    };
}
export default LogSleep;