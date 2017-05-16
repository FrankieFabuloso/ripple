const express = require( 'express' )
const router = express.Router()
const passport = require( '../../configuration/passport' )
const User = require( '../../database/user' )

router.post( '/signup', (request, response, next) => {
  const { email, password } = request.body

  User.findByEmail( email )
    .then( user => {
      // User already exists, do something about that
      // Probably redirect with an error message
      response.redirect( '/users/login' )
    })
    .catch( error => {
      // We can insert the user
      const { hash, salt } = User.generateHash( password )

      User.create( email, hash, salt )
        .then( user => {
          request.login( user, error => {
            if( error ) {
              return next( error )
            } else {
              response.redirect( '/users/profile' )
            }
          })
        })
        .catch( error => {
          console.log( 'create error', error )
          // redirect somewhere with appropriate error message
        })
    })
})

const authConfig = {
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true
}

router.post( '/login', passport.authenticate('local', authConfig ))

router.get( '/profile', (request, response) => {
  response.json({ user: request.user })
})

module.exports = router
