const db = require('./database');
const message = require('./messages');

const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

//Firebase sessions
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// The Firebase Admin SDK is used here to verify the ID token.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function getIdToken(req) {
    // Parse the injected ID token from the request header.
    const authorizationHeader = req.headers.authorization || '';
    const components = authorizationHeader.split(' ');
    return components.length > 1 ? components[1] : '';
}

function checkIfSignedIn(url) {
    return (req, res, next) => {
        if (req.url == url) {
            const idToken = getIdToken(req);
            // Verify the ID token using the Firebase Admin SDK.
            // User already logged in. Redirect to profile page.
            admin.auth().verifyIdToken(idToken).then((decodedClaims) => {
                // User is authenticated, user claims can be retrieved from
                // decodedClaims.
                // In this sample code, authenticated users are always redirected to
                // the profile page.
                db.getUser(req, res, idToken, "");
                res.redirect('http://sleepwebapp.wpi.edu:3000/home');
            }).catch((error) => {
                next();
            });
        } else {
            next();
        }
    };
}

// If a user is signed in, redirect to profile page.
app.use(checkIfSignedIn('http://sleepwebapp.wpi.edu:3000/'));

app.use(express.static("src/"));
app.use(express.static("public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

var whitelist = ['http://sleepwebapp.wpi.edu:3000', 'http://api.openweathermap.org/'];

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

//user logout
app.get('/logout', cors(corsOptions), function(req, res){
    res.send();
});

//DATABASE FUNCTIONALITY
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/allUsers', cors(corsOptions), (req, res) => {
    db.getUsers(req, res)
});

app.post('/users/newcaf/', cors(corsOptions), (req, res)=> {
    const {cups, cupSize} = req.body
    db.addCaffeineEntriesById(req, res, userProfile.id, cups, cupSize);
});

app.post('/users/newexer/', cors(corsOptions), (req, res)=> {
    const {intensity, minutes} = req.body
    db.addExerciseEntriesById(req, res, userProfile.id, intensity, minutes);
});

app.post('/users/newstress/', cors(corsOptions), (req, res)=> {
    const {title, year, month, day, date, value} = req.body
    db.addStressEntriesById(req, res, userProfile.id, title, year, month, day, date, value);
});

app.post('/getRoutine/', cors(corsOptions), (req, res)=> {
    db.getBedtimeRoutineById(req, res, userProfile.id);
});

app.post('/addRoutine/', cors(corsOptions), (req, res) => {
    const {minutes, task} = req.body;
    db.addBedtimeRoutineById(req, res, userProfile.id, minutes, task);
});

app.post('/deleteRoutine/', cors(corsOptions), (req, res) => {
    const {entryId} = req.body;
    db.deleteBedtimeRoutinesById(req, res, entryId);
});

app.post('/users/newchrono/', cors(corsOptions), (req, res)=> {
    const {q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13 } = req.body
    db.putChronotypeById(req, res, userProfile.id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13);
});

app.post('/newSleep/', cors(corsOptions), (req, res)=> {
    db.addSleepEntryById(req, res, userProfile.id);
});

app.post('/newWake/', cors(corsOptions), (req, res)=> {
    db.addWakeById(req, res, userProfile.id);
});

app.post('/submitChronoAnswers/', cors(corsOptions), (req, res) => {
    const{q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13} = req.body;
    db.putChronotypeById(req, res, userProfile.id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13)
});

app.post('/getChronoAnswers/', cors(corsOptions), (req, res)=> {
    db.getChronotypeById(req, res, userProfile.id);
});

app.post('/getSleepGoal/', cors(corsOptions), (req, res)=> {
    db.getSleepGoalById(req, res, userProfile.id)
});

app.post('/addSleepGoal/', cors(corsOptions), (req, res) => {
    const {goal} = req.body;
    db.addSleepGoalById(req, res, userProfile.id, goal);
});

app.post('/getPersonality/', cors(corsOptions), (req, res)=> {
    db.getPersonalityById(req, res, userProfile.id)
});

app.post('/submitPersonality/', cors(corsOptions), (req, res) => {
    const {open, cons, extra, agree, neuro} = req.body;
    db.putPersonalityById(req, res, userProfile.id, open, cons, extra, agree, neuro);
});

app.post('/deleteUser/', cors(corsOptions), (req, res) => {
   db.deleteUser(req, res, userProfile.id);
});

app.post('/getMessage/', cors(corsOptions), (req, res) => {
    const {chrono, open, cons, extr, agree, neuro} = req.body;
    res.status(200).send(message.getMessage(chrono, open, cons, extr, agree, neuro))
});

app.post('/getWeekExer/', cors(corsOptions), (req, res)=> {
    db.getExerciseEntriesById(req, res, userProfile.id);
});

app.post('/getWeekCaf/', cors(corsOptions), (req, res)=> {
    db.getCaffeineEntriesById(req, res, userProfile.id);
});

app.post('/getWeekStress/', cors(corsOptions), (req, res)=> {
    db.getStressEntriesById(req, res, userProfile.id);
});

app.post('/getWeekExer/', cors(corsOptions), (req, res)=> {
    db.getExerciseEntriesById(req, res, userProfile.id);
});

app.post('/getWeekSleep/', cors(corsOptions), (req, res)=> {
    db.getSleepEntryById(req, res, userProfile.id);
});

app.listen(process.env.PORT || 5000);
console.log("Listening on port 5000");