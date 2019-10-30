import React from 'react';

class Landing extends React.Component {
    render(){
        return (
            <div>
                <div Class="container">
                    <div id="Heading">
                        <div id="login">
                            <h1>Login</h1>
                        </div>

                        <div id="title">
                            <h1>Title</h1>
                        </div>
                    </div>

                    <div id="Features" Class="row">
                        <h1>Features</h1>
                    </div>

                    <div id="CalSch" Class="row featurette">
                        <h1>Calendar</h1>
                    </div>

                    <div id="Exercise" Class="row featurette">
                        <h1>Exercise</h1>
                    </div>

                    <div id="MindPerson" Class="row featurette">
                        <h1>Mindfulness</h1>
                    </div>
                </div>
            </div>
        );
    };
}
export default Landing;