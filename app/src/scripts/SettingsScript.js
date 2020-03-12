var z3_firebase = require('./firebase.js');
var swal = require('sweetalert');
var Swal = require('sweetalert2');

// changes the user's password to new password
function newPassword(user){
    // retrieve new password
    var newPassword = document.getElementById("chgPwd-NewPwd").value;
    var newPassword2 = document.getElementById("chgPwd-NewPwd2").value;

    // check if new passwords match
    if(newPassword === newPassword2){
        user.updatePassword(newPassword).then(function() { // Update successful.
            swal({
                text: "Your password has been successfully updated",
                icon: "success"
            });

            // clear password inputs
            document.getElementById("chgPwd-NewPwd").value = "";
            document.getElementById("chgPwd-NewPwd2").value = "";
        }).catch(function(error) { // An error happened.
            swal({
                text: error.message,
                icon: "error"
            });
        });
    }
    else { swal({
        text: "The new passwords do not match",
        icon: "warning",
    }); }
}
// changes the user's email to new email
function newEmail(user){
    var newEmail = document.getElementById("chgEmail-NewEmail").value;
    var newEmail2 = document.getElementById("chgEmail-NewEmail2").value;

    if(newEmail === newEmail2){
        user.updateEmail(newEmail).then(function() { // Update successful.
            swal({
                text: "Your Email has been successfully updated",
                icon: "success"
            });

            // clear email inputs
            document.getElementById("chgEmail-NewEmail").value = "";
            document.getElementById("chgEmail-NewEmail2").value = "";
        }).catch(function(error) { // An error happened.
            swal({
                text: error.message,
                icon: "error"
            });
        });
    }
    else { swal({
        text: "The new emails do not match",
        icon: "warning"
    }); }
}
// deletes user's account
function deleteUser(user){
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your account!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#cb1634",
        cancelButtonColor: "#b9b9b9"
    }).then((willDelete) => {
        console.log(willDelete);
        if (willDelete) {
            user.delete().then(function() {
                // User deleted.
                // Delete all database information on user
                console.log("Firebase delete");
                fetch('https://sleepwebapp.wpi.edu:5000/deleteUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
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
                console.log("User cannot be deleted");
                swal({
                    text: error.message,
                    icon: "error"
                });
            });
        }
    });
}
// re-authentications user before updating profile
function reauthUser(updatefn){
    // retrieve email of the logged in user
    z3_firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            user.providerData.forEach(function (profile) {
                if(profile.providerId === "password"){
                    // prompt to enter password for re-authentication
                    swal({
                        text: "To confirm changes, please enter your password:",
                        content: {
                            element: "input",
                            attributes: {
                                placeholder: "Type your password",
                                type: "password"
                            }
                        },
                    }).then((password) =>{
                        // set up credentials for re-authentication
                        var credential = z3_firebase.auth.EmailAuthProvider.credential( profile.email, password );

                        user.reauthenticateWithCredential(credential).then(function() { // User re-authenticated.
                            updatefn(user); // update user profile
                        }).catch(function(error) { // An error happened.
                            swal({text: error.message, icon: "error"});
                        });
                    });
                }
                else{
                    updatefn(user);
                }
            });
        } else { // No user is signed in.
            console.log("No User is signed in");
        }
    });
}

// re-authentications user before updating password
function updatePwd(e){
    e.preventDefault();
    reauthUser(newPassword);
}
// re-authentications user before updating email
function updateEmail(e){
    e.preventDefault();
    reauthUser(newEmail);
}
// re-authentications user before deleting account
function deleteAcc(){
    reauthUser(deleteUser);
}

// update user profile picture
function updateImage(e){
    e.preventDefault();

    // retrieve profile image URL
    var image = document.getElementById("chgImageURL").value;
    var user = z3_firebase.auth().currentUser;

    user.updateProfile({ photoURL: image
    }).then(function() { // Update successful.
        document.getElementById("chgImg").src = image;
    }).catch(function(error) { // An error happened.
        swal({text: error.message, icon: "error"})
    });
}

export {updatePwd, updateEmail, deleteAcc, updateImage};