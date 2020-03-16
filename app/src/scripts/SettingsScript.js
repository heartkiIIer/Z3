var z3_firebase = require('./firebase.js');
var swal = require('sweetalert');
var Swal = require('sweetalert2');
import {getUserID} from "./login";

// deletes user's account
function deleteAcc(user){
    Swal.fire({ //send confirmation alert
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your account!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#cb1634",
        cancelButtonColor: "#b9b9b9"
    }).then((willDelete) => {
        if (willDelete.value) {
            let promise = getUserID();
            promise.then((uid)=>{
                user.delete().then(function() {
                    // User deleted.
                    // Delete all database information on user
                    fetch('https://sleepwebapp.wpi.edu:5000/deleteUser', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({uid: uid})
                    }).then( () => {
                        Swal.fire({
                            text: "User was successfully deleted",
                            icon: "success"
                        }).then(()=>{
                            window.open("https://sleepwebapp.wpi.edu", "_self");
                        });
                    });
                }).catch(function(error) {
                    // An error happened.
                    swal({
                        text: error.message,
                        icon: "error"
                    });
                });
            });
        }
    });
}

export {deleteAcc};