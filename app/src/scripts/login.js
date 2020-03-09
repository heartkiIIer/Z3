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
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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

                fetch('https://sleepwebapp.wpi.edu:5000/logUser', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: data
                }).then (function(res){
                    console.log("Send logged User to Server side: ", res.status);
                })
                console.log(profile.uid);
                console.log(user.uid);
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
        window.open("https://sleepwebapp.wpi.edu", "_self");
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
export function getUserID(){
    return new Promise( function(resolve, reject){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.providerData.forEach(function (profile) {
                    resolve(profile.uid);
                });
            } else { reject(); }
        })
    });
}
export function getUserImage(){
    return new Promise( function(resolve, reject){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.providerData.forEach(function (profile) {
                    resolve(profile.photoURL);
                });
            } else { reject(); }
        })
    });
}
export function getUserName(){
    return new Promise( function(resolve, reject){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.providerData.forEach(function (profile) {
                    resolve(profile.displayName);
                });
            } else { reject(); }
        })
    });
}