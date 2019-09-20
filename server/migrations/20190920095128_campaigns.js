
exports.up = function(knex) {
    return knex.schema.createTable('campaigns', function (t) {
        t.increments('id').primary()
        t.string('name').notNullable()
        t.dateTime('startDate').notNullable()
        t.dateTime('endDate').notNullable()
        t.integer('targetImpressions').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('campaigns')
};
