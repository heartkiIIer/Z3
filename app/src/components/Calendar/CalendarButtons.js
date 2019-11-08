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

    render(): ReactNode {
        return (
            <div>
                <button onClick={(e) => this.handleItemClick(e, 'sign-in')}>
                    sign-in
                </button>
                <button onClick={(e) => this.handleItemClick(e, 'sign-out')}>
                    sign-out
                </button>
            </div>

    );
    }
}








// import React from 'react'
// import {authorizeHandler, signOutHandler} from "../scripts/script";
//
// const calendarcomponents = () =>  {
//     return (<div>
//         <button onClick={authorizeHandler} >Authorize</button>
//         <button onClick={signOutHandler} >Sign Out</button>
//     </div>)
// }
//
//
// export default calendarcomponents