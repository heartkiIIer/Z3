var z3_firebase = require('./firebase.js');

// changes the user's password to new password
function newPassword(user){
    // retrieve new password
    var newPassword = document.getElementById("chgPwd-NewPwd").value;
    var newPassword2 = document.getElementById("chgPwd-NewPwd2").value;

    // check if new passwords match
    if(newPassword === newPassword2){
        user.updatePassword(newPassword).then(function() { // Update successful.
            alert("Your password has been updated");

            // clear password inputs
            document.getElementById("chgPwd-NewPwd").value = "";
            document.getElementById("chgPwd-NewPwd2").value = "";
        }).catch(function(error) { // An error happened.
            alert("New " + error.message);
        });
    }
    else { alert("Passwords do not match"); }
}
// changes the user's email to new email
function newEmail(user){
    var newEmail = document.getElementById("chgEmail-NewEmail").value;
    var newEmail2 = document.getElementById("chgEmail-NewEmail2").value;

    if(newEmail === newEmail2){
        user.updateEmail(newEmail).then(function() { // Update successful.
            alert("Your Email has been updated");

            // clear email inputs
            document.getElementById("chgEmail-NewEmail").value = "";
            document.getElementById("chgEmail-NewEmail2").value = "";
        }).catch(function(error) { // An error happened.
            alert(error.message);
        });
    }
    else { alert("emails do not match"); }
}
// deletes user's account
function deleteUser(user){
    var confirm = window.confirm("Do you really wish to delete your account?");
    if(confirm) {
        user.delete().then(function() {
            // User deleted.
            // Delete all database information on user
            alert("User was successfully deleted");
            window.open("http://localhost:5000/logout", "_self")
        }).catch(function(error) {
            // An error happened.
            console.log("User cannot be deleted");
            console.log(error.message);
        });
    }
}
// re-authentications user before updating profile
function reauthUser(updatefn){
    // prompt to enter password for re-authentication
    var password = window.prompt("To confirm changes, please enter your password:", "password")

    // retrieve email of the logged in user
    z3_firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // User is signed in.
            var email = "";
            // retrieve email of current user
            user.providerData.forEach(function (profile) { email = profile.email; });
            // set up credentials for re-authentication
            var credential = z3_firebase.auth.EmailAuthProvider.credential( email, password );

            user.reauthenticateWithCredential(credential).then(function() { // User re-authenticated.
                updatefn(user); // update user profile
            }).catch(function(error) { // An error happened.
                alert(error.message);
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
function deleteAcc(e){
    e.preventDefault();
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
        alert(error.message)
    });
}

export {updatePwd, updateEmail, deleteAcc, updateImage};