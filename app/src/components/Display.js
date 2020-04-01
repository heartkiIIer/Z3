import React, {useState, useEffect, useRef, SyntheticEvent} from 'react';
import update from 'react-addons-update'
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
        approved = approved.map(({summary, start, end, etag}) => ({summary, start, end, etag}));
        let idPromise = getUserID();
        idPromise.then((uid)=>{
            const data = JSON.stringify({uid: uid, month: todayMonth, day: todayDate, year: todayYear});
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
                    this.setState({items: []})
                    this.setState({items: approved})
                    let currentItems = this.state.items
                    for (let i = 0; i < this.state.items.length; i++) {
                        for (let j = 0; j < r.length; j++) {
                            let day = this.state.items[i].start.dateTime[8] +  this.state.items[i].start.dateTime[9]
                            let month = this.state.items[i].start.dateTime[5] + this.state.items[i].start.dateTime[6]
                            switch (day) {
                                case '01':
                                    day = 1;
                                    break;
                                case '02':
                                    day = 2;
                                    break;
                                case '03':
                                    day = 3;
                                    break;
                                case '04':
                                    day = 4;
                                    break;
                                case '05':
                                    day = 5;
                                    break;
                                case '06':
                                    day = 6;
                                    break;
                                case '07':
                                    day = 7;
                                    break;
                                case '08':
                                    day = 8;
                                    break;
                                case '09':
                                    day = 9;
                                    break;
                            }
                            switch (month) {
                                case '01':
                                    month = 1;
                                    break;
                                case '02':
                                    month = 2;
                                    break;
                                case '03':
                                    month = 3;
                                    break;
                                case '04':
                                    month = 4;
                                    break;
                                case '05':
                                    month = 5;
                                    break;
                                case '06':
                                    month = 6;
                                    break;
                                case '07':
                                    month = 7;
                                    break;
                                case '08':
                                    month = 8;
                                    break;
                                case '09':
                                    month = 9;
                                    break;
                                case '10':
                                    month = 10;
                                    break;
                                case '11':
                                    month = 11;
                                    break;
                                case '12':
                                    month = 12;
                                    break;
                            }
                            if(this.state.items[i].summary === r[j].event && day == r[j].day && month === r[j].month && this.state.items[i].start.dateTime.slice(0, 4) == r[j].year) {
                                currentItems[i].etag = r[j].stress
                                console.log(r[j].event + ' = ' + this.state.items[i].summary + ': ' + this.state.items[i].etag)
                            } else {
                                currentItems[i].etag = 50
                            }
                        }
                    }
                    console.log(currentItems)
                    this.setState({items: currentItems})
                    console.log(this.state.items)
                }
            )
        })
    }

    componentDidMount(): void {
        this.fetchItems();
    }

    render() {
        let ele;
        if (this.state.items.length != 0) {
            ele = <div id='calevent'>{this.state.items.map(item => (<Item key={item.id} itemSum={item.summary} itemStart={item.start.dateTime} itemEnd={item.end.dateTime} itemValue={item.etag}/>))}</div>
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
    let parentElement = document.getElementById('calevent').children
    let titleList = document.getElementsByClassName("title")
    let dayOfWeekList = document.getElementsByClassName("dayOfWeek")
    let timeList = document.getElementsByClassName("time")
    for (let i = 0; i < parentElement.length; i++) {
        let month = timeList[i].innerText.slice(0, 3);
        let date = dayOfWeekList[i].innerText.slice(1, 4);
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
                title: titleList[i].innerText,
                year: parseInt(timeList[i].innerText.slice(-4)),
                month: month,
                day: parseInt(timeList[i].innerText.slice(4, 6)),
                date: date,
                value: parseInt(parentElement[i].children[1].children[2].value)
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


