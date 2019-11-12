import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';

export default class DoubleButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }
    list () {
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents(10)
                .then(({result}: any) => {
                    console.log(result.items);
                });
    }

    render(): ReactNode {
        return (
            <div>
                <ul>
                    <li>
                        <button class='btn' onClick={(e) => this.handleItemClick(e, 'sign-in')}>
                            Sync with Google Calendar
                        </button>
                    </li>
                    <br/>
                    <li>
                        <button class='btn' onClick={(e) => this.handleItemClick(e, 'sign-out')}>
                            Sign out from your Google Account
                        </button>
                    </li>
                </ul>
            </div>

        );
    }
}
