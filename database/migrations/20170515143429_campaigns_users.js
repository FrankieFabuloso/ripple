exports.up = knex =>
  knex.schema.createTable('campaigns_users', table => {
    table.integer('user_id').notNullable()
    table.integer('campaign_id').notNullable()
  })

exports.down = knex => knex.schema.dropTable('campaigns_users')
