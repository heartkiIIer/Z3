import React, {useState, useEffect, useRef, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { Tab } from 'semantic-ui-react'
import Item from './Item'

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
            <br/>
            <i><p>You must be logged into your Google Calendar to access this utility.</p></i>
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

async function fetchItems() {
    const result = await ApiCalendar.listUpcomingEvents(10);
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
        <Tab.Pane style={{overflow: 'auto', maxHeight: 500 }} attached={false}>
            <h5>Rate stress level for each event</h5>
            <button className='btn-info' onClick={() => window.location.reload()}>Refresh to Sync</button>
            <br/><br/>
            {items.map(item => (
                <Item key={item.id} itemSum={item.summary} itemStart={item.start.dateTime} itemEnd={item.end.dateTime} />
            ))}
            <button className='btn-success'>Fetch More Events</button>
            <br/>
        </Tab.Pane>
            <div className='float_center'>
                <div className='child'>
                    <button className='btn'>Submit Stress</button>
                    {button}
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    )
}

