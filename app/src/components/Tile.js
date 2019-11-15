import React from 'react';
import "../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the tiles for the mindfulness modules navigation page.
 * */

class Tile extends React.Component {

    render(){
        return (
            <div class = "tile">
                <h4> {this.props.name}</h4>
            </div>
        );
    };
}
export default Tile;
