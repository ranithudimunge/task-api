class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getAllTasks() {
    return this.taskRepository.findAll();
  }

  getTaskById(id) {
    return this.taskRepository.findById(this.parseId(id));
  }

  createTask({ title, description }) {
    this.validateTitle(title);

    return this.taskRepository.create({
      title: title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      status: 'pending'
    });
  }

  updateTask(id, { title, description, status }) {
    const taskId = this.parseId(id);
    const existingTask = this.taskRepository.findById(taskId);
    if (!existingTask) return undefined;

    const changes = {};
    if (title !== undefined) {
      this.validateTitle(title);
      changes.title = title.trim();
    }
    if (description !== undefined) {
      if (typeof description !== 'string') throw this.validationError('Description must be text.');
      changes.description = description.trim();
    }
    if (status !== undefined) {
      const allowedStatuses = ['pending', 'in-progress', 'completed'];
      if (!allowedStatuses.includes(status)) {
        throw this.validationError('Status must be pending, in-progress, or completed.');
      }
      changes.status = status;
    }

    return this.taskRepository.update(taskId, changes);
  }

  deleteTask(id) {
    return this.taskRepository.delete(this.parseId(id));
  }

  parseId(id) {
    const parsedId = Number(id);
    if (!Number.isInteger(parsedId) || parsedId < 1) {
      throw this.validationError('Task id must be a positive whole number.');
    }
    return parsedId;
  }

  validateTitle(title) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw this.validationError('Title is required.');
    }
  }

  validationError(message) {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  }
}

module.exports = TaskService;
