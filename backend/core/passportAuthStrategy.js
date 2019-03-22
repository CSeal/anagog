module.exports = (appPath) => {
  const passport = require('passport');
  const LocalStrategy = require('passport-local');
  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;
  const path = require('path');
  const User = require(path.join(appPath, 'models', 'user.js'));
  const errors_msg_obj = require(path.join(appPath, 'error_const.js'));

  passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    session: false
  },
  function (username, password, done) {
    User.findOne({userName: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user || !user.comparePasswords(password)) {
        const { user_not_found } = errors_msg_obj;
        return done(null, false, {message: user_not_found.error_msg});
      }
      return done(null, user);
    });
  }
  )
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: 'Anagog',
  };

  passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findOneWithPublicFields({_id: payload.id}, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          done(null, user)
        } else {
          const { user_is_not_authorized } = errors_msg_obj;
          done(null, false, {message: user_is_not_authorized.error_msg})
        }
      })
    })
  );
  return passport;
}

