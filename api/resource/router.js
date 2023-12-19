const express = require('express');
const resourceModel = require('./model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resources = await resourceModel.getResources();
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newResource = req.body;
    const resource = await resourceModel.addResource(newResource);
    res.status(201).json(resource[0]);
  } catch (error) {
    next(error);
  }
});


module.exports = router;