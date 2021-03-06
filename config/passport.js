const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Member = require('../models/member');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK || process.env.GOOGLE_CALLBACK_GLOBAL
},
function(accessToken, refreshToken, profile, cb) {
    // A user has logged in via Google Oauth
    Member.findOne({ 'googleId': profile.id }, function(err, member) {
        if (err) return cb(err);
        if (member) {
          return cb(null, member);
        } else {
          // we have a new member via OAuth!
          var newMember = new Member({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            googleId: profile.id
          });
          newMember.save(function(err) {
            if (err) return cb(err);
            return cb(null, newMember);
          });
        }
      });
}));

passport.serializeUser(function(member, done) {
    done(null, member.id);
});

passport.deserializeUser(function(id, done) {
    Member.findById(id, function(err, member) {
      done(err, member);
    });
  });