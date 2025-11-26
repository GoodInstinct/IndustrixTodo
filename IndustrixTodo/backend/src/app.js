const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
