const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const result = db.prepare('INSERT INTO todos (title) VALUES (?)').run(title);
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const { completed } = req.body;
  db.prepare('UPDATE todos SET completed = ? WHERE id = ?').run(completed ? 1 : 0, req.params.id);
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
  todo ? res.json(todo) : res.status(404).json({ error: 'not found' });
});

app.delete('/api/todos/:id', (req, res) => {
  db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
