const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  assignedTo: String,
  taskHead: String,
  description: String,
  estimatedTime: String,
  status: String,
}, {versionKey: false});

const projectSchema = new mongoose.Schema({
  project: String,
  tasks: [taskSchema],
}, {versionKey: false});

const Project = mongoose.model('projectsdatas', projectSchema);

module.exports = Project;