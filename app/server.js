const db = require('./database');

const express = require('express');
const app = express();
const cors = require('cors');

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

var corsOptions = {
    origin : 'http://sleepwebapp.wpi.edu:3000',
    optionsSuccessStatus : 200
}

let userProfile = {id: -1, name: "Invalid User", image: ""};

//user logout
app.get('/logout', cors(corsOptions), function(req, res){
    userProfile = {id: -1, name: "Invalid User", image: ""}; // set user profile to default
    res.redirect('http://sleepwebapp.wpi.edu:3000'); // redirect back to landing page
});

app.post('/logUser', cors(corsOptions), (req, res) => {
    let data = req.body;

    userProfile = {
        id: data.id,
        name: data.name,
        image: data.image
    };

    if(getUser(req, res, userProfile.id) == NULL){
        addUser(req, res, userProfile.name,  NULL);
    }

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
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

app.listen(process.env.PORT || 5000);
console.log("Listening on port 5000");