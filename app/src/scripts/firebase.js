var firebase = require('firebase');

(function(){
    // // Firebase under Winny's Personal Gmail
    // var firebaseConfig = {
    //     apiKey: "AIzaSyAHrMkPUkOzWLWyDu0Wj35NZMU9aJ4_GME",
    //     authDomain: "z3-sleep-health-app.firebaseapp.com",
    //     databaseURL: "https://z3-sleep-health-app.firebaseio.com",
    //     projectId: "z3-sleep-health-app",
    //     storageBucket: "z3-sleep-health-app.appspot.com",
    //     messagingSenderId: "818297110349",
    //     appId: "1:818297110349:web:e4c61b897310b3852f8104",
    //     measurementId: "G-QGEPY2KJPW"
    // };
    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    //Firebase Configurations under sleephealth.z3@gmail.com account
    var firebaseConfig = {
        apiKey: "AIzaSyAqq6CDWSGQ_AZ-VuuBr2m4u7_7eaYAGfc",
        authDomain: "sleepwebapp-z3.firebaseapp.com",
        databaseURL: "https://sleepwebapp-z3.firebaseio.com",
        projectId: "sleepwebapp-z3",
        storageBucket: "sleepwebapp-z3.appspot.com",
        messagingSenderId: "195252682320",
        appId: "1:195252682320:web:df0c84bea555169463db55",
        measurementId: "G-7ECGRCW0S1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    module.exports = firebase;
})()