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

    list() {
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents(10)
                .then(({result}: any) => {
                    for (let i = 0; i < result.items.length; i++) {
                        console.log('Event: ' + result.items[i].summary);
                        let startday = result.items[i].start.dateTime.slice(0,10).slice(8,10);
                        let startmonth = result.items[i].start.dateTime.slice(0,10).slice(5,7);
                        let startyear = result.items[i].start.dateTime.slice(0,10).slice(0,4);
                        let endday = result.items[i].end.dateTime.slice(0,10).slice(8,10);
                        let endmonth = result.items[i].end.dateTime.slice(0,10).slice(5,7);
                        let endyear = result.items[i].end.dateTime.slice(0,10).slice(0,4);
                        switch (startmonth) {
                            case '01':
                                startmonth = "January";
                                break;
                            case '02':
                                startmonth = "February";
                                break;
                            case '03':
                                startmonth = "March";
                                break;
                            case '04':
                                startmonth = "April";
                                break;
                            case '05':
                                startmonth = "May";
                                break;
                            case '06':
                                startmonth = "June";
                                break;
                            case '07':
                                startmonth = "July";
                                break;
                            case '08':
                                startmonth = "August";
                                break;
                            case '09':
                                startmonth = "September";
                                break;
                            case '10':
                                startmonth = "October";
                                break;
                            case '11':
                                startmonth = "November";
                                break;
                            case '12':
                                startmonth = "December";
                                break;
                            default:
                                startmonth = "No value found";
                        }
                        switch (endmonth) {
                            case '01':
                                endmonth = "January";
                                break;
                            case '02':
                                endmonth = "February";
                                break;
                            case '03':
                                endmonth = "March";
                                break;
                            case '04':
                                endmonth = "April";
                                break;
                            case '05':
                                endmonth = "May";
                                break;
                            case '06':
                                endmonth = "June";
                                break;
                            case '07':
                                endmonth = "July";
                                break;
                            case '08':
                                endmonth = "August";
                                break;
                            case '09':
                                endmonth = "September";
                                break;
                            case '10':
                                endmonth = "October";
                                break;
                            case '11':
                                endmonth = "November";
                                break;
                            case '12':
                                endmonth = "December";
                                break;
                            default:
                                endmonth = "No value found";
                        }
                        let newStartFormat = startmonth + ' ' + startday + ', ' + startyear;
                        let newEndFormat = endmonth + ' ' + endday + ', ' + endyear;
                        // console.log('Start: ' + result.items[i].start.dateTime.slice(0,10));
                        // console.log('End: ' + result.items[i].end.dateTime.slice(0,10));
                        console.log('Start: ' + newStartFormat);
                        console.log('End: ' + newEndFormat);
                        console.log('-----');
                    }
                   // console.log(result.items)
                });
    }

    render(): ReactNode {
        return (
            <div>
                <button className='btn' id = "extended" onClick={(e) => this.handleItemClick(e, 'sign-in')}>
                    Sync with Google Calendar
                </button>
                {/*<ul >*/}
                {/*    <li>*/}
                {/*        <button className='btn' onClick={(e) => this.handleItemClick(e, 'sign-in')}>*/}
                {/*            Sync with Google Calendar*/}
                {/*        </button>*/}
                {/*    </li>*/}
                {/*    <br/>*/}
                    {/*<li>*/}
                    {/*    <button class='btn' onClick={(e) => this.handleItemClick(e, 'sign-out')}>*/}
                    {/*        Sign out from your Google Account*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button className='btn' onClick={(e) => this.list(e)}>*/}
                    {/*        List Events*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                {/*</ul>*/}
            </div>

        );
    }
}
