import React from 'react';
import "../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the tiles for the mindfulness modules navigation page.
 * */

class MobileTile extends React.Component {
    nomarg = {
        margin: '0px 0px 20px 0px',
    };

    render(){
        return (
            <div class = "tile" style={this.nomarg}>
                <h4> {this.props.name}</h4>
            </div>
        );
    };
}
export default MobileTile;
