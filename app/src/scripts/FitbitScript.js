// get the url
import {getUserID} from "./login";

var url = window.location.href;
console.log(url);
let OAUTH = "";

if (url.includes("localhost")) {
    OAUTH = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BG2J&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fsettings&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
} else {
    OAUTH = "https://sleepwebapp.wpi.edu/report#access_token=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkJHMkoiLCJzdWIiOiI3TlY0UzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTgzNjgyOTc2LCJpYXQiOjE1ODMyMTkxNjJ9.ZBJZvjSbH1sAAAe7POnPOtV-MN59CFSVfa36RDktAPo&user_id=7NV4S2&scope=profile+settings+social+heartrate+weight+sleep+location+nutrition+activity&token_type=Bearer&expires_in=463814"
}

function getfitbitdata(startdate, enddate){
    console.log("Called!!!");
    if (url.includes("report") && url.includes("#")) {
        //getting the access token from url
        var access_token = url.split("#")[1].split("=")[1].split("&")[0];
        // get the userid
        var userId = url.split("#")[1].split("=")[2].split("&")[0];
        console.log(access_token);
        console.log(userId);

        var xhr = new XMLHttpRequest();
        // dates need to be in YYYY-MM-DD format
        xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/sleep/date/'+startdate+'/'+enddate+'.json');
        xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let sleeplogs = [];
                let logs = JSON.parse(xhr.responseText).sleep;
                console.log(logs);
                for(let i = 0; i < logs.length; i++){
                    let start = logs[i].startTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
                    let end = logs[i].endTime.replace(/-/g, "/").replace(/T/, " ").substring(0, 19);
                    sleeplogs.push({ date: logs[i].dateOfSleep, startTime: start, endTime: end });

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
                        }).then(r => {
                            console.log("Added fitbit sleep data: ", r.status);
                        })
                    });
                }
                window.history.pushState("object or string", "Report", "/report")
            }
        };
        xhr.send();
    }
}

export {getfitbitdata}