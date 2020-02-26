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

    // Install servicerWorker if supported on sign-in/sign-up page.
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    ui.start('#firebaseui-auth-container', uiConfig);
})();

export default function logout(e){
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

export default function getUser(e){
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