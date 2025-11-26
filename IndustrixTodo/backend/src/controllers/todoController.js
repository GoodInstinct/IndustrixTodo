const db = require("../models");
const { Op } = require("sequelize");

module.exports = {
  // GET todos (with pagination + search)
  async getTodos(req, res) {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      status,
      category_id,
      priority
    } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    // Search
    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    // Status filter
    if (status === "completed") where.completed = true;
    if (status === "incomplete") where.completed = false;

    // Category filter
    if (category_id) where.category_id = category_id;

    // Priority filter
    if (priority) where.priority = priority;

    const { rows, count } = await db.Todo.findAndCountAll({
      where,
      include: [{ model: db.Category }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],

    });

    res.json({
      data: rows,
      pagination: {
        current_page: parseInt(page),
        per_page: parseInt(limit),
        total: count,
        total_pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

  // GET by ID
  async getTodoById(req, res) {
    try {
      const todo = await db.Todo.findByPk(req.params.id, {
        include: db.Category,
      });

      if (!todo) return res.status(404).json({ error: "Todo not found" });

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST create
  async createTodo(req, res) {
    try {
      const { title, description, priority, due_date, category_id } = req.body;
      const todo = await db.Todo.create({
        title,
        description,
        priority,
        due_date,
        category_id
      });

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT update
  async updateTodo(req, res) {
    try {
      const todo = await db.Todo.findByPk(req.params.id);

      if (!todo) return res.status(404).json({ error: "Todo not found" });

      Object.assign(todo, req.body);
      await todo.save();

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE
  async deleteTodo(req, res) {
    try {
      const todo = await db.Todo.findByPk(req.params.id);

      if (!todo) return res.status(404).json({ error: "Todo not found" });

      await todo.destroy();

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PATCH toggle complete
  async toggleComplete(req, res) {
    try {
      const todo = await db.Todo.findByPk(req.params.id);

      if (!todo) return res.status(404).json({ error: "Todo not found" });

      todo.completed = !todo.completed;
      await todo.save();

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
