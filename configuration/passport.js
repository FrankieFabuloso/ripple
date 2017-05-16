const passport = require( 'passport' )
const LocalStrategy = require( 'passport-local' ).Strategy

const User = require('../database/user')

const strategy = new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
  User.findByEmail( email )
    .then( user => {
      if( User.validPassword(password,  user.password) ) {
        return done( null, user )
      } else {
        return done( null, false, req.flash( 'loginMessage', 'Oops! Wrong password.' ))
      }
    })
    .catch( error => {
      return done( null, false, req.flash( 'loginMessage', 'Seems we don\'t have your email...' ) )
    })
})

passport.serializeUser( (user, done) => {
  return done( null, user.id )
})

passport.deserializeUser( (id, done) => {
  User.findById( id )
    .then( user => {
      return done( null, user )
    })
    .catch ( error => {
      console.log( error )
    })
})

passport.use( strategy )

module.exports = passport
