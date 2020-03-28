import React, {ReactNode, SyntheticEvent, useEffect, useRef, useState} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import {Tab} from "semantic-ui-react";
import RefreshIcon from "@material-ui/icons/Refresh";
import Item from "./Item";

const refresh = {
    paddingRight: '6px',
    fontSize: '175%'
}

export default class StatusSign extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            sign: ApiCalendar.sign,
        };
        this.signUpdate = this.signUpdate.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }

    signUpdate(sign: boolean): any {
        this.setState({
            sign
        })
    }

    render(): ReactNode {
        return (
            <Display/>
        );
    }
}

async function fetchItems() {
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
    return approved.map(({summary, start, end}) => ({summary, start, end}));
}

function LogoutButton(props) {
    return (
        <button className='btn' onClick={props.onClick}>
            Sign out from your Google Calendar
        </button>
    );
}

function Display() {
    const [items, saveItems] = useState([]);
    const isMounted = useRef(true);

    let button = <LogoutButton onClick={(e) => LoginControlClass.handleItemClick(e, 'sign-out')} />;

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        (async () => {
            const items = await fetchItems();
            //Do not update state if component is unmounted
            if (isMounted.current) {
                saveItems(items);
            }
        })();
    }, []);

    if (items.length != 0) {
        return (
            <div>
                <Tab.Pane id="mainTab" style={{overflow: 'auto', maxHeight: 500 }} attached={false}>
                    <h5>Rate stress level for each event</h5>
                    <button className='btn-info' onClick={() => window.location.reload()}><RefreshIcon style={refresh}/></button>
                    <br/><br/>
                    <i><p>Upcoming events of the day will be listed. Click the Refresh icon to unhide events and sync latest/newly added events from the calendar.</p></i>
                    <br/><br/>
                    {items.map(item => (
                        <Item key={item.id} itemSum={item.summary} itemStart={item.start.dateTime} itemEnd={item.end.dateTime} />
                    ))}
                </Tab.Pane>
                <div className='float_center'>
                    <div className='child'>
                        <button className='btn' onClick={submitStressEntry}>Submit Stress</button>
                        {button}
                        <br/><br/><br/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Tab.Pane id="mainTab" style={{overflow: 'auto', maxHeight: 500 }} attached={false}>
                    <h5>Rate stress level for each event</h5>
                    <button className='btn-info' onClick={() => window.location.reload()}><RefreshIcon style={refresh}/></button>
                    <br/><br/>
                    <i><p>Upcoming events of the day will be listed. Click the Refresh icon to unhide events and sync latest/newly added events from the calendar.</p></i>
                    <br/>
                    <i><p>You have no upcoming events for today.</p></i>
                </Tab.Pane>
                <div className='float_center'>
                    <div className='child'>
                        {button}
                        <br/><br/><br/>
                    </div>
                </div></div>
        )
    }

}