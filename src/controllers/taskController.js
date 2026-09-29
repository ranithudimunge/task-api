class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getAll = (request, response) => {
    response.json(this.taskService.getAllTasks());
  };

  getById = (request, response) => {
    const task = this.taskService.getTaskById(request.params.id);
    if (!task) return response.status(404).json({ error: 'Task not found.' });
    return response.json(task);
  };

  create = (request, response) => {
    const task = this.taskService.createTask(request.body);
    return response.status(201).json(task);
  };

  update = (request, response) => {
    const task = this.taskService.updateTask(request.params.id, request.body);
    if (!task) return response.status(404).json({ error: 'Task not found.' });
    return response.json(task);
  };

  delete = (request, response) => {
    const deleted = this.taskService.deleteTask(request.params.id);
    if (!deleted) return response.status(404).json({ error: 'Task not found.' });
    return response.status(204).send();
  };
}

module.exports = TaskController;
