const { sequelize } = require("../../config/db");
const { DataTypes } = require("sequelize");

const Account = sequelize.define("account", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 30],
    },
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 30],
    },
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Account;
