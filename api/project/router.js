// project/router.js

const express = require('express');
const projectModel = require('./model');
const taskModel = require('../task/model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await projectModel.getProjects();

    const projectsWithDetails = await Promise.all(
      projects.map(async (project) => {
        const tasks = await taskModel.getTasksByProjectId(project.project_id);
        return {
          project_id: project.project_id,
          project_name: project.project_name,
          project_description: project.project_description,
          project_completed: !!project.project_completed,
          tasks: tasks.map((task) => ({
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: !!task.task_completed,
            project_name: project.project_name,
            project_description: project.project_description, 
          })),
        };
      })
    );

    res.status(200).json(projectsWithDetails);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProject = req.body;
    const project = await projectModel.addProject(newProject);
    project[0].project_completed = !!project[0].project_completed;
    res.status(201).json(project[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;