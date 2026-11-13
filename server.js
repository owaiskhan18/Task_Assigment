// Part C & D: Express REST API. Data is stored in memory (array).
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build a REST API", completed: false }
];
let nextId = 3;

// GET /api/v1/tasks — return all tasks
app.get("/api/v1/tasks", (req, res) => {
  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /api/v1/tasks/:id — return one task
app.get("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Task ID must be a positive integer" });
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  return res.status(200).json({ success: true, data: task });
});

// POST /api/v1/tasks — create a task
app.post("/api/v1/tasks", (req, res) => {
  const { title } = req.body || {};
  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ success: false, message: "A non-empty title is required" });
  }

  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);

  return res.status(201).json({
    success: true,
    message: "Task created",
    data: task
  });
});

// PUT /api/v1/tasks/:id — update a task
app.put("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Task ID must be a positive integer" });
  }

  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const { title, completed } = req.body || {};
  if (title === undefined && completed === undefined) {
    return res.status(400).json({ success: false, message: "Provide title or completed to update" });
  }
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ success: false, message: "Title must be a non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ success: false, message: "Completed must be true or false" });
  }

  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;

  return res.status(200).json({ success: true, message: "Task updated", data: task });
});

// DELETE /api/v1/tasks/:id — delete a task
app.delete("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ success: false, message: "Task ID must be a positive integer" });
  }

  const index = tasks.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  return res.status(200).json({ success: true, message: "Task deleted", data: deletedTask });
});

// Handle invalid JSON and other errors with JSON responses.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  return res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
});
