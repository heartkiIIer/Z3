
// generates an id number for users who login with email and password
function toID_Number(email){
    if(email.length > 17){ email = email.substring(0, 17); }
    let idNum = 0;
    for(let i = 0; i < email.length; i++){
        let n = email.charCodeAt(i);
        idNum += n * Math.pow(10, i);
    }
    return idNum;
}
module.exports = {toID_Number};