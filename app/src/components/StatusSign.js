import React, {ReactNode} from 'react';
import ApiCalendar from 'react-google-calendar-api';

export default class StatusSign extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            sign: ApiCalendar.sign,
        };
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    public signUpdate(sign: boolean): any {
        this.setState({
            sign
        })
    }

    render(): ReactNode {
        return (
            <div>{this.state.sign}</div>
        );
    }
}