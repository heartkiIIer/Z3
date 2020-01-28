const express = require('express');
const session = require('express-session');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const cors = require('cors');

app.use(express.static("src/"));
app.use(express.static("public/"));
app.use(session({ secret:'google secret', resave:false, saveUninitialized:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

app.use(cors());


//Google Authentication using passport OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleKey = "818297110349-fr3qb03tk1amb79jqhndupc04cp44m3h.apps.googleusercontent.com";
const googlSecret = "T2WedJYEzKj2EHi8PeO5QBIq";
let userProfile = {id: -1, name: "Invalid User", image: ""};

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: googleKey,
        clientSecret: googlSecret,
        callbackURL: "http://localhost:5000/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        return done(null, profile);
    }
));

//request for google authentication
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
);

//google authentication request received, check authentication
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    //google authentication successful, redirect to homepage
    function(req, res) {
        res.redirect('http://localhost:3006/home');
});

//user logout
app.get('/logout', function(req, res){
    req.session.destroy();
    userProfile = {id: -1, name: "Invalid User", image: ""}; // set user profile to default
    res.redirect('http://localhost:3006'); // redirect back to landing page
});

passport.serializeUser(function(user, done) {
    userProfile = extractProfile(user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    userProfile = extractProfile(user);
    done(null, user);
});

//extract user's name, profile image and user id from google
function extractProfile(profile) {
    if(!profile){ // no profile, set to invalid user
        return {
            id: -1,
            name: "Invalid User",
            image: ""
        }
    }
    // extract profile image
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
    }

    return {
        id: profile.id,
        name: profile.displayName,
        image: imageUrl,
    };
}

// retrieve user's profile information: id, name, image
app.get('/user', (req, res) => {
    res.send({
        name: userProfile.name,
        id: userProfile.id,
        image: userProfile.image
    });
});

app.listen(process.env.PORT || 5000);