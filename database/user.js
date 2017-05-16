const pgp = require('pg-promise')()
const db = pgp( process.env.DATABASE_URL )
const bcrypt = require('bcrypt-nodejs');

const FIND_BY_EMAIL = `SELECT * FROM users WHERE email=$1`

const FIND_BY_ID = `SELECT * FROM users WHERE id=$1`

const FIND_USER = 'SELECT * FROM users WHERE email=$1 AND password=$2'

const CREATE_USER = 'INSERT INTO users (email, password, salt) VALUES ($1, $2, $3) RETURNING id'

const User = {
  find: ( email, password ) => db.one( FIND_USER, [ email, password ] ),

  findById: ( id ) => {
    console.log('id:', id)
    return db.one( FIND_BY_ID, [id] )
  },

  findByEmail: ( email ) => {
    console.log('email:', email)
    return db.one( FIND_BY_EMAIL, [email] )
  },

  create: ( email, password, salt ) =>
    db.one( CREATE_USER, [ email, password, salt ]),

  generateHash: password =>{
    const salt = bcrypt.genSaltSync(8)
    return {
      hash: bcrypt.hashSync(password, salt, null),
      salt
    }
  },

  validPassword: ( inputPassword, foundDatabasePassword ) =>
     bcrypt.compareSync(password, foundDatabasePassword )
}


module.exports = User
