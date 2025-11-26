const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Category = require("./category")(sequelize, DataTypes);
db.Todo = require("./todo")(sequelize, DataTypes);

// Setup relationships
db.Category.associate(db);
db.Todo.associate(db);

module.exports = db;
