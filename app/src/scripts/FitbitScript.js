// get the url
var url = window.location.href;
console.log(url)
let OAUTH = ""
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

if (url.includes("settings") && url.includes("#")) {
    //getting the access token from url
    var access_token = url.split("#")[1].split("=")[1].split("&")[0];
    // get the userid
    var userId = url.split("#")[1].split("=")[2].split("&")[0];
    console.log(access_token);
    console.log(userId);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.fitbit.com/1/user/' + userId + '/sleep/date/2020-01-15.json');
    xhr.setRequestHeader("Authorization", 'Bearer ' + access_token);
    xhr.onload = function () {
        if (xhr.status === 200) {
            sleepLogs.a = xhr.responseText
            console.log(sleepLogs.a)
            window.history.pushState("object or string", "Settings", "/settings")
        }
    };
    xhr.send();
}
console.log(sleepLogs.a)
export {OAUTH, sleepLogs}