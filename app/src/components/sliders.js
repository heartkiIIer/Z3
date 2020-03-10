import React from 'react'
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import '../styles/logging.css'
import Typography from '@material-ui/core/Typography';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import AccessTime from '@material-ui/icons/AccessTime';
import LocalCafe from '@material-ui/icons/LocalCafe';
import Delete from '@material-ui/icons/Delete';
import { Tab } from 'semantic-ui-react'
import LoginControl from "./Display";
import Display from "./Display";
import {getUserID} from "../scripts/login";
import swal from "sweetalert";

const cup = {
    fontSize: '250%'
}

const cupSize = [
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
        label: 'Large'
    }
];

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

const minutes = [
    {
        value: 0,
        label: 0
    },
    {
        value: 30,
        label: 30
    },
    {
        value: 60,
        label: 60
    },
    {
        value: 90,
        label: 90
    },
    {
        value: 120,
        label: 120
    },
    {
        value: 150,
        label: 150
    },
    {
        value: 180,
        label: 180
    }
];

const cups = [
    {
        value: 0,
        label: 0
    },
    {
        value: 2,
        label: 2
    },
    {
        value: 4,
        label: 4
    },
    {
        value: 6,
        label: 6
    },
    {
        value: 8,
        label: 8
    },
    {
        value: 10,
        label: 10
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
    },
})(Slider);

function submitExerciseEntry() {
    let intensity = document.getElementById('intensity').children[2].value;
    let minutes = document.getElementById('minutes').children[2].value;
    console.log(intensity);
    console.log(minutes);

    let idPromise = getUserID();
    idPromise.then(uid=>{
        fetch('https://sleepwebapp.wpi.edu:5000/users/newexer/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intensity: intensity,
                minutes: minutes,
                uid: uid
            })
        }).then(r=>{
            if(r.status === 200){
                swal({
                    title: "Success",
                    icon: "success",
                    text: "New exercise entry have been logged."
                })
            }
        }).then(()=>{
                document.getElementById('intensity').children[2].value = '50';
                document.getElementById('minutes').children[2].value = '90';
        })
    });
}

function submitCaffeineEntry() {
    let cups = document.getElementById('cups').children[2].value;
    let cupSize = document.getElementById('cupSize').children[2].value;
    console.log(cups);
    console.log(cupSize);

    let idPromise = getUserID();
    idPromise.then(uid=>{
        fetch('https://sleepwebapp.wpi.edu:5000/users/newcaf/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cups: cups,
                cupSize: cupSize,
                uid: uid
            })
        }).then(r=>{
            if(r.status === 200){
                swal({
                    title: "Success",
                    icon: "success",
                    text: "New caffeine entry have been logged."
                })
            }
        }).then(()=>{
                document.getElementById('cups').children[2].value = '5';
                document.getElementById('cupSize').children[2].value = '50';
        })
    });
}

const panes = [
    {
        menuItem: 'Exercise',
        render: () =>
            <div>
            <Tab.Pane attached={false}>
            <h5>Rate intensity & duration of exercise</h5>
            <br/><br/>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Average Intensity
            </Typography>
            <Grid container spacing={3}>
                <Grid item>
                    <DirectionsRun style={cup}/>
                </Grid>

                <Grid item xs>
                    <PrettoSlider id="intensity" aria-label="pretto slider" defaultValue={50}
                                  step={null}
                                  marks={stresslevel}/>
                </Grid>
            </Grid>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Duration of Exercise (minutes)
            </Typography>
            <Grid container spacing={3}>
                <Grid item>
                    <AccessTime style={cup}/>
                </Grid>

                <Grid item xs>
                    <PrettoSlider id="minutes" aria-label="pretto slider" defaultValue={90}
                                  valueLabelDisplay="auto"
                                  step={15}
                                  min={0}
                                  max={180}
                                  marks={minutes}/>
                </Grid>
            </Grid>
        </Tab.Pane>
                <div className='float_center'>
                    <div className='child'>
                        <button className='btn' onClick={submitExerciseEntry}>Submit Exercise</button>
                        <br/><br/><br/>
                    </div>
                </div>
            </div>

    },
    {
        menuItem: 'Stress',
        render: () => <LoginControl/>
    },
    {
        menuItem: 'Caffeine',
        render: () =>
            <div>
            <Tab.Pane attached={false}>
            <h5>Log the amount of caffeine consumed</h5>
            <br/><br/>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Cups of Caffeinated Beverages
            </Typography>
            <Grid container spacing={3}>
                <Grid item>
                    <LocalCafe style={cup}/>
                </Grid>

                <Grid item xs>
                    <PrettoSlider id='cups' aria-label="pretto slider"
                                  valueLabelDisplay="auto"
                                  step={1}
                                  min={0}
                                  max={10}
                                  marks={cups}/>
                </Grid>
            </Grid>


            <Typography id="discrete-slider-restrict" gutterBottom>
                Average Beverage Size
            </Typography>
            <Grid container spacing={3}>
                <Grid item>
                    <Delete style={cup}/>
                </Grid>

                <Grid item xs>
                    <PrettoSlider id='cupSize' aria-label="pretto slider"
                                  step={null}
                                  marks={cupSize}/>
                </Grid>
            </Grid>
        </Tab.Pane>
                <div className='float_center'>
                    <div className='child'>
                        <button className='btn' onClick={submitCaffeineEntry}>Submit Caffeine</button>
                        <br/><br/><br/>
                    </div>
                </div>
            </div>
    }
]

const Tabs = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} defaultActiveIndex={0}/>
)

export {Tabs}