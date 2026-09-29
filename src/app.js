const express = require('express');
const TaskRepository = require('./repositories/taskRepository');
const TaskService = require('./services/taskService');
const TaskController = require('./controllers/taskController');

const app = express();
app.use(express.json());

// Composition root: this is the one place where the three layers are connected.
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

app.get('/tasks', taskController.getAll);
app.get('/tasks/:id', taskController.getById);
app.post('/tasks', taskController.create);
app.patch('/tasks/:id', taskController.update);
app.delete('/tasks/:id', taskController.delete);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  response.status(statusCode).json({ error: error.message || 'Unexpected server error.' });
});

module.exports = app;
