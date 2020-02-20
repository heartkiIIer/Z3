var firebase = require('firebase');

(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyAHrMkPUkOzWLWyDu0Wj35NZMU9aJ4_GME",
        authDomain: "z3-sleep-health-app.firebaseapp.com",
        databaseURL: "https://z3-sleep-health-app.firebaseio.com",
        projectId: "z3-sleep-health-app",
        storageBucket: "z3-sleep-health-app.appspot.com",
        messagingSenderId: "818297110349",
        appId: "1:818297110349:web:e4c61b897310b3852f8104",
        measurementId: "G-QGEPY2KJPW"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // As httpOnly cookies are to be used, do not persist any state client side.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    module.exports = firebase;
})()