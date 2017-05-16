exports.up = knex =>
  knex.schema.createTable('incoming_messages', table => {
    table.increments('id').primary()
    table.integer('subscriber_id').notNullable()
    table.string('message')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTable('incoming_messages')
