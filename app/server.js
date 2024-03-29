const db = require('./database');
const message = require('./messages');
const fs = require('fs');

const https = require('https');
const express = require('express');
const cors = require('cors');
let path = require('path');

const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

app.use(express.static("src/"));
app.use(express.static("public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());

var whitelist = ['https://sleepwebapp.wpi.edu', 'https://api.openweathermap.org/'];

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.post('/logUser', cors(corsOptions), (req, res) => {
    const{id, name} = req.body;
    db.getUser(req, res, id, "\'"+name+"\'");
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
    const {cups, cupSize, uid} = req.body;
    db.addCaffeineEntriesById(req, res, uid, cups, cupSize);
});

app.post('/users/newexer/', cors(corsOptions), (req, res)=> {
    const {intensity, minutes, uid} = req.body;
    db.addExerciseEntriesById(req, res, uid, minutes, intensity);
});

app.post('/newFitbitExercise/', cors(corsOptions), (req, res) => {
   const {intensity, minutes, uid, timestamp} = req.body;
   db.addFitbitExerciseEntriesById(req, res, uid, minutes, intensity, timestamp);
});

app.post('/users/newstress/', cors(corsOptions), (req, res)=> {
    const {title, year, month, day, date, value, uid} = req.body;
    db.addStressEntriesById(req, res, uid, title, year, month, day, date, value);
});

app.post('/getRoutine/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getBedtimeRoutineById(req, res, uid);
});

app.post('/addRoutine/', cors(corsOptions), (req, res) => {
    const {minutes, task, uid} = req.body;
    db.addBedtimeRoutineById(req, res, uid, minutes, task);
});

app.post('/deleteRoutine/', cors(corsOptions), (req, res) => {
    const {entryId} = req.body;
    db.deleteBedtimeRoutinesById(req, res, entryId);
});

app.post('/editRoutine/', cors(corsOptions), (req, res) => {
    const {entryId, task, minutes} = req.body;
    db.editBedtimeRoutinesById(req, res, entryId, task, minutes);
});

app.post('/newSleep/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.addSleepEntryById(req, res, uid);
});

app.post('/getLatestSleep/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getLatestSleepById(req, res, uid);
});

app.post('/newFitbitSleep/', cors(corsOptions), (req, res)=> {
    const {start, end, uid} = req.body;
    db.addFitbitSleepEntryById(req, res, uid, start, end);
});

app.post('/newWake/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.addWakeById(req, res, uid);
});

app.post('/newWakeByTime/', cors(corsOptions), (req, res)=> {
    const {uid, time} = req.body;
    db.addWakeByTime(req, res, uid, time);
});

app.post('/submitChronoAnswers/', cors(corsOptions), (req, res) => {
    const{q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, uid} = req.body;
    db.putChronotypeById(req, res, uid, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13)
});

app.post('/getChronoAnswers/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getChronotypeById(req, res, uid);
});

app.post('/getAsleep/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getAsleep(req, res, uid)
});

app.post('/addAsleep/', cors(corsOptions), (req, res) => {
    const {uid, asleep} = req.body;
    db.addAsleep(req, res, uid, asleep) ;
});

app.post('/getUseFitbit/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getUseFitbit(req, res, uid)
});

app.post('/addUseFitbit/', cors(corsOptions), (req, res) => {
    const {fitbit, uid} = req.body;
    db.addUseFitbit(req, res, uid, fitbit);
});

app.post('/getZipcode/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getZipcode(req, res, uid)
});

app.post('/addZipcode/', cors(corsOptions), (req, res) => {
    const {zipcode, uid} = req.body;
    db.addZipcode(req, res, uid, zipcode);
});

app.post('/getSleepGoal/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getSleepGoalById(req, res, uid)
});

app.post('/addSleepGoal/', cors(corsOptions), (req, res) => {
    const {goal, uid} = req.body;
    db.addSleepGoalById(req, res, uid, goal);
});

app.post('/getPersonality/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getPersonalityById(req, res, uid)
});

app.post('/submitPersonality/', cors(corsOptions), (req, res) => {
    const {open, cons, extra, agree, neuro, uid} = req.body;
    db.putPersonalityById(req, res, uid, open, cons, extra, agree, neuro);
});

app.post('/deleteUser/', cors(corsOptions), (req, res) => {
    const {uid} = req.body;
   db.deleteUser(req, res, uid);
});

app.post('/getMessage/', cors(corsOptions), (req, res) => {
    const {chrono, open, cons, extr, agree, neuro} = req.body;
    res.status(200).send(message.getMessage(chrono, open, cons, extr, agree, neuro))
});

app.post('/getWeekExer/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getExerciseEntriesById(req, res, uid);
});

app.post('/getWeekCaf/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getCaffeineEntriesById(req, res, uid);
});

app.post('/getWeekStress/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getStressEntriesById(req, res, uid);
});

app.post('/getStressByDate/', cors(corsOptions), (req, res) => {
    const {uid, month, day, year} = req.body;
    db.getStressEntriesByDate(req, res, uid, month, day, year);
});

app.post('/getWeekExer/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getExerciseEntriesById(req, res, uid);
});

app.post('/getWeekSleep/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getSleepEntryById(req, res, uid);
});

//fitbit not in use
app.post('/getPopup/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getPopup(req, res, uid);
});
//fitbit not in use
app.post('/setPopupFalse/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.setPopupFalse(req, res, uid);
});
//fitbit in use
app.post('/getPopup2/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.getPopup2(req, res, uid);
});
//fitbit in use
app.post('/setPopupFalse2/', cors(corsOptions), (req, res)=> {
    const {uid} = req.body;
    db.setPopupFalse2(req, res, uid);
});

 https.createServer({
     key: fs.readFileSync( '../ssl/sleepwebapp.wpi.edu.key'),
     cert: fs.readFileSync('../ssl/sleepwebapp_wpi_edu_cert_comb.cer')
 }, app)
     .listen(process.env.PORT || 5000, function () {
         console.log('Listening on port 5000')
     })
