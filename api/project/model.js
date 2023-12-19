

const db = require('../../data/dbConfig');

function getProjects() {
  return db('projects');
}

function getProjectById(projectId) {
  return db('projects').where({ project_id: projectId }).first();
}

function addProject(project) {
  return db('projects').insert(project).returning('*');
}

module.exports = {
  getProjects,
  getProjectById, 
  addProject,
};