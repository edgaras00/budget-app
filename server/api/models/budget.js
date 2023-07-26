const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Budget = sequelize.define("budget", {
  amount: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Budget;
