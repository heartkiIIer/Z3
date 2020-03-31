import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { withStyles} from '@material-ui/core/styles';
import moment from "moment";
import {getUserID} from "../scripts/login";

const buttonStyle = {
    borderRadius: '5px'
}

const stresslevel = [
    {
        value: 0,
        label: 'Low',
    },
    {
        value: 50,
        label: 'Medium',
    },
    {
        value: 98,
        label: 'High',
    }
];

const PrettoSlider = withStyles({
    root: {
        color: 'mediumpurple',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)'
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    }
})(Slider);

let datesArray = [];

const Item = props => {
    let date = props.itemStart.slice(0, 10)
    let dayOfWeek = '(' + String(moment(date)).slice(0, 3)
    let summary = props.itemSum
    let year = props.itemStart.slice(0, 4)
    let month = props.itemStart[5] + props.itemStart[6]
    switch (month) {
        case '01':
            month = "Jan ";
            break;
        case '02':
            month = "Feb ";
            break;
        case '03':
            month = "Mar ";
            break;
        case '04':
            month = "Apr ";
            break;
        case '05':
            month = "May ";
            break;
        case '06':
            month = "Jun ";
            break;
        case '07':
            month = "Jul ";
            break;
        case '08':
            month = "Aug ";
            break;
        case '09':
            month = "Sep ";
            break;
        case '10':
            month = "Oct ";
            break;
        case '11':
            month = "Nov ";
            break;
        case '12':
            month = "Dec ";
            break;
    }
    let day = props.itemStart[8] + props.itemStart[9] + ','
    let startTime = props.itemStart.slice(11, 16)
    let endTime = props.itemEnd.slice(11, 16)
    let time = startTime + ' - ' + endTime + ')'
    const [visible, setVisible] = useState(true);
    const [fading, setFading]   = useState(false);

    function hideMe() {
        setFading(true);
        setTimeout(() => setVisible(false), 650);
    }

    return (
        <div isvisible={!fading} style={visible ? null : { display: "none" }}>
            <Typography id="discrete-slider-restrict" gutterBottom>
                <b class="title">{summary}</b> <span class="dayOfWeek">{dayOfWeek}</span> <i class="time">{month} {day} {year}</i> {time}
                <button class="btn-danger" style={buttonStyle} onClick={hideMe}>Hide</button>
            </Typography>
            <PrettoSlider id="myslider" aria-label="pretto slider" defaultValue={50}
                          step={null} marks={stresslevel}/>
            <br/>
        </div>
    );
}

export default Item;