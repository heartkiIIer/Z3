const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const cors = require('cors');

app.use(express.static("src/"));
app.use(express.static("public/"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

app.use(cors());

let userProfile = {id: -1, name: "Invalid User", image: ""};

//user logout
app.get('/logout', function(req, res){
    userProfile = {id: -1, name: "Invalid User", image: ""}; // set user profile to default
    res.redirect('http://localhost:3000'); // redirect back to landing page
});

app.post('/logUser', (req, res) => {
    let data = req.body;

    userProfile = {
        id: data.id,
        name: data.name,
        image: data.image
    };

    res.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.end()
});

// retrieve user's profile information: id, name, image
app.get('/user', (req, res) => {
    res.send({
        name: userProfile.name,
        id: userProfile.id,
        image: userProfile.image
    });
});

app.listen(process.env.PORT || 5000);