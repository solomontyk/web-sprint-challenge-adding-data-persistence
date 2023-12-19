const db = require('../../data/dbConfig');



function getTasks() {
    return db('tasks');
  }
  
  function addTask(task) {
    return db('tasks').insert(task).returning('*');
  }

  function getTasksByProjectId(project_id) {
    return db('tasks').where({ project_id });
  }
  
  
  module.exports = {
    getTasks,
    addTask,
    getTasksByProjectId
  };
  