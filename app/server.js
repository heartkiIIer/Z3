const express = require('express');
const session = require('express-session');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const cors = require('cors');

app.use(express.static("src/"));
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
let userProfile = {id: -1, name: "", image: ""};

app.use(passport.initialize());;
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: googleKey,
        clientSecret: googlSecret,
        callbackURL: "http://localhost:3000/home/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        // User.findOrCreate({googleId: profile.id}, function(eer, user){
        //    return done(eer, user);
        // });
        return done(null, profile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

passport.serializeUser(function(user, done) {
    userProfile = extractProfile(user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    userProfile = extractProfile(user);
    done(null, user);
});

function extractProfile(profile) {
    if(!profile){
        return {
            id: -1,
            name: "0",
            image: ""
        }
    }
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

app.listen(process.env.PORT || 3000);