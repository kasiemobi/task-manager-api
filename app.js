const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const mongoURI = "mongodb://mongo:27017/taskdb";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected 🚀"))
  .catch(err => console.log("MongoDB connection error:", err));

// Create Task schema
const taskSchema = new mongoose.Schema({
  task: String
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/", (req, res) => res.send("Task Manager API with MongoDB 🚀"));

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({ task: req.body.task });
  await newTask.save();
  res.json({ message: "Task added", task: newTask });
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
