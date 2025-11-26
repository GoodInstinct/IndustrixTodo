const db = require("../models");

module.exports = {
  // GET all categories
  async getAllCategories(req, res) {
    try {
      const categories = await db.Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST create category
  async createCategory(req, res) {
    try {
      const { name, color } = req.body;
      const category = await db.Category.create({ name, color });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT update category
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;
      const category = await db.Category.findByPk(id);

      if (!category) return res.status(404).json({ error: "Category not found" });

      category.name = name;
      category.color = color;
      await category.save();

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE category
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await db.Category.findByPk(id);

      if (!category) return res.status(404).json({ error: "Category not found" });

      await category.destroy();
      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
