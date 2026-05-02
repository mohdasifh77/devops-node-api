const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory store (replace with DB in production)
let tasks = [
  { id: uuidv4(), title: 'Setup Docker', status: 'done',    priority: 'high',   createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Write tests',  status: 'in-progress', priority: 'medium', createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Push to GitHub', status: 'todo', priority: 'high',   createdAt: new Date().toISOString() }
];

// GET /api/tasks
router.get('/', (req, res) => {
  const { status, priority } = req.query;
  let result = [...tasks];
  if (status)   result = result.filter(t => t.status === status);
  if (priority) result = result.filter(t => t.priority === priority);
  res.json({ count: result.length, tasks: result });
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, priority = 'medium' } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const task = {
    id: uuidv4(),
    title,
    status: 'todo',
    priority,
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id };
  res.json(tasks[idx]);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
