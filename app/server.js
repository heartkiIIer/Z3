const db = require('./database');

const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

// app.use(express.static("src/"));
app.use(express.static("public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

var corsOptions = {
    origin : 'http://sleepwebapp.wpi.edu:3000',
    optionsSuccessStatus : 200
}

let userProfile = {id: -1, name: "Invalid User", image: ""};

///////Firebase Session Cookies//////////////////////
const functions = require('firebase-functions');
var hbs = require('express-handlebars');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

app.set('src', './src');
app.engine('hbs', hbs());
app.set('src engine', 'hbs');
admin.initializeApp(functions.config().firebase);

app.use(cookieParser());

function setCookie(idToken, res) {
    // Set session expiration to 5 days.
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
        // Set cookie policy for session cookie and set in response.
        const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        res.cookie('__session', sessionCookie, options);

        admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
            res.redirect('http://sleepwebapp.wpi.edu:3000/home');
        });
    }, error => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
    });
}

// middleware to check cookie
function checkCookieMiddleware(req, res, next) {
    const sessionCookie = req.cookies.__session || '';
    admin.auth().verifySessionCookie(
        sessionCookie, true).then((decodedClaims) => {
        req.decodedClaims = decodedClaims;
        next();
    }).catch(error => {
            // Session cookie is unavailable or invalid. Force user to login.
            res.redirect('http://sleepwebapp.wpi.edu:3000');
    });
}

//////////////////////////////////////////////

//user logout
app.get('/logout', cors(corsOptions), function(req, res){
    res.clearCookie('__session');
    userProfile = {id: -1, name: "Invalid User", image: ""}; // set user profile to default
    res.send();
});

app.post('/logUser', cors(corsOptions), (req, res) => {
    let data = req.body;

    userProfile = {
        id: data.id,
        name: data.name,
        image: data.image
    };
    const idToken = req.query.idToken;
    setCookie(idToken, res);

    db.getUser(req, res, userProfile.id, "\'"+userProfile.name+"\'");
});

// retrieve user's profile information: id, name, image
app.get('/user', cors(corsOptions), (req, res) => {
    res.send({
        name: userProfile.name,
        id: userProfile.id,
        image: userProfile.image
    });
});

//DATABASE FUNCTIONALITY
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/allUsers', cors(corsOptions), (req, res) => {
    db.getUsers(req, res)
});

app.post('/users/newcaf/', cors(corsOptions), (req, res)=> {
    const {cups, cupSize} = req.body
    db.addCaffeineEntriesById(req, res, userProfile.id, cups, cupSize);
})

app.post('/users/newexer/', cors(corsOptions), (req, res)=> {
    const {intensity, minutes} = req.body
    db.addExerciseEntriesById(req, res, userProfile.id, intensity, minutes);
})

app.post('/users/newstress/', cors(corsOptions), (req, res)=> {
    const {stressLevel} = req.body
    db.addExerciseEntriesById(req, res, userProfile.id, stressLevel);
})

app.post('/getRoutine/', cors(corsOptions), (req, res)=> {
    db.getBedtimeRoutineById(req, res, userProfile.id);
})

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
})

app.post('/getWeek/', cors(corsOptions), (req, res)=> {
    db.getWeekById(req, res, userProfile.id);
})

app.post('/newSleep/', cors(corsOptions), (req, res)=> {
    db.addSleepEntryById(req, res, userProfile.id);
})

app.post('/newWake/', cors(corsOptions), (req, res)=> {
    db.addWakeById(req, res, userProfile.id);
})

app.post('/submitChronoAnswers/', cors(corsOptions), (req, res) => {
    const{q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13} = req.body;
    db.putChronotypeById(req, res, userProfile.id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13)
})

app.post('/getChronoAnswers/', cors(corsOptions), (req, res)=> {
    db.getChronotypeById(req, res, userProfile.id);
})

app.listen(process.env.PORT || 5000);
console.log("Listening on port 5000");