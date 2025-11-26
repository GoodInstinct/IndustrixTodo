module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#000000"
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Todo, { 
      foreignKey: "category_id",
      onDelete: "SET NULL"
    });
  };

  return Category;
};
