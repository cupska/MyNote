require('dotenv').config()
const passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:    process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3009/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done (null, profile)
    // console.log(request, accessToken, refreshToken)
  }
));
passport.serializeUser ((user, done) => {
    done(null, user)
})
passport.deserializeUser ((user, done) => {
    done(null, user)
})