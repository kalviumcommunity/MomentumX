const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Require the tasks array from data.js
const tasks = require('../mockTasks.json');

// Route to get all tasks of a user from a project
app.get('/tasks/:projectName/:userEmail', (req, res) => {
  projectName = req.params.projectName
  userEmail = req.params.userEmail

  const project = tasks.find(obj => obj.name === projectName);
  if (project) {
    const filteredTasks = project.data[userEmail].tasks;
    res.json(filteredTasks)
  }
});

// Route to patch status of a task by projectName, userEmail and ID
app.patch('/tasks/:projectName/:userEmail/:id', (req, res) => {

  const projectName = req.params.projectName
  const userEmail = req.params.userEmail
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const project = tasks.find(obj => obj.name === projectName);
  if (project) {
    const filteredTasks = project.data[userEmail].tasks;
    const taskIndex = filteredTasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      filteredTasks[taskIndex].status = status;
      res.json(filteredTasks[taskIndex]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  }


});

// Route to create a new task in a project for a specific user
app.post("/tasks/:projectName/:userEmail", (req, res) => {
  const { taskHead, description, estimatedTime } = req.body;
  projectName = req.params.projectName
  userEmail = req.params.userEmail

  // Find the project by name
  const project = tasks.find(obj => obj.name === projectName);


  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  // Find the user within the project
  const user = project.data[userEmail];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Generate a new unique ID for the task
  const newTaskId = user.tasks.length > 0 ? user.tasks[user.tasks.length - 1].id + 1 : 1;

  // Create a new task object
  const newTask = {
    id: newTaskId,
    taskHead,
    description,
    estimatedTime,
    status: "toDo",
  };

  // Push the new task to the user's tasks array
  user.tasks.push(newTask);

  res.status(201).json(newTask);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});