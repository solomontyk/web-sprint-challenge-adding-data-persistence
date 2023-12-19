exports.seed = function (knex) {
    return Promise.all([
      knex('resources').del(),
      knex('projects').del(),
      knex('tasks').del(),
    ])
      .then(function () {
        return knex('resources').insert([
          { resource_id: 1, resource_name: 'foo', resource_description: null },
        ]);
      })
      .then(function () {
        return knex('projects').insert([
          {
            project_id: 1,
            project_name: 'bar',
            project_description: null,
            project_completed: 0,
          },
        ]);
      })
      .then(function () {
        return knex('tasks').insert([
          {
            task_id: 1,
            task_description: 'baz',
            task_notes: null,
            task_completed: 0, 
            project_id: 1,
          },
        ]);
      });
  };