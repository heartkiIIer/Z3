import {getUserID} from "./login"; // get user ID
import swal from "sweetalert2" // library for pop ups

var url = window.location.href;
let OAUTH = "", OAUTHSettings = "";

//authenticate the user with fitbit API
if (url.includes("localhost")) {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Freport&scope=activity%20sleep&expires_in=31536000";
    OAUTHSettings = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fsettings&scope=activity%20sleep&expires_in=31536000";
} else {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Fsleepwebapp.wpi.edu%2Freport&scope=activity%20sleep&expires_in=31536000";
    OAUTHSettings = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Fsleepwebapp.wpi.edu%2Fsettings&scope=activity%20sleep&expires_in=31536000";
}

let today = new Date();
let dates = [];
//get dates of the past week including current day
for (let i = 6; i >= 0; i--) {
    let previousDay = new Date(today);
    previousDay.setDate(previousDay.getDate()-i);
    let day = previousDay.getFullYear() + "-";
    if(previousDay.getMonth()+1 < 10)
        day += "0";
    day += previousDay.getMonth()+1 + "-";
    if(previousDay.getDate() < 10)
        day += "0";
    day += previousDay.getDate();
    dates.push(day)
}

if (url.includes("report") && url.includes("#")) {
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    // get the userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];

    var sleepXhr = new XMLHttpRequest();
    // dates need to be in YYYY-MM-DD format
    sleepXhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/sleep/date/'+dates[0]+'/'+dates[6]+'.json');
    sleepXhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
    sleepXhr.onload = function () {
        if (sleepXhr.status === 200) {
            let logs = JSON.parse(sleepXhr.responseText).sleep;
            //each sleep log data, parse and store in database
            for(let i = 0; i < logs.length; i++){
                //parse date and time, reformat date and time to allow translation to timestamp in database
                let start = logs[i].startTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
                let end = logs[i].endTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);

                let idPromise = getUserID();
                idPromise.then(uid=>{
                    const data = JSON.stringify({
                        start: start,
                        end: end,
                        uid: uid
                    });
                    fetch('https://sleepwebapp.wpi.edu:5000/newFitbitSleep', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    })
                });
            }
            window.history.pushState("object or string", "Report", "/report")
        }
    };
    sleepXhr.send();

    for(let i = 0; i < dates.length; i++) { //get exercise activity for each 7 days of the week
        let exerciseXhr = new XMLHttpRequest();
        exerciseXhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/activities/date/' + dates[i] + '.json');
        exerciseXhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
        exerciseXhr.onload = function () {
            if (exerciseXhr.status === 200) {
                let activities = JSON.parse(exerciseXhr.responseText).summary;
                let idPromise = getUserID();
                idPromise.then(uid=> {
                    let exerciseLog_med = {
                        timestamp: dates[i].replace(/-/g, "/") + " 00:00:00",
                        intensity: 50,
                        minutes: activities.fairlyActiveMinutes,
                        uid: uid
                    };
                    let exerciseLog_high = {
                        timestamp: dates[i].replace(/-/g, "/") + " 00:00:00",
                        intensity: 98,
                        minutes: activities.veryActiveMinutes,
                        uid: uid
                    };
                    //store fairy active minutes as medium intensity
                    if (exerciseLog_med.minutes !== 0) {
                        const data_med = JSON.stringify(exerciseLog_med);
                        fetch('https://sleepwebapp.wpi.edu:5000/newFitbitExercise', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: data_med
                        })
                    }
                    //store very active minutes as high intensity
                    if (exerciseLog_high.minutes !== 0) {
                        const data_high = JSON.stringify(exerciseLog_high);
                        fetch('https://sleepwebapp.wpi.edu:5000/newFitbitExercise', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: data_high
                        })
                    }
                });
                window.history.pushState("object or string", "Report", "/report")
            }
        };
        exerciseXhr.send();
    }

}

function InfoPopUp(){
    //check if user set allow fitbit in User Settings
    let idPromise = getUserID();
    idPromise.then(uid=>{
        const data = JSON.stringify({uid: uid});
        fetch('https://sleepwebapp.wpi.edu:5000/getUseFitbit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then( r => {
            return r.json();
        }).then(r => {
            if(r.length !== 0){
                if(!r[0].fitbit){
                    //check if user has set pop up to never show again
                    fetch('https://sleepwebapp.wpi.edu:5000/getPopup', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: data
                    }).then( r => {
                        return r.json();
                    }).then(r => {
                        if(r.length !== 0){
                            if(r[0].popup){ //if popup is true send popup about allowing fitbit. else do nothing
                                swal.fire({ //send popup
                                    title: "Fitbit Feature",
                                    text: "If you have a Fitbit, you can auto log exercise and sleep using your Fitbit data. Go to settings to set that up!",
                                    showCancelButton: true,
                                    confirmButtonText: "Do Not Show Again",
                                    confirmButtonColor: "#cb1634",
                                    cancelButtonColor: "#b9b9b9"
                                }).then(noShow =>{
                                    if(noShow.value){
                                        fetch('https://sleepwebapp.wpi.edu:5000/setPopupFalse', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: data
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        });
    });
}

export {OAUTH, OAUTHSettings, InfoPopUp}