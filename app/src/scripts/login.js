var firebaseui = require('firebaseui');
var z3_firebase = require('./firebase.js');

(function(){
    var ui = new firebaseui.auth.AuthUI(z3_firebase.auth());
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
            z3_firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            z3_firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // z3_firebase.auth.TwitterAuthProvider.PROVIDER_ID
            // z3_firebase.auth.GithubAuthProvider.PROVIDER_ID
            z3_firebase.auth.EmailAuthProvider.PROVIDER_ID
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);

    z3_firebase.auth().onAuthStateChanged(function(user) {
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

export default function logout(e){
    e.preventDefault();

    z3_firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });

    window.open("http://sleep.webapp.wpi.edu:5000/logout", "_self");
}