var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require("../db/db");

var configAuth = require("./auth");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(err) {
      done(err);
    });
  });


//GOOGLE************************************
  passport.use(new GoogleStrategy({

    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,

  },
  function(token, refreshToken, profile, done) {

    process.nextTick(function() {
      // try to find the user based on their google id
      User.findOne({where: {google_id: profile.id}})
        .then(function(user) {
          if (user) {
            // console.log("THE GOOGLE USER IS " + user.google_id);
            return done(null, user);
          } else {
            return User.create({
              google_id: profile.id,
              google_token: token,
              google_name: profile.displayName
            })
            .then(function (user) {
              return done(null, user);
            });
          }
        })
        .catch(function(err) {
          done(err);
        });
    });

  }));
//********************************************  

};
