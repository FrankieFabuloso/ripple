const passport = require( 'passport' )
const LocalStrategy = require( 'passport-local' ).Strategy

const User = require('../database/user')

const strategy = new LocalStrategy( (email, password, done) => {
  const hashedPassword = User.generateHash( password )

  User.find( email, hashedPassword )
    .then( user => {
      if( user !== null ) {
        return done( null, user )
      } else {
        return done( null, false, { message: 'Incorrect username.' })
      }
    })
    .catch( error => done( error ))
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

passport.use({
    usernameField: 'email',
    session: false
}, strategy )

console.log('hello in the LocalStrategy')

module.exports = passport
