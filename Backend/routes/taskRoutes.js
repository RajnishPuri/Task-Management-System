const express = require('express');

const { createTask, editTask, getAllTasks, getTasks, deleteTask, getDedicatedTask } = require('../controllers/TaskControllers');

const { updateTaskStatus, getMyTasks } = require('../controllers/TaskControllers');

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const taskRouter = express.Router();

taskRouter.post('/createtask', authMiddleware, isAdmin, createTask);
taskRouter.put('/edittask/:id', authMiddleware, isAdmin, editTask);
taskRouter.delete('/deletetask/:id', authMiddleware, isAdmin, deleteTask);
taskRouter.get('/getalltasks', authMiddleware, isAdmin, getAllTasks);
taskRouter.get('/gettasks/:userId', authMiddleware, isAdmin, getTasks);
taskRouter.get('/getdedicatedtask/:id', authMiddleware, getDedicatedTask);

taskRouter.put('/updatetaskstatus/:id', authMiddleware, updateTaskStatus);
taskRouter.get('/getmytasks', authMiddleware, getMyTasks);

module.exports = taskRouter;

