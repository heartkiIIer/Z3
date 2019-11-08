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
                Event 1: Exam
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50}
                          valueLabelFormat={label}
                          getAriaValueText={label}
                          step={null}
                          marks={marks}/>
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Event 2: Presentation
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={2}
                          valueLabelFormat={label}
                          getAriaValueText={label}
                          step={null}
                          marks={marks}/>
            <div className={classes.margin} />
            <Typography id="discrete-slider-restrict" gutterBottom>
                Event 3: Meeting
            </Typography>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={98}
                          valueLabelFormat={label}
                          getAriaValueText={label}
                          step={null}
                          marks={marks}/>
            <div className={classes.margin} />
        </Paper>
    );
}