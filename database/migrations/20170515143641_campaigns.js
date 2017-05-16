exports.up = knex =>
  knex.schema.createTable('campaigns', table => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('auto_response')
    table.string('campaign_phone_number')
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable('campaigns')
