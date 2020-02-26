var firebaseui = require('firebaseui');
var firebase = require('firebase');

(function(){
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/home',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID
            // firebase.auth.GithubAuthProvider.PROVIDER_ID
            firebase.auth.EmailAuthProvider.PROVIDER_ID
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("User is signed in");
            user.providerData.forEach(function (profile) {
                const data = JSON.stringify({
                    id: profile.uid,
                    name: profile.displayName,
                    image: profile.photoURL});

                fetch('http://sleepwebapp.wpi.edu:5000/logUser', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: data
                }).then (function(res){
                    console.log("Send logged User to Server side: ", res.status);
                })
                console.log(profile.displayName);
            });

        } else {
            // No user is signed in.
            console.log("No User is signed in");
        }
    });
})()

export function logout(e){
    e.preventDefault();

    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        fetch('http://sleepwebapp.wpi.edu:5000/logout', {
            method: 'GET'
        }).then (function(){
            window.open("http://sleepwebapp.wpi.edu:3000", "_self");
        })
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}

export function getUserID(){
    var id = "";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.providerData.forEach(function (profile) {
                id += profile.uid;
            });
        } else {
            console.log("No User is signed in");
        }
    });
    return id;
}

export function getUserImage(){
    var img = "";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.providerData.forEach(function (profile) {
                img += profile.photoURL;
            });
        } else {
            console.log("No User is signed in");
        }
        console.log("ImageUrL 1: ", img);
    });
    console.log("ImageUrL 2: ", img);
    return img;
}

export function getUserName(){
    var promise = new Promise( function(resolve, reject){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.providerData.forEach(function (profile) {
                    resolve(profile.displayName);
                });
            } else { reject(); }
        })
    });

    console.log(promise.then(name =>{
        console.log("Name: ", name);
        return name;
    }))

}