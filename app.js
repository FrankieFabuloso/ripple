const express = require( 'express' )
const app = express()
const bodyParser = require( 'body-parser' )
const path = require( 'path' )
const loadEnvironment = require( './configuration/environment' )()
const passport = require( './configuration/passport' )
const flash = require( 'connect-flash' )
const cookieParser = require( 'cookie-parser' )
const session = require( 'express-session' )
const morgan = require( 'morgan' )

const index = require( './routes/index' )
const user = require( './routes/user' )

// set up view engine
app.set( 'views', path.join( __dirname, 'views' ) )
app.set( 'view engine', 'pug' )

app.use( morgan('dev') )
app.use( cookieParser() )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use( express.static( path.join( __dirname, 'public' ) ) )

app.use( session({
    secret: 'ilovescotchscotchyscotchscotch',
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
) // session secret
app.use( passport.initialize() )
app.use( passport.session() ) // persistent login sessions
app.use( flash() ) // use connect-flash for flash messages stored in session

// routes ======================================================================

app.use( '/', index )
app.use( '/users', user )

app.listen( 3000, () => {
  console.log( 'Express app listening on post 3000')
})
