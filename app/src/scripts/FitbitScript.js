// get the url
import {getUserID} from "./login";

var url = window.location.href;
let OAUTH = "";

if (url.includes("localhost")) {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fsettings&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
} else {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Fsleepwebapp.wpi.edu%2Freport&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"
}

let today = new Date();
let lastweek = new Date(today);
lastweek.setDate(lastweek.getDate()-7);

let enddate = today.getFullYear() + "-";
if(today.getMonth() < 10)
    enddate += "0";
enddate += today.getMonth()+1 + "-";
if(today.getDate() < 10)
    enddate += "0";
enddate += today.getDate();

let startdate = lastweek.getFullYear() + "-";
if(lastweek.getMonth() < 10)
    startdate += "0";
startdate += lastweek.getMonth()+1 + "-";
if(lastweek.getDate() < 10)
    startdate += "0";
startdate += lastweek.getDate();

if (url.includes("report") && url.includes("#")) {
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    // get the userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];

    // var sleepXhr = new XMLHttpRequest();
    // // dates need to be in YYYY-MM-DD format
    // sleepXhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/sleep/date/'+startdate+'/'+enddate+'.json');
    // sleepXhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
    // sleepXhr.onload = function () {
    //     if (sleepXhr.status === 200) {
    //         let sleeplogs = [];
    //         let logs = JSON.parse(sleepXhr.responseText).sleep;
    //         console.log(logs);
    //         for(let i = 0; i < logs.length; i++){
    //             let start = logs[i].startTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
    //             let end = logs[i].endTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
    //             sleeplogs.push({ date: logs[i].dateOfSleep, startTime: start, endTime: end });
    //
    //             let idPromise = getUserID();
    //             idPromise.then(uid=>{
    //                 const data = JSON.stringify({
    //                     start: start,
    //                     end: end,
    //                     uid: uid
    //                 });
    //                 fetch('https://sleepwebapp.wpi.edu:5000/newFitbitSleep', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Accept': 'application/json',
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: data
    //                 }).then(r => {
    //                     console.log("Added fitbit sleep data: ", r.status);
    //                 })
    //             });
    //         }
    //         window.history.pushState("object or string", "Report", "/report")
    //     }
    // };
    // sleepXhr.send();

    var exerciseXhr = new XMLHttpRequest();
    // dates need to be in YYYY-MM-DD format
    exerciseXhr.open('GET', 'https://api.fitbit.com/1/user/-/activities/list.json?afterDate=2020-02-18&sort=asc&limit=10&offset=0');
    exerciseXhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
    exerciseXhr.onload = function () {
        if (exerciseXhr.status === 200) {
            console.log(exerciseXhr.responseText);
            // for(let i = 0; i < logs.length; i++){
            //     let start = logs[i].startTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
            //     let end = logs[i].endTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
            //     exerciselogs.push({ date: logs[i].dateOfSleep, startTime: start, endTime: end });
            //
            //     let idPromise = getUserID();
            //     idPromise.then(uid=>{
            //         const data = JSON.stringify({
            //             start: start,
            //             end: end,
            //             uid: uid
            //         });
            //         fetch('https://sleepwebapp.wpi.edu:5000/newFitbitExercise', {
            //             method: 'POST',
            //             headers: {
            //                 'Accept': 'application/json',
            //                 'Content-Type': 'application/json',
            //             },
            //             body: data
            //         }).then(r => {
            //             console.log("Added fitbit exercise data: ", r.status);
            //         })
            //     });
            // }
            window.history.pushState("object or string", "Report", "/report")
        }
    };
    exerciseXhr.send();
}

export {OAUTH}