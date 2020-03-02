// get the url
import {getUserID} from "./login";

var url = window.location.href;
console.log(url);
let OAUTH = "";
let sleepLogs = {
    aInternal: "",
    aListener: function(val) {},
    set a(val) {
        this.aInternal = val;
        this.aListener(val);
    },
    get a() {
        return this.aInternal;
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
}

if (url.includes("localhost")) {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsettings&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
} else {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Fsleepwebapp.wpi.edu%3A3000%2Fsettings&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"
}

let promise =  new Promise( function(resolve, reject){
    if (url.includes("settings") && url.includes("#")) {
        //getting the access token from url
        var access_token = url.split("#")[1].split("=")[1].split("&")[0];
        // get the userid
        var userId = url.split("#")[1].split("=")[2].split("&")[0];
        console.log(access_token);
        console.log(userId);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/sleep/date/2019-08-01/2019-08-07.json');
        xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let sleeplogs = [];
                let logs = JSON.parse(xhr.responseText).sleep;
                for(let i = 0; i < logs.length; i++){
                    let start = logs[i].startTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
                    let end = logs[i].endTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
                    sleeplogs.push({ date: logs[i].dateOfSleep, startTime: start, endTime: end });

                    // let idPromise = getUserID();
                    // idPromise.then(uid=>{
                    //     const data = JSON.stringify({
                    //         start: start,
                    //         end: end,
                    //         uid: uid
                    //     });
                    //     fetch('https://sleepwebapp.wpi.edu:5000/addFitbitSleep', {
                    //         method: 'POST',
                    //         headers: {
                    //             'Accept': 'application/json',
                    //             'Content-Type': 'application/json',
                    //         },
                    //         body: data
                    //     }).then(r => {
                    //         console.log("Added fitbit sleep data: ", r.status);
                    //     })
                    // });
                }

                resolve(sleeplogs);

                window.history.pushState("object or string", "Settings", "/settings")
            }
            else { reject(); }
        };
        xhr.send();
    }
});

promise.then(logs=>{
    console.log(logs)
});
export {OAUTH, sleepLogs}