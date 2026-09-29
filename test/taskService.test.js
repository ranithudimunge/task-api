const test = require('node:test');
const assert = require('node:assert/strict');
const TaskRepository = require('../src/repositories/taskRepository');
const TaskService = require('../src/services/taskService');

const createService = () => new TaskService(new TaskRepository());

test('creates a new pending task', () => {
  const service = createService();
  const task = service.createTask({ title: 'Finish homework', description: 'Build the API' });

  assert.deepEqual(task, {
    id: 1,
    title: 'Finish homework',
    description: 'Build the API',
    status: 'pending'
  });
});

test('rejects a task without a title', () => {
  const service = createService();
  assert.throws(() => service.createTask({ title: '   ' }), /Title is required/);
});

test('updates a task status', () => {
  const service = createService();
  const task = service.createTask({ title: 'Study layers' });
  const updatedTask = service.updateTask(task.id, { status: 'completed' });

  assert.equal(updatedTask.status, 'completed');
});
