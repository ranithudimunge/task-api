class TaskRepository {
  constructor() {
    // This array acts as our temporary database for Session 1.
    this.tasks = [];
    this.nextId = 1;
  }

  findAll() {
    return this.tasks;
  }

  findById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  create(taskData) {
    const task = { id: this.nextId++, ...taskData };
    this.tasks.push(task);
    return task;
  }

  update(id, changes) {
    const task = this.findById(id);
    if (!task) return undefined;

    Object.assign(task, changes);
    return task;
  }

  delete(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}

module.exports = TaskRepository;
