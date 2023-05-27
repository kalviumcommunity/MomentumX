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

// Route to patch status of a task by ID
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Route to create a new task
app.post("/tasks", (req, res) => {
  const { taskHead, description, estimatedTime } = req.body;

  // Generate a new unique ID for the task
  const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

  // Create a new task object
  const newTask = {
    id: newTaskId,
    taskHead,
    description,
    estimatedTime,
    status: "toDo",
  };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Return the newly created task
  res.status(201).json(newTask);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});