import React from 'react';
import '../styles/logSleep.css'
import SideBar from "./sideMenu";
import {getUserID} from "../scripts/login";
import Swal from "sweetalert2";

class sleep extends React.Component{
    constructor(props) {
        super(props);
        if(window.innerWidth >= 700){
            this.state = {
                padding: '75px 75px 40px'
            };
        }
        else{
            this.state = {
                padding: '10% 10% 5%'
            };
        }
    }

    componentDidMount() {
        let idPromise = getUserID();
        idPromise.then().catch(err =>{
            window.location.replace("https://sleepwebapp.wpi.edu/");
        });
    }

    displayInfo(){
        Swal.fire({
            title: '<strong><u>Log Sleep Tips</u></strong>',
            icon: 'info',
            html:
                "<ul><li>Be sure to log your sleep time before you go to bed every night.</li>" +
                "<li>Be sure to log your wake time every morning after you wake up.</li>" +
                "<li>It is important that you log your sleep time when you go to sleep " +
                "<b>before</b> you log your wake time when you wake up so that your total hours of sleep " +
                "will be calculated precisely. </li>" +
                "<li>If you log your sleep multiple times before you go to bed, " +
                "only the <b>latest</b> logged sleep time will be used in the calculation " +
                "for your total hours of sleep for that night.</li></ul>",
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
        })
        document.getElementById('swal2-content').style.textAlign = 'initial';
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
        const style = {
            fontSize: '36px',
            color: '#3e98c7',
            marginRight: '0px'
        }
        return (
            <div className="content logSleep" id="App">
                <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
                <div className="middle">
                    <div className="inner" id="page-wrap">
                        <div class = "new-time" align='center'>
                            <div align='end'>
                                <a href='javascript:undefined' onClick={this.displayInfo}><i className="material-icons" style={style}>info_outline</i></a>
                            </div>
                            <h2 className="newsleepHeader" align='center'>Waking up?</h2>
                            <a href="/LogWake"><button className='btn'>Log wake time</button></a>
                            <br/>
                            <hr/>
                            <br/>
                            <h2 className="newsleepHeader" align='center'>Going to Sleep?</h2>
                            <a href="/LogSleep"><button className='btn'>Log sleep time</button></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default sleep;