import React from 'react';
import "../../styles/ItsBedtime.css";

/**
 * @author Eliazbeth Del Monaco
 * This component renders the tiles for the mindfulness modules navigation page.
 * */

class Tile extends React.Component {

    constructor(props){
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                marginLeft: '43px'
            };
        }
        else{
            this.state = {
                marginLeft: '23px'
            };
        }
    }

    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    marginLeft: '23px'
                });
            }
            else {
                this.setState({
                    marginLeft: '43px'
                })
            }
        })
    }

    render(){
        this.resize();
        const styles = {
            containerStyle:{
                marginLeft: this.state.marginLeft,
            }
        };
        const { containerStyle } = styles;
        return (
            <div style={containerStyle} class = "tile">
                <h4> {this.props.name}</h4>
            </div>
        );
    };
}
export default Tile;
