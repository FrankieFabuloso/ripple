exports.up = knex =>
  knex.schema.createTable('signups', table => {
    table.increments('id').primary()
    table.integer('campaign_id').notNullable()
    table.integer('subscriber_id').notNullable()
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable('signups')
