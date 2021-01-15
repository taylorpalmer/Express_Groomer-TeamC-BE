exports.up = (knex) => {
    return knex.schema.table('pets', function (table) {
      table.integer('customer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('customers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('species').notNullable();
      table.string('breed');
      table.integer('age').notNullable();
      table.integer('weight').notNullable();
      table.string('vaccinations');
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.table('pets', (table) =>{
      table.dropColumn("vaccinations")
      table.dropColumn("weight")
      table.dropColumn("age")
      table.dropColumn("breed")
      table.dropColumn("species")
      table.dropColumn("customer_id")
    });
  };
  