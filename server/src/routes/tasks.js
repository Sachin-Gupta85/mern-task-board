const express = require("express");
const Task = require("../models/Task");
const { STATUSES } = Task;

const router = express.Router();

// list all tasks, grouped by column in board order
router.get("/", async (_req, res) => {
  const tasks = await Task.find().sort({ status: 1, order: 1 });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title, status = "todo" } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: "title required" });
  if (!STATUSES.includes(status)) return res.status(400).json({ error: "bad status" });
  const order = await Task.countDocuments({ status });
  const task = await Task.create({ title: title.trim(), status, order });
  res.status(201).json(task);
});

router.patch("/:id", async (req, res) => {
  const patch = {};
  for (const k of ["title", "status", "order"]) {
    if (req.body[k] !== undefined) patch[k] = req.body[k];
  }
  if (patch.status && !STATUSES.includes(patch.status))
    return res.status(400).json({ error: "bad status" });
  const task = await Task.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
  if (!task) return res.status(404).json({ error: "not found" });
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

module.exports = router;
