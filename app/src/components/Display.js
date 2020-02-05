import React, {useState, useEffect, useRef, SyntheticEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ApiCalendar from 'react-google-calendar-api';
import { withStyles} from '@material-ui/core/styles';
import { Tab } from 'semantic-ui-react'

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
    },
})(Slider);

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.state = {
            sign: ApiCalendar.sign,
        };
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    signUpdate(sign: boolean): any {
        this.setState({
            sign
        })
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
    }

    render() {
        const isLoggedIn = this.state.sign;
        let ele;

        if (isLoggedIn) {
            ele = <Display/>;
        } else {
            ele = <LoginButton onClick={(e) => this.handleItemClick(e, 'sign-in')} />;
        }

        return (
            <div>
                {ele}
            </div>
        );
    }
}

function LoginButton(props) {
    return (
        <button className='btn' id='extended' onClick={props.onClick}>
            Sync with Google Calendar
        </button>
    );
}

async function fetchItems() {
    const result = await ApiCalendar.listUpcomingEvents(10);
    return result.result.items.map(({summary}) => summary);
}

function Display() {
    const [items, saveItems] = useState([]);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        (async () => {
            const items = await fetchItems();
            //Do not update state if component is unmounted
            if (isMounted.current) {
                saveItems(items);
            }
        })();
    }, []);

    return <>{items.map(item =>
        <Tab.Pane key={item} attached={false}>
        <Typography id="discrete-slider-restrict" gutterBottom>
            {item}
        <button>Remove</button>
        </Typography>
        <PrettoSlider aria-label="pretto slider" defaultValue={98} step={null}marks={stresslevel}/></Tab.Pane>
    )}</>
}

// function Display() {
//     let events = new Set()
//     let tabs = [];
//     const [items, stateItems] = useState([]);
//
//     useEffect(async () => {
//         const res = await ApiCalendar.listUpcomingEvents(10);
//         stateItems(res.result.items.summary);
//     }, []);
//
//     return items.map(item =>
//         <Tab.Pane attached={false}>
//             <Typography id="discrete-slider-restrict" gutterBottom>
//                 {item}
//                 <button>Remove</button>
//             </Typography>
//             <PrettoSlider aria-label="pretto slider" defaultValue={98} step={null}marks={stresslevel}/></Tab.Pane>
//     );
// }

// function Display() {
//     let events = new Set()
//     let tabs = []
//     ApiCalendar.listUpcomingEvents(10)
//         .then(({result}: any) => {
//             result.items.forEach(element => {
//                     console.log(element.summary)
//                     events.add(element.summary)
//                 }
//             );
//             console.log(events)
//             for (let item of events)
//                 console.log(item)
//                 tabs.push(
//                   <Tab.Pane attached={false}>
//                     <Typography id="discrete-slider-restrict" gutterBottom>
//                         item
//                         <button>Remove</button>
//                     </Typography>
//                     <PrettoSlider aria-label="pretto slider" defaultValue={98} step={null}marks={stresslevel}/></Tab.Pane>
//             )
//             console.log(tabs)
//             return tabs
//         });
// }

