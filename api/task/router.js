
const express = require('express');
const taskModel = require('./model');
const projectModel = require('../project/model'); 

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks();

    const tasksWithDetails = await Promise.all(
      tasks.map(async (task) => {
        const project = await projectModel.getProjectById(task.project_id);
        return {
          task_id: task.task_id,
          task_description: task.task_description,
          task_notes: task.task_notes,
          task_completed: !!task.task_completed,
          project_name: project.project_name, 
          project_description: project.project_description, 
        };
      })
    );

    res.status(200).json(tasksWithDetails);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTask = req.body;
    const task = await taskModel.addTask(newTask);
    task[0].task_completed = !!task[0].task_completed;
    res.status(201).json(task[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;