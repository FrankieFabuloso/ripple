exports.up = knex =>
  knex.schema.createTable('subscribers', table => {
    table.increments('id').primary()
    table.string('phone_number').notNullable().unique()
  })

exports.down = knex => knex.schema.dropTable('subscribers')
