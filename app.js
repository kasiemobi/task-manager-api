const express = require("express");
const app = express();

app.use(express.json());

let tasks = [];

// Home route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a task
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json({ message: "Task added", tasks });
});

// Delete a task
app.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  tasks.splice(index, 1);
  res.json({ message: "Task deleted", tasks });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
