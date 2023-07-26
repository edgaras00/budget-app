const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    validate: {
      len: [4, 30],
    },
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;
