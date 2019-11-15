import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
        padding: theme.spacing(3),
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 2,
        label: 'Small',
    },
    {
        value: 50,
        label: 'Medium',
    },
    {
        value: 98,
        label: 'Large',
    }
];

const hours = [
    {
        value: 2,
        label: 0
    },
    {
        value: 10,
        label: 1
    },
    {
        value: 20,
        label: 2
    },
    {
        value: 30,
        label: 3
    },
    {
        value: 40,
        label: 4
    },
    {
        value: 50,
        label: 5
    },
    {
        value: 60,
        label: 6
    },
    {
        value: 70,
        label: 7
    },
    {
        value: 80,
        label: 8
    },
    {
        value: 90,
        label: 9
    },
    {
        value: 98,
        label: 10
    }
];

function label(label) {
    return `${label}`;
}

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
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function CustomizedSlider() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Duration of Exercise (minutes)
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Duration of Exercise (hours)
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={2}
                          step={null}
                          marks={hours}/>
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Cups of Coffee Consumed
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={2}
                          step={null}
                          marks={hours}/>
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Largest Coffee Cup Size
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={98}
                          step={null}
                          marks={marks}/>
            <div className={classes.margin} />
        </Paper>
    );
}