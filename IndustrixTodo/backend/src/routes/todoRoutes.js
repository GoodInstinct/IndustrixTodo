const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// CRUD
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/:id/complete", todoController.toggleComplete);

module.exports = router;
