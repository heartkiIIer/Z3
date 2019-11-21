import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Tab } from 'semantic-ui-react'

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: 300 + theme.spacing(3) * 2,
//         padding: theme.spacing(3),
//     },
//     margin: {
//         height: theme.spacing(3),
//     },
// }));

const cupsize = [
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

const stresslevel = [
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

const minutes = [
    {
        value: 2,
        label: 0
    },
    {
        value: 10
    },
    {
        value: 20,
        label: 30
    },
    {
        value: 30
    },
    {
        value: 40,
        label: 60
    },
    {
        value: 50
    },
    {
        value: 60,
        label: 90
    },
    {
        value: 70
    },
    {
        value: 80,
        label: 120
    },
    {
        value: 90
    },
    {
        value: 98,
        label: 150
    }
];

const cups = [
    {
        value: 2,
        label: 0
    },
    {
        value: 10
    },
    {
        value: 20,
        label: 2
    },
    {
        value: 30
    },
    {
        value: 40,
        label: 4
    },
    {
        value: 50
    },
    {
        value: 60,
        label: 6
    },
    {
        value: 70
    },
    {
        value: 80,
        label: 8
    },
    {
        value: 90
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

const panes = [
    {
        menuItem: 'Exercise',
        render: () => <Tab.Pane attached={false}>
                <Typography id="discrete-slider-restrict" gutterBottom>
                    Duration of Exercise (minutes)
                </Typography>
                <PrettoSlider aria-label="pretto slider" defaultValue={2}
                              step={null}
                              marks={minutes}/>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Intensity
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={2}
                          step={null}
                          marks={stresslevel}/>
        </Tab.Pane>,
    },
    {
        menuItem: 'Stress',
        render: () => <Tab.Pane attached={false}>
                <Typography id="discrete-slider-restrict" gutterBottom>
                    Event 1
                </Typography>
                <PrettoSlider aria-label="pretto slider" defaultValue={98}
                              step={null}
                              marks={stresslevel}/>

                <Typography id="discrete-slider-restrict" gutterBottom>
                    Event 2
                </Typography>
                <PrettoSlider aria-label="pretto slider" defaultValue={2}
                              step={null}
                              marks={stresslevel}/>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Event 3
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={50}
                          step={null}
                          marks={stresslevel}/>
        </Tab.Pane>,
    },
    {
        menuItem: 'Coffee',
        render: () => <Tab.Pane attached={false}>
            <Typography id="discrete-slider-restrict" gutterBottom>
                Cups of Coffee Consumed
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={2}
                          step={null}
                          marks={cups}/>

            <Typography id="discrete-slider-restrict" gutterBottom>
                Largest Coffee Cup Size
            </Typography>
            <PrettoSlider aria-label="pretto slider" defaultValue={98}
                          step={null}
                          marks={cupsize}/>
        </Tab.Pane>,
    }
]

const Taboo = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default Taboo

// export default function CustomizedSlider() {
//     const classes = useStyles();
//
//     return (
//         <Paper className={classes.root}>
//             <div className={classes.margin} />
//             <Typography id="discrete-slider-restrict" gutterBottom>
//                 Duration of Exercise (minutes)
//             </Typography>
//             <PrettoSlider aria-label="pretto slider" defaultValue={2}
//                           step={null}
//                           marks={minutes}/>
//             <div className={classes.margin} />
//             <Typography id="discrete-slider-restrict" gutterBottom>
//                 Cups of Coffee Consumed
//             </Typography>
//             <PrettoSlider aria-label="pretto slider" defaultValue={2}
//                           step={null}
//                           marks={cups}/>
//             <div className={classes.margin} />
//             <Typography id="discrete-slider-restrict" gutterBottom>
//                 Largest Coffee Cup Size
//             </Typography>
//             <PrettoSlider aria-label="pretto slider" defaultValue={98}
//                           step={null}
//                           marks={marks}/>
//             <div className={classes.margin} />
//         </Paper>
//     );
// }