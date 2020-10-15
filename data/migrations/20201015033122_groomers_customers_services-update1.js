exports.up = (knex) => {
  return knex.schema.createTable('groomers_customers_services', function (
    table
  ) {
    table.integer('id').notNullable();
    table
      .integer('customer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('customers');
    table
      .integer('pet_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('pets');
    table
      .integer('groomer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('groomers');
    table
      .integer('service_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('services');

    table.primary(['customer_id', 'pet_id', 'groomer_id', 'service_id']);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomers_customers_services');
};
