const express = require( 'express' )
const router = express.Router()
// const db = require( '../database/db')

router.get('/', (req, res) => {
  res.render("index", { title: "Ripple",  message: req.flash('signupMessage') })
})

module.exports = router
