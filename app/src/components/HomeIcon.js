import React, {SyntheticEvent} from 'react';
import '../styles/home.css'

class HomeIcon extends React.Component {
    constructor(props) {
        super(props);
        if(window.innerWidth >= 580){
            this.state = {
                height: "20vh",
                width: "20vh",
            };
        }
        else{
            this.state = {
                height: "30vw",
                width: "30vw",
            };
        }
    }
    //re-adjust icon size if the window is smaller than 580 px
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 580){
                this.setState({
                    height: "30vw",
                    width: "30vw"
                });
            }
            else {
                this.setState({
                    height: "20vh",
                    width: "20vh"
                })
            }
        })
    }
    render(){
        this.resize();
        const styles = {
            containerStyle:{
                height: this.state.height,
                width: this.state.width,
            }
        };
        const { containerStyle } = styles;
        return (
            <span style={containerStyle} id={this.props.spanID} className="dot_h">
                <div style={containerStyle} className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div className={this.props.iconClass}>hello</div>
                        </div>
                        <div className="flip-card-back">
                            <span style={containerStyle} className="dot_h text d-flex align-items-center justify-content-center">
                                {this.props.iconInfo}
                            </span>
                        </div>
                    </div>
                </div>
            </span>
        );
    };
}
export default HomeIcon;