module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
      due_date: DataTypes.DATE,
    },
    {
      tableName: "Todos",
      timestamps: true,     
      underscored: false,  
    }
  );

  Todo.associate = (models) => {
    Todo.belongsTo(models.Category, {
      foreignKey: "category_id",
      onDelete: "SET NULL",
    });
  };

  return Todo;
};
