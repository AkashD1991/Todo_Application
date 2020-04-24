const express = require('express');
const router = require('express-promise-router')();
// const router = express.Router;
const { validateTaskBody, Taskschemas } = require('../helpers/routeHelpersTask')
const TasksController = require('../controllers/tasks');

router.route('/createTask')
    .post(validateTaskBody(Taskschemas.authSchema), TasksController.createTask);

router.route('/getTasks')
    .get(TasksController.getTasks);

router.route('/updateTask')
    .post(TasksController.updateTask);

router.route('/:id')
    .post(TasksController.getTask)

module.exports = router;