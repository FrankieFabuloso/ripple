exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('salt').notNullable()
    table.string('twilio_account_sid')
    table.string('twilio_authToken')
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable('users')
