import React, {useState, useEffect, useRef, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Tab } from 'semantic-ui-react'
import Item from './Item'

const refresh = {
    fontSize: '250%'
}

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: ApiCalendar.sign
        };
    }

    componentDidMount() {
        let currentComponent = this;
        this.isSignIn(currentComponent);
    }

    isSignIn(currentComponent){
        currentComponent.signUpdate = currentComponent.signUpdate.bind(currentComponent);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(currentComponent.signUpdate);
        });
    }


    signUpdate(sign: boolean): any {
        this.setState({
            sign
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
        console.log(isLoggedIn)
        let ele;

        if (isLoggedIn) {
            ele = <Display/>;
        } else {
            ele = <LoginButton onClick={(e) => this.handleItemClick(e, 'sign-in')} />;
        }

        return (
            <div>
                {ele}
            </div>
        );
    }
}

let LoginControlClass = new LoginControl()

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

function submitStressEntry() {
    let parentElement = document.getElementById('mainTab').children
    let events = []
    for (let i = 5; i < parentElement.length; i++) {
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
                value: parseInt(parentElement[i].children[1].children[2].value)
            }
            );
    }
    console.log(parentElement[5].children[0].children[1]);
    console.log(events);

    // fetch('http://sleepwebapp.wpi.edu:5000/users/newcaf/', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         cups: cups,
    //         cupSize: cupSize
    //     })
    // })
}

async function fetchItems() {
    const result = await ApiCalendar.listEvents(3);
    return result.result.items.map(({summary, start, end}) => ({summary, start, end}));
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

    return (
        <div>
            <Tab.Pane id="mainTab" style={{overflow: 'auto', maxHeight: 500 }} attached={false}>
                <h5>Rate stress level for each event</h5>
                <button className='btn-info' onClick={() => window.location.reload()}><RefreshIcon style={refresh}/></button>
                <br/><br/><br/>
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
}

