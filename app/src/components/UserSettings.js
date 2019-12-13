import React from 'react';
import "../styles/awesome-bootstrap-checkbox-master/awesome-bootstrap-checkbox.css";
import "../styles/ItsBedtime.css";
import SaveButton from "../resources/icons/save-solid.svg";
import EditButton from "../resources/icons/edit-solid.svg";
import DeleteButton from "../resources/icons/minus-circle-solid.svg";
import SideBar from "./sideMenu";
import CalendarButtons from "./CalendarButtons";


/**
 * @author Eliazbeth Del Monaco
 * This component renders the user settings page.
 * */

/* Source : https://pixabay.com/photos/bed-linen-sheets-cover-pillows-731162/
* **/

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px',
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%',
            };
        }
    }
    resize(){
        window.addEventListener('resize', ()=> {
            if(window.innerWidth < 700){
                this.setState({
                    padding: '10% 10% 5%'
                });
            }
            else {
                this.setState({
                    padding: '75px 75px 40px'
                })
            }
        })
    }

    render(){
        this.resize();
        const styles = {
            containerStyle:{
                padding: this.state.padding,
            }
        };
        const { containerStyle } = styles;
        return (
            <div class = "content settings" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="inner" style={containerStyle} id="page-wrap">
                    <h1 class = "blueHeader"> Modify your settings</h1>
                    <hr class = "hr-settings"/>
                    <h3 class = "blueHeader"> Change password </h3>
                    <div class = "flex-row-wrap">
                        <p class = "blueHeader width80"> Enter old password: </p>
                        <input className='editMe' placeholder='old password'/>
                    </div>
                    <div className="flex-row-wrap">
                        <p className="blueHeader width80"> Enter new password: </p>
                        <input className='editMe' placeholder='new password'/>
                    </div>
                    <div className="flex-row-wrap">
                        <p className="blueHeader width80"> Re-enter new password: </p>
                        <input className='editMe' placeholder='new password'/>
                    </div>
                    <br/>
                    <button className='btn' id = "extended">
                        Confirm
                    </button>

                    <h3 className="blueHeader"> Change email </h3>
                    <div className="flex-row-wrap">
                        <p className="blueHeader width80"> Enter password: </p>
                        <input className='editMe' placeholder='password'/>
                    </div>
                    <div className="flex-row-wrap">
                        <p className="blueHeader width80"> Enter new email: </p>
                        <input className='editMe' placeholder='example@gmail.com'/>
                    </div>
                    <div className="flex-row-wrap">
                        <p className="blueHeader width80"> Re-enter new email: </p>
                        <input className='editMe' placeholder='example@gmail.com'/>
                    </div>
                    <br/>
                    <button className='btn' id="extended">
                        Confirm
                    </button>
                    <h1 className="blueHeader"> Account Access</h1>
                    <hr className="hr-settings"/>
                    <div class = "flex-row-wrap">
                        <CalendarButtons />
                        <button className='btn' id = "extended">
                            Remove FitBit Access
                        </button>
                    </div>

                    <h1 className="blueHeader"> Delete your account</h1>
                    <hr className="hr-settings"/>
                    <button className='btn' id = "extended">
                        Delete your account
                    </button>
                </div>
            </div>
        );
    };
}
export default UserSettings;
