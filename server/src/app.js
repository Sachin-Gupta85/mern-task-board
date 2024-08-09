const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", tasks);

module.exports = app;
