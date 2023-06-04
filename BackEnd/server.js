const express = require("express");
const cors = require("cors");
const app = express();
const port = 3003;
const connectDB = require("./config/db");
const Project = require("./models/project");
const User = require("./models/user");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/users/:userEmail/:userName", async (req, res) => {
    const userEmail = req.params.userEmail;
    const userName = req.params.userName;

    try {
        let person = await User.findOne({ email: userEmail });

        if (!person) {
            // Create a new person if not found
            person = new User({
                email: userEmail,
                name: userName,
                projectsList: ["Your Project"],
            });

            await person.save();
        }
        res.json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get all tasks of a user from a project
app.get("/projects/:projectName/tasks/:userEmail", async (req, res) => {
    const projectName = req.params.projectName;
    const userEmail = req.params.userEmail;

    try {
        const projectData = await Project.findOne({ project: projectName });
        if (!projectData) {
            return res.status(404).json({ error: "Project not found" });
        }

        tasks = projectData.tasks.filter(
            (task) => task.assignedTo === userEmail
        );

        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to patch status of a task by projectName, userEmail, and ID
app.patch("/projects/:projectName/tasks/:id", async (req, res) => {
    const projectName = req.params.projectName;
    const id = req.params.id;
    const { status, assignedTo } = req.body;

    try {
        const projectData = await Project.findOne({ project: projectName });
        if (!projectData) {
            return res.status(404).json({ error: "Project not found" });
        }

        const task = projectData.tasks.find((task) => {
            return task.id == id && task.assignedTo === assignedTo;
        });

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.status = status;

        await projectData.save();

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/projects/:projectName", async (req, res) => {
    const { taskHead, description, estimatedTime, assignedTo } = req.body;
    const projectName = req.params.projectName;

    try {
        // Find the project by name
        const project = await Project.findOne({ project: projectName });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create a new task
        const newTask = {
            assignedTo,
            taskHead,
            description,
            estimatedTime,
            status: "toDo",
        };

        // Add the new task to the project's tasks array
        project.tasks.push(newTask);

        await project.save();

        tasks = project.tasks.filter((task) => task.assignedTo === assignedTo);

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to patch details of a task by projectName, userEmail, and ID
app.put("/projects/:projectName/tasks/:id", async (req, res) => {
    const projectName = req.params.projectName;
    const id = req.params.id;
    const { taskHead, description, estimatedTime, assignedTo } = req.body;

    try {
        const projectData = await Project.findOne({ project: projectName });
        if (!projectData) {
            return res.status(404).json({ error: "Project not found" });
        }

        const task = projectData.tasks.find(
            (task) => task.id == id && task.assignedTo === assignedTo
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Update the task properties
        task.taskHead = taskHead;
        task.description = description;
        task.estimatedTime = estimatedTime;

        await projectData.save();

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/projects/:projectName/tasks/:id", async (req, res) => {
    const projectName = req.params.projectName;
    const id = req.params.id;
    const assignedTo = req.body.assignedTo;

    console.log(req.body)

    try {
        const projectData = await Project.findOne({ project: projectName });
        if (!projectData) {
            return res.status(404).json({ error: "Project not found" });
        }

        const taskIndex = projectData.tasks.findIndex(
            (task) => task.id == id && task.assignedTo == assignedTo
        );

        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }

        projectData.tasks.splice(taskIndex, 1);
        await projectData.save();

        res.json(projectData.tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
