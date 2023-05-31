const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;
const connectDB = require("./config/db")
const Project = require("./models/project")

connectDB()

app.use(cors());
app.use(express.json());



// Route to get all tasks of a user from a project
app.get('/tasks/:projectName/:userEmail', async (req, res) => {
  const projectName = req.params.projectName
  const userEmail = req.params.userEmail

  try {
    const projectData = await Project.findOne({ project : projectName });
    if (!projectData) {
      return res.status(404).json({ error: 'Project not found' });
    }

    tasks = projectData.tasks.filter(task => task.assignedTo === userEmail)

    res.json(tasks);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to patch status of a task by projectName, userEmail, and ID
app.patch('/tasks/:projectName/:userEmail/:id', async (req, res) => {
  const projectName = req.params.projectName;
  const userEmail = req.params.userEmail;
  const id = req.params.id;
  const { status } = req.body;

  try {
    const projectData = await Project.findOne({ project: projectName });
    if (!projectData) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = projectData.tasks.find(
      (task) => {
        return task.id == id && task.assignedTo === userEmail
      }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;

    await projectData.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/tasks/:projectName/:userEmail", async (req, res) => {
  const { taskHead, description, estimatedTime } = req.body;
  const projectName = req.params.projectName;
  const userEmail = req.params.userEmail;

  try {
    // Find the project by name
    const project = await Project.findOne({ project: projectName });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create a new task
    const newTask = {
      id: project.tasks.length + 1,
      assignedTo: userEmail,
      taskHead,
      description,
      estimatedTime,
      status: "toDo",
    };

    // Add the new task to the project's tasks array
    project.tasks.push(newTask);

    await project.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});