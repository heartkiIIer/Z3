import React, {useState, useEffect, useRef, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Tab } from 'semantic-ui-react'
import Item from './Item'
import {getUserID} from "../scripts/login";
import swal from 'sweetalert'
import Swal from "sweetalert2";

const refresh = {
    paddingRight: '6px',
    fontSize: '175%'
}

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: ApiCalendar.sign
        };
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
        })
    }

    signUpdate(sign: boolean): any {
        this.setState({
            sign: ApiCalendar.sign
        })
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }

    render() {
        const isLoggedIn = this.state.sign;
        console.log(ApiCalendar.sign)
        let ele;

        if (isLoggedIn) {
            ele = <Display/>;
        } else {
            ele = <LoginButton onClick={(e) => this.handleItemClick(e, 'sign-in')} />;
        }

        return (
            <div>
                {ele}
            </div>);
    }
}

let LoginControlClass = new LoginControl()

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.fetchItems = this.fetchItems.bind(this);
        this.state = {
            items: []
        };
    }

    async fetchItems() {
        const result = await ApiCalendar.listUpcomingEvents(250);
        // console.log(result.result.items[result.result.items.length-1].start);
        let approved = [];
        let todayDate = new Date().getDate();
        let todayMonth = new Date().getMonth();
        let todayYear = new Date().getFullYear();
        for(let i = 0; i < result.result.items.length; i++) {
            let calEvent = result.result.items[i].start.dateTime;
            let calDate = new Date(calEvent).getDate();
            let calMonth = new Date(calEvent).getMonth();
            let calYear = new Date(calEvent).getFullYear();
            if(calDate == todayDate && calMonth == todayMonth && calYear == todayYear) {
                approved.push(result.result.items[i])
            }
        }
        approved = approved.map(({summary, start, end}) => ({summary, start, end}));
        this.setState({items: []})
        this.setState({items: approved})
    }

    componentDidMount(): void {
        this.fetchItems();
    }

    render() {
        let ele;
        if (this.state.items.length != 0) {
            ele = <div id='calevent'>{this.state.items.map(item => (<Item key={item.id} itemSum={item.summary} itemStart={item.start.dateTime} itemEnd={item.end.dateTime} />))}</div>
        } else {
            ele = <i><p>You have no upcoming events for today.</p></i>;
        }

        return (
            <div>
                <Tab.Pane id="mainTab" style={{overflow: 'auto', maxHeight: 500 }} attached={false}>
                    <h5>Rate stress level for each event</h5>
                    <button className='btn-info' onClick={this.fetchItems}><RefreshIcon style={refresh}/></button>
                    <br/><br/>
                    <i><p>Upcoming events of the day will be listed. Click the Refresh icon to unhide events and sync latest/newly added events from the calendar.</p></i>
                    <br/>
                    {ele}
                </Tab.Pane>
                <div className='float_center'>
                    <div className='child'>
                        <button className='btn' onClick={submitStressEntry}>Submit Stress</button>
                        <LogoutButton onClick={(e) => LoginControlClass.handleItemClick(e, 'sign-out')} />
                        <br/><br/><br/>
                    </div>
                </div>
            </div>
        );
    }
}

function LoginButton(props) {
    return (
        <div>
            <Tab.Pane attached={false}>
                <h5>Rate stress level for each event</h5>
                <br/><br/>
                <i><p>You need to be logged into your Google Calendar to access this utility.</p></i>
            </Tab.Pane>
            <div className='float_center'>
                <div className='child'>
                    <button className='btn' id='extended' onClick={props.onClick}>
                        Sync with Google Calendar
                    </button>
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    );
}

function LogoutButton(props) {
    return (
        <button className='btn' onClick={props.onClick}>
            Sign out from your Google Calendar
        </button>
    );
}


function getStress(events) {
    let idPromise = getUserID();
    let today = new Date();
    idPromise.then((uid)=>{
        const data = JSON.stringify({uid: uid, month: today.getMonth(), day: today.getDate(), year: today.getFullYear()});
        fetch('https://sleepwebapp.wpi.edu:5000/getStressByDate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            return r.json();
        }).then( r => {
                console.log(r);
                let isduplicate = false;
                let duplicatesArray = [];
                for (let i = 0; i < events.length; i++) {
                    for (let j = 0; j < r.length; j++) {
                        if(events[i].title === r[j].event && events[i].day === r[j].day && events[i].month === r[j].month && events[i].year === r[j].year) {
                            isduplicate = true;
                            duplicatesArray.push('<b>' + events[i].title + '</b>')
                            //break;
                        }
                    }
                }
                let duplicates = ''
                for (let i = 0; i < duplicatesArray.length; i++) {
                    if(i === duplicatesArray.length - 2) {
                        duplicates += duplicatesArray[i] + ", and "
                    } else if (i === duplicatesArray.length - 1){
                        duplicates += duplicatesArray[i] + ". "
                    } else {
                        duplicates += duplicatesArray[i] + ", "
                    }
                }
                if(isduplicate){
                    Swal.fire({
                        title: "Warning: Duplicate Events",
                        icon: "warning",
                        html: "You have already logged and submitted these events: " + duplicates + "You can choose not to re-submit these events by clicking on <i>Hide</i>. Otherwise your old data will be overwritten upon submission.",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, overwrite!',
                        cancelButtonColor: '#d33'
                    }).then(result => {
                            if(result.value) {
                                addStresstoDatabase(events);
                            }
                        }
                    )
                }
                else{
                    addStresstoDatabase(events);
                }
            }
        )
    })
}

function submitStressEntry() {
    let events = []
    let parentElement = document.getElementById('mainTab').children
    console.log("Title:" + parentElement[6].children[0].children[0].innerText)
    console.log("Year:" + parentElement[6].children[0].children[2].innerText.slice(-4))
    console.log("Month:" + parentElement[6].children[0].children[2].innerText.slice(0, 3))
    console.log("Day:" + parentElement[6].children[0].children[2].innerText.slice(4, 6))
    console.log("Date:" + parentElement[6].children[0].children[1].innerText.slice(1, 4))
    console.log("Value:" + parentElement[6].children[0].children[2])
    for (let i = 6; i < parentElement.length; i++) {
        let month = parentElement[i].children[0].children[2].innerText.slice(0, 3);
        let date = parentElement[i].children[0].children[1].innerText.slice(1, 4);
        switch (date) {
            case 'Mon':
                date = 1;
                break;
            case 'Tue':
                date = 2;
                break;
            case 'Wed':
                date = 3;
                break;
            case 'Thu':
                date = 4;
                break;
            case 'Fri':
                date = 5;
                break;
            case 'Sat':
                date = 6;
                break;
            case 'Sun':
                date = 7;
                break;
        }
        switch (month) {
            case 'Jan':
                month = 1;
                break;
            case 'Feb':
                month = 2;
                break;
            case 'Mar':
                month = 3;
                break;
            case 'Apr':
                month = 4;
                break;
            case 'May':
                month = 5;
                break;
            case 'Jun':
                month = 6;
                break;
            case 'Jul':
                month = 7;
                break;
            case 'Aug':
                month = 8;
                break;
            case 'Sep':
                month = 9;
                break;
            case 'Oct':
                month = 10;
                break;
            case 'Nov':
                month = 11;
                break;
            case 'Dec':
                month = 12;
                break;
        }
        events.push({
                title: parentElement[i].children[0].children[0].innerText,
                year: parseInt(parentElement[i].children[0].children[2].innerText.slice(-4)),
                month: month,
                day: parseInt(parentElement[i].children[0].children[2].innerText.slice(4, 6)),
                date: date,
                value: parseInt(parentElement[i].children[0].children[2].value)
            }
        );
    }
    console.log(events);
    getStress(events)

}

function addStresstoDatabase(events){
    let idPromise = getUserID();
    idPromise.then(uid=>{
        events.forEach(event => {
            fetch('https://sleepwebapp.wpi.edu:5000/users/newstress/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: event.title,
                    year: event.year,
                    month: event.month,
                    day: event.day,
                    date: event.date,
                    value: event.value,
                    uid: uid
                })
            }).then(r=>{
                if(r.status === 200){
                    swal({
                        title: "Success",
                        icon: "success",
                        text: "New stress entries have been logged."
                    })
                }
            })
        })
    });
}


