import React from 'react';
import "../../styles/ItsBedtime.css";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class ChronoResults extends React.Component {

    render(){
        return (
            <div class = "content settings">
                <div class = "inner">
                    <div className="grid-container">
                        <div className="grid-x" >
                            <div className="cell small-12">
                                <h2 ><b>Your Chronotype Results</b></h2>
                            </div>
                        </div>

                        <div className="grid-x align-center">
                            <div className="small-12 cell">
                                <h3>Chronotype Score: <span
                                    id="sliderInput">chronVal</span></h3>
                            </div>
                            <div className="small-12 cell">
                                <p>chronMessage</p>
                            </div>
                        </div>

                        <div className="grid-x align-left">
                            <div className="small-2 large-offset-1 cell">Evening (13)</div>
                            <div className="small-2 small-offset-8 large-offset-7 cell">Morning (55)</div>
                        </div>
                        <div className="grid-x align-center">
                            <div className="large-10 cell">
                                <div id="data-slider" className="slider" data-slider data-start="13"
                                     data-initial-start="{$chronVal}" data-end="55" data-step="1">
                                    <span className="slider-handle" id="slider-handle" data-slider-handle role="slider"
                                          tabIndex="0" aria-controls="sliderInput" aria-valuemax="55" aria-valuemin="13"
                                          aria-orientation="horizontal"></span>
                                    <span className="slider-fill"></span>
                                </div>
                            </div>
                        </div>

                        <div className="grid-x">
                            <div className="large-3 cell">
                                <input id="resubmit-chron" name="resubmit-chron" type="button"
                                       className="button large expanded default-button-login shadow-d2"
                                       value="Retake Chronotype Test" />
                            </div>
                            <div className="large-3 large-offset-6 cell">
                                <input id="return-dashboard" name="return-dashboard" type="button"
                                       className="button large expanded default-button-login shadow-d2" value="Done"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default ChronoResults;
