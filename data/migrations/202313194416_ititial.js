
exports.up = async function(knex) {
    await knex.schema
    .createTable('projects', (table) => {
        table.increments('project_id');
        table.string('project_name').notNullable();
        table.string('project_description');
        table.integer('project_completed').defaultTo(0);
      })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name').notNullable().unique()
        table.string('resource_description')
    })
    .createTable('tasks', table => {
        table.increments('task_id')
        table.string('task_description').notNullable()
        table.string('task_notes')
        table.integer('task_completed').defaultTo(0);
        table.integer('project_id').unsigned().notNullable()
        table.foreign('project_id').references('project_id').inTable('projects')
    })
    .createTable('project_resources', table => {
        table.increments('assignment_id').primary();
        table.integer('project_id').unsigned().notNullable();
        table.integer('resource_id').unsigned().notNullable();
        table.foreign('project_id').references('project_id').inTable('projects');
        table.foreign('resource_id').references('resource_id').inTable('resources');
      });
}



exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('project_resources');
    await knex.schema.dropTableIfExists('tasks');
    await knex.schema.dropTableIfExists('resources');
    await knex.schema.dropTableIfExists('projects');
}