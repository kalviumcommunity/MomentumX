const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;



app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Require the tasks array from data.js
const tasks = require('./mockTasks.js');

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});