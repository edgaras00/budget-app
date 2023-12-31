const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Transaction = sequelize.define("transaction", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transaction;
