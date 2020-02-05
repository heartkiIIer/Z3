import React, {SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: ApiCalendar.sign,
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

    list() {
        let events = new Set()
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents(10)
                .then(({result}: any) => {
                    events.add(result.items);
                    console.log(result.items)
                });
    }

    render() {
        const isLoggedIn = this.state.sign;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={(e) => this.handleItemClick(e, 'sign-out')} />;
        } else {
            button = <LoginButton onClick={(e) => this.handleItemClick(e, 'sign-in')} />;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}

function LoginButton(props) {
    return (
        <button className='btn' id='extended' onClick={props.onClick}>
            Sync with Google Calendar
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button className='btn' id='extended' onClick={props.onClick}>
            Sign out from your Google Calendar
        </button>
    );
}

