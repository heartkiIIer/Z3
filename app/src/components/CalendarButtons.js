import React, {SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import Display from "./Display";

let DisplayClass = new Display();

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: DisplayClass.state,
        };
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
       document.getElementsByClassName("logout").style.opacity = '0'
    }

    render() {
        const isLoggedIn = this.state.sign;
        console.log(isLoggedIn)
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={(e) => this.handleItemClick(e, 'sign-out')} />;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}

