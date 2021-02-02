const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile.name.givenName);
      const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // already have record with given profile ID
            return done(null, existingUser);
        }
        // don't have record with this ID, make a new record
        const user = await new User({ googleId: profile.id, name: profile.name.givenName }).save();
        done(null, user);
    }
  )
);