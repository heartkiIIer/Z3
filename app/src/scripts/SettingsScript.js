import {getUserID} from "./login";

var z3_firebase = require('./firebase.js');
var swal = require('sweetalert');
var Swal = require('sweetalert2');


// deletes user's account
function deleteAcc(){
    z3_firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            // Creates the provider object.
            let providerID = "";
            user.providerData.forEach(function (profile) {
                providerID = profile.providerId;
            });
            var provider;
            console.log(providerID);
            if(providerID === "facebook.com"){
                provider = new z3_firebase.auth.FacebookAuthProvider();
            }
            if(providerID === "google.com"){
                provider = new z3_firebase.auth.GoogleAuthProvider();
            }
            // Reauthenticate with popup:
            user.reauthenticateWithPopup(provider).then(function(result) {
                // The firebase.User instance:
                var user = result.user;
                // The Facebook firebase.auth.AuthCredential containing the Facebook
                // access token:
                var credential = result.credential;

                user.reauthenticateWithCredential(credential).then(function() {
                    console.log("reauthentication success");
                    // User re-authenticated.
                    // Swal.fire({ //send confirmation alert
                    //     title: "Are you sure?",
                    //     text: "Once deleted, you will not be able to recover your account!",
                    //     icon: "warning",
                    //     showCancelButton: true,
                    //     confirmButtonText: "Delete",
                    //     confirmButtonColor: "#cb1634",
                    //     cancelButtonColor: "#b9b9b9"
                    // }).then((willDelete) => {
                    //     if (willDelete.value) {
                    //         let promise = getUserID();
                    //         promise.then((uid) => {
                    //             user.delete().then(function () {
                    //                 // User deleted.
                    //                 // Delete all database information on user
                    //                 fetch('https://sleepwebapp.wpi.edu:5000/deleteUser', {
                    //                     method: 'POST',
                    //                     headers: {
                    //                         'Accept': 'application/json',
                    //                         'Content-Type': 'application/json',
                    //                     },
                    //                     body: JSON.stringify({uid: uid})
                    //                 }).then(() => {
                    //                     Swal.fire({
                    //                         text: "User was successfully deleted",
                    //                         icon: "success"
                    //                     }).then(() => {
                    //                         window.open("https://sleepwebapp.wpi.edu", "_self");
                    //                     });
                    //                 });
                    //             });
                    //         }).catch(function (error) {
                    //             // An error happened.
                    //             swal({
                    //                 text: error.message,
                    //                 icon: "error"
                    //             });
                    //         });
                    //     }
                    // });
                }).catch(function(error) {
                    // An error happened.
                });
            }, function(error) {
                // An error happened.
            });

        }
    });
}

export {deleteAcc};